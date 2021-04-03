import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  public errorPage = {
    title: '404',
    description: 'Whoops. What you are trying to find is not available.',
    button: 'Go To Home',
    route: '/'
  };

  constructor(
    private titleService: Title,
    private route: ActivatedRoute
  ) {
    this.route.data.subscribe( response => {
      this.errorPage.title = response.title ?  response.title : this.errorPage.title;
      this.errorPage.description = response.description ?  response.description : this.errorPage.description;
      this.errorPage.button = response.button;
      this.errorPage.route = response.route;
    });
  }

  ngOnInit(): void {
    this.titleService.setTitle(this.errorPage.title + ' | Votinator' );
  }

}
