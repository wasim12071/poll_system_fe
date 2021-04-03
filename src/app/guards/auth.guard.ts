import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  /**
   * Check if the user is logged in. Only allows logged in users.
   * @returns Boolean
   */
  async canActivate(): Promise<any> {
      const isLoggedIn = this.authenticationService.isLoggedIn;
      if (!isLoggedIn) {
        this.router.navigate(['/']);
      }
      return isLoggedIn;
  }
}
