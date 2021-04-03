import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { Nominee } from 'src/app/models/Nominee';
import { SocketService } from 'src/app/services/socket.service';
import { Utils } from 'src/app/utils';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public nominees: Array<Nominee> = [];
  public formatedData: Array<{ name: string, value: string }> = [];

  // options (ngx-chart visual settings)
  public gradient = false;
  public showLegend = false;
  public showLabels = true;
  public isDoughnut = true;
  public showXAxis = true;
  public showYAxis = true;
  public showXAxisLabel = true;
  public xAxisLabel = 'Nominees';
  public showYAxisLabel = true;
  public yAxisLabel = 'Votes';

  // options (ngx-easy-table settings)
  public configuration: Config;
  public columns: Columns[] = [
    { key: 'firstName', title: 'First Name' },
    { key: 'lastName', title: 'Last Name' },
    { key: 'count', title: 'Votes', orderBy: 'count' }
  ];

  constructor(
    private titleService: Title,
    private route: ActivatedRoute,
    private socketService: SocketService
  ) {
    // tslint:disable-next-line: deprecation
    this.route.data.subscribe( response => {
      if (response.getVoteStatsResolver.success) {
        this.adjustData(response.getVoteStatsResolver.data.nominees);
      }
    });
    // tslint:disable-next-line: deprecation
    this.socketService.voteRecieved.subscribe( payload => {
      this.adjustData(payload);
    });
  }

  ngOnInit(): void {
    this.titleService.setTitle('Dashboard | Votinator' );
    this.configuration = { ...DefaultConfig };
    this.configuration.paginationEnabled = false;
  }

  /**
   * Get total count of the votes casted.
   */
  get getTotal(): number {
    let sum = 0;
    this.nominees.forEach( nominee => {
      sum += nominee.count;
    });
    return sum;
  }

  /**
   * Adjust the API data according the ngx-chart requirements.
   * @param nominees e.g. Array<Nominee>
   */
  private adjustData(nominees: Array<Nominee> = []): void {
    this.nominees = (nominees.length > 0) ? nominees : [] as Array<Nominee>;
    this.formatedData = [];
    this.nominees.forEach( nominee => {
      this.formatedData.push({ name: `${nominee.firstName} ${nominee.lastName}`, value: nominee.count.toString() });
    });
  }

  /**
   * Format the value for the ngx-charts
   * @param data e.g. { name: 'Hello', value: '10' }
   * @returns e.g. 10 Votes
   */
  public valueFormatting(data: { name: string, value: string }): string {
    return `${data.value} ${( data.value === '1' ? 'Vote' : 'Votes')}`;
  }

  /**
   * Convert a container into pdf.
   * @param container e.g. dashboard_ui
   * @param btn e.g. print_btn
   */
  public async genratePdf(container: string, btn: string): Promise<void> {
    const date = new Date();
    Utils.showLoader(`#${btn}`);
    await Utils.printContainer(container, `results_${date.toISOString().replace(/-/g, '').slice(0, 17).toString()}`, 'p');
    Utils.hideLoader(`#${btn}`);
  }

}
