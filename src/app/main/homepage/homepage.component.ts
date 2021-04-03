import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Nominee } from 'src/app/models/Nominee';
import { Vote } from 'src/app/models/vote';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  public nominees: Array<Nominee> = [];
  public vote: Vote = new Vote();

  constructor(
    private route: ActivatedRoute,
    private titleService: Title
  ) {
    // tslint:disable-next-line: deprecation
    this.route.data.subscribe( response => {
      this.nominees = (response.allNomineesResolver.success) ? response.allNomineesResolver.data.nominees : [] as Array<Nominee>;
    });
  }

  ngOnInit(): void {
    this.titleService.setTitle('Home | Votinator' );
  }

  /**
   * Opens up the model to complete the vote.
   * @param nominee Nominee e.g. Object of the Nominee.
   */
  public openVoteModal(nominee: Nominee): void {
    this.vote = new Vote();
    this.vote.nomineeId = nominee._id;
    this.vote.nominee = nominee;
  }

}
