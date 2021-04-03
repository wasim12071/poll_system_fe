import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public isLoggedIn: boolean;

  constructor(
    private authenticationService: AuthenticationService
  ) {
    this.isLoggedIn = this.authenticationService.isLoggedIn;
    // tslint:disable-next-line: deprecation
    this.authenticationService.authenticationStatusUpdate.subscribe( msg => {
      this.isLoggedIn = this.authenticationService.isLoggedIn;
    });
  }

  ngOnInit(): void {
  }

  /**
   * Logout the user from the system and end session.
   * @param e $event
   */
  async logout(e: any): Promise<void> {
    e.preventDefault();
    this.authenticationService.logout();
  }

}
