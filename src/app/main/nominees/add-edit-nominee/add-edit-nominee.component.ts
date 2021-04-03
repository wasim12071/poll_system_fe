import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiResponse } from 'src/app/models/apiResponse';
import { Nominee } from 'src/app/models/Nominee';
import { NomineeService } from 'src/app/services/nominee.service';
import { Utils } from 'src/app/utils';
import Swal from 'sweetalert2';

declare const $: any;
@Component({
  selector: 'app-add-edit-nominee',
  templateUrl: './add-edit-nominee.component.html',
  styleUrls: ['./add-edit-nominee.component.css']
})
export class AddEditNomineeComponent implements OnInit, OnChanges {

  @Output() updateData = new EventEmitter<any>();
  @Input() nominee: Nominee = new Nominee();
  public isEdit: boolean;
  @ViewChild('nomineeForm') nomineeForm: NgForm;

  public generalError: boolean;
  public generalErrorMessage: string;
  public nomineeData: Nominee;
  constructor(
    private nomineeService: NomineeService
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.generalError = false;
    this.generalErrorMessage = '';
    this.isEdit = this.nominee._id ? true : false;
    if (this.nomineeForm) {
      this.nomineeForm.resetForm();
    }
  }


  /**
   * Submit the nominee changes (Add/ Edit).
   * @param voteForm NgForm e.g. Form to get the email.
   */
  public async addEditNominee(nomineeForm: NgForm): Promise<void> {
    try {
      if (nomineeForm.valid) {
        Utils.showLoader('#nominee_modal form .modal-content');
        let response: ApiResponse = new ApiResponse();
        if (this.isEdit) {
          nomineeForm.value.nomineeId = this.nominee._id;
          response = await this.nomineeService.editNominee(nomineeForm.value) as ApiResponse;
        } else {
          response = await this.nomineeService.addNominee(nomineeForm.value) as ApiResponse;
        }
        if (response.success) {
          this.updateData.emit(response);
          Utils.hideLoader('#nominee_modal form .modal-content');
          $('#nominee_modal').modal('hide');
          Swal.fire( {
            icon: 'success',
            title: 'Success!',
            text: this.isEdit ? 'Nominee details, successfully updated!' : 'New nominess successfully added!',
            showCancelButton: false,
            confirmButtonColor: '#343a40',
            confirmButtonText: 'Okay'
          });
        } else {
          Utils.hideLoader('#nominee_modal form .modal-content');
          this.generalError = true;
          this.generalErrorMessage = response.message;
        }
      }
    } catch (error) {
      Utils.hideLoader('#nominee_modal form .modal-content');
      this.generalError = true;
      this.generalErrorMessage = 'Something went wrong. Please try again later.';
      Utils.showErrorMessage('Error: ', error);
    }
  }

}
