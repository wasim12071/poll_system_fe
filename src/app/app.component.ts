import { Component } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { Utils } from './utils';

declare const $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private router: Router
  ) {
      // tslint:disable-next-line: deprecation
      this.router.events.subscribe(event => {
        if (event instanceof NavigationStart) {
          Utils.blockPage();
        } else if ((event instanceof NavigationEnd) || (event instanceof NavigationError) || (event instanceof NavigationCancel)) {
          window.scrollTo(0, 0);
          Utils.unblockPage();
        }
      });
  }
}
