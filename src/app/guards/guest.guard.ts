import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  /**
   * Check if the user is not logged in. Only allows users with no session.
   * @returns Boolean
   */
  async canActivate(): Promise<any> {
      const isLoggedIn = this.authenticationService.isLoggedIn;
      if (isLoggedIn) {
        this.router.navigate(['/dashboard']);
      }
      return !isLoggedIn;
  }
}
