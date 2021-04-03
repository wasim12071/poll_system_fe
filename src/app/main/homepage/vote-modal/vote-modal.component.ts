import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiResponse } from 'src/app/models/apiResponse';
import { Vote } from 'src/app/models/vote';
import { VoteService } from 'src/app/services/vote.service';
import { Utils } from 'src/app/utils';
import Swal from 'sweetalert2';

declare const $: any;
@Component({
  selector: 'app-vote-modal',
  templateUrl: './vote-modal.component.html',
  styleUrls: ['./vote-modal.component.css']
})
export class VoteModalComponent implements OnInit, OnChanges {

  @Input() vote: Vote;
  @ViewChild('voteForm') voteForm: NgForm;

  public generalError: boolean;
  public generalErrorMessage: string;

  constructor(
    private voteService: VoteService
  ) {
    this.generalError = false;
    this.generalErrorMessage = '';
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (this.vote.nomineeId) {
      this.generalError = false;
      this.generalErrorMessage = '';
      this.voteForm.resetForm();
      $('#vote_modal').modal('show');
    }
  }

  /**
   * Submit the vote.
   * @param voteForm NgForm e.g. Form to get the email.
   */
  public async voteNow(voteForm: NgForm): Promise<void> {
    try {
      if (this.voteForm.valid) {
        this.generalError = false;
        Utils.showLoader('#vote_modal form .modal-content');
        this.vote.email = voteForm.value.email;
        const response = await this.voteService.castVote(this.vote) as ApiResponse;
        if (response.success) {
          Utils.hideLoader('#vote_modal form .modal-content');
          $('#vote_modal').modal('hide');
          this.voteForm.resetForm();
          Swal.fire( {
            icon: 'success',
            text: 'Congratulations! Your vote has been recieved!',
            showCancelButton: false,
            confirmButtonColor: '#343a40',
            confirmButtonText: 'Okay'
          });
        } else {
          this.generalError = true;
          this.generalErrorMessage = response.message;
          Utils.hideLoader('#vote_modal form .modal-content');
        }
      }
    } catch (error) {
      Utils.hideLoader('#vote_modal form .modal-content');
      this.generalError = true;
      this.generalErrorMessage = 'Something went wrong. Please try again later.';
      Utils.showErrorMessage('Error: ', error);
    }
  }

}
