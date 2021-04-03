import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ApiResponse } from 'src/app/models/apiResponse';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Utils } from 'src/app/utils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  public profile: User;

  constructor(
    private titleService: Title,
    private authenticationService: AuthenticationService
  ) {
    this.profile = this.authenticationService.auth;
  }

  ngOnInit(): void {
    this.titleService.setTitle('Settings | Votinator' );
  }

  /**
   * Update the admin password.
   * @param passwordForm NgForm
   */
  public async updatePassword(passwordForm: NgForm): Promise<void> {
    try {
      if (passwordForm.valid && passwordForm.value.password === passwordForm.value.confirm_password) {
        Utils.showLoader('#edit_profile');
        const response = await this.authenticationService.changePassword(passwordForm.value.password) as ApiResponse;
        if (response.success) {
          Utils.hideLoader('#edit_profile');
          passwordForm.resetForm();
          Swal.fire( {
            icon: 'success',
            title: 'Successfully Updated!',
            text: 'Your password has been successfully updated.',
            showCancelButton: false,
            confirmButtonColor: '#343a40',
            confirmButtonText: '<i class="fas fa-check mr-2"></i> Okay'
          });
        } else {
          Utils.hideLoader('#edit_profile');
          Swal.fire( {
            icon: 'error',
            title: 'Unable to Update!',
            text: response.message,
            showCancelButton: false,
            confirmButtonColor: '#343a40',
            confirmButtonText: '<i class="fas fa-check mr-2"></i> Okay'
          });
        }
      }
    } catch (error) {
      Utils.hideLoader('#edit_profile');
      Utils.showErrorMessage('', error);
    }
  }

  /**
   * User profile update.
   * @param profileForm NgForm
   */
  public async updateProfile(profileForm: NgForm): Promise<void> {
    try {
      if (profileForm.valid) {
        Utils.showLoader('#edit_profile');
        const response = await this.authenticationService.editProfile(profileForm.value) as ApiResponse;
        if (response.success) {
          await this.authenticationService.refreshSession();
          Utils.hideLoader('#edit_profile');
          Swal.fire( {
            icon: 'success',
            title: 'Successfully Updated!',
            text: 'Your Profile has been successfully updated.',
            showCancelButton: false,
            confirmButtonColor: '#343a40',
            confirmButtonText: '<i class="fas fa-check mr-2"></i> Okay'
          });
        } else {
          Utils.hideLoader('#edit_profile');
          Swal.fire( {
            icon: 'error',
            title: 'Unable to Update!',
            text: response.message,
            showCancelButton: false,
            confirmButtonColor: '#343a40',
            confirmButtonText: '<i class="fas fa-check mr-2"></i> Okay'
          });
        }
      }
    } catch (error) {
      Utils.hideLoader('#edit_profile');
      Utils.showErrorMessage('', error);
    }
  }

}
