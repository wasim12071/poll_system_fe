import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { GetVoteStatsResolver } from 'src/app/resolvers/get-vote-stats.resolver';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { TableModule } from 'ngx-easy-table';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    resolve: { getVoteStatsResolver: GetVoteStatsResolver }
  }
];

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxChartsModule,
    TableModule
  ]
})
export class DashboardModule { }
