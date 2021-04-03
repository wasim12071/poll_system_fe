import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { ApiResponse } from 'src/app/models/apiResponse';
import { Nominee } from 'src/app/models/Nominee';
import { NomineeService } from 'src/app/services/nominee.service';
import { Utils } from 'src/app/utils';
import Swal from 'sweetalert2';

declare const $: any;
@Component({
  selector: 'app-nominees',
  templateUrl: './nominees.component.html',
  styleUrls: ['./nominees.component.css']
})
export class NomineesComponent implements OnInit {

  public nominees: Array<Nominee> = [];
  public nominee: Nominee = new Nominee();

  // options (ngx-easy-table settings)
  public configuration: Config;
  public columns: Columns[] = [
    { key: 'firstName', title: 'First Name' },
    { key: 'lastName', title: 'Last Name' },
    { key: '_id', title: '' }
  ];

  constructor(
    private titleService: Title,
    private route: ActivatedRoute,
    private nomineeService: NomineeService
  ) {
    // tslint:disable-next-line: deprecation
    this.route.data.subscribe( response => {
      this.nominees = (response.allNomineesResolver.success) ? response.allNomineesResolver.data.nominees : [] as Array<Nominee>;
    });
  }

  ngOnInit(): void {
    this.titleService.setTitle('Dashboard | Votinator' );
    this.configuration = { ...DefaultConfig };
    this.configuration.paginationEnabled = false;
  }

  /**
   * Opens up the model to add/edit the nominee.
   * @param nominee Nominee e.g. Object of the Nominee.
   */
   public openNomineeModal(nominee: Nominee = null): void {
    this.nominee = nominee || new Nominee();
    $('#nominee_modal').modal('show');
  }

  /**
   * Delete a Nominee from the system.
   * @param nominee Nominee Object of the whole nominee.
   */
  public async deleteNominee(nominee: Nominee): Promise<void> {
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You are in the middle of the voting. Are you sure you want to remove this Nominee?',
        denyButtonText: '<i class="fas fa-times mr-2"></i> Don\'t Remove',
        confirmButtonText: '<i class="fas fa-check mr-2"></i> Yes! Remove Now',
        showDenyButton: true,
        icon: 'warning',
        confirmButtonColor: '#a7432b',
        denyButtonColor: '#343a40'
      }).then( async (success) => {
          if ( success.value ) {
            Utils.showLoader('.manage_nominees');
            const response = await this.nomineeService.removeNominee(nominee._id) as ApiResponse;
            if (response.success) {
              this.nominees = this.nominees.filter( x => x._id !== nominee._id);
              Swal.fire( {
                icon: 'success',
                title: 'Successfully Removed!',
                text: 'The Nominee has been successfully removed.',
                showCancelButton: false,
                confirmButtonColor: '#343a40',
                confirmButtonText: '<i class="fas fa-check mr-2"></i> Okay'
              });
            } else {
              Swal.fire( {
                icon: 'error',
                title: 'Unable to Delete!',
                text: response.message,
                showCancelButton: false,
                confirmButtonColor: '#343a40',
                confirmButtonText: '<i class="fas fa-check mr-2"></i> Okay'
              });
            }
            Utils.hideLoader('.manage_nominees');
          }
      });
    } catch (error) {
      Utils.hideLoader('.manage_nominees');
      Utils.showErrorMessage('', error);
    }
  }

  /**
   * Update the data after add or edit is completed.
   * @param $event any
   */
  public async updateData($event: any): Promise<void> {
    const response = await this.nomineeService.getAllNominees() as ApiResponse;
    this.nominees = (response.success) ? response.data.nominees : [] as Array<Nominee>;
  }

}
