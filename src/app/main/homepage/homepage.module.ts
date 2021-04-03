import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage.component';
import { RouterModule, Routes } from '@angular/router';
import { AllNomineesResolver } from 'src/app/resolvers/all-nominees.resolver';
import { VoteModalComponent } from './vote-modal/vote-modal.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
    resolve: { allNomineesResolver: AllNomineesResolver }
  }
];

@NgModule({
  declarations: [HomepageComponent, VoteModalComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ]
})
export class HomepageModule { }
