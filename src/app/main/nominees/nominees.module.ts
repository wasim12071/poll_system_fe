import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NomineesComponent } from './nominees.component';
import { AllNomineesResolver } from 'src/app/resolvers/all-nominees.resolver';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { TableModule } from 'ngx-easy-table';
import { AddEditNomineeComponent } from './add-edit-nominee/add-edit-nominee.component';

const routes: Routes = [
  {
    path: '',
    component: NomineesComponent,
    resolve: { allNomineesResolver: AllNomineesResolver }
  }
];

@NgModule({
  declarations: [NomineesComponent, AddEditNomineeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    TableModule
  ]
})
export class NomineesModule { }
