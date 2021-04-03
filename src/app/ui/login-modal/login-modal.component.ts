import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiResponse } from 'src/app/models/apiResponse';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Utils } from 'src/app/utils';

declare const $: any;
@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit {

  public generalError: boolean;
  public generalErrorMessage: string;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.generalError = false;
    this.generalErrorMessage = '';
  }

  ngOnInit(): void {
  }

  /**
   * Login user into the system and create a session using cookies.
   * @param loginForm NgForm
   */
  async loginUser(loginForm: NgForm): Promise<void> {
    this.generalError = false;
    this.generalErrorMessage = '';
    if (loginForm.valid) {
      this.generalError = false;
      Utils.showLoader('#login_modal form .modal-content');
      try {
        const response = await this.authenticationService.login(loginForm.value) as ApiResponse;
        if (response.success) {
          const profile = await this.authenticationService.getUserProfile(response.data.token) as ApiResponse;
          if (profile.success) {
            profile.data.user.token = response.data.token;
            const user = this.authenticationService.createUserSession(profile.data.user) as User;
            if (user) {
              this.authenticationService.authenticationStatusUpdate.next( { isLoggedIn: true } );
              Utils.hideLoader('#login_modal form .modal-content');
              $('#login_modal').modal('hide');
              loginForm.resetForm();
              this.router.navigate(['/dashboard']);
            } else {
              throw new Error();
            }
          } else {
            throw new Error();
          }
        } else if (response.data.email) {
          Utils.hideLoader('#login_modal form .modal-content');
          this.generalError = true;
          this.generalErrorMessage = response.data.email;
        } else {
          Utils.hideLoader('#login_modal form .modal-content');
          this.generalError = true;
          this.generalErrorMessage = response.message;
        }
      } catch (error) {
        Utils.hideLoader('#login_modal form .modal-content');
        this.generalError = true;
        this.generalErrorMessage = 'Something went wrong. Please try again later.';
        Utils.showErrorMessage('Error: ', error);
      }

    }
  }

}
