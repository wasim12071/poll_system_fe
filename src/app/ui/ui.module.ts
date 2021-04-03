import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { RouterModule } from '@angular/router';

const modules: any[] = [
  HeaderComponent,
  FooterComponent,
  LoginModalComponent
];

@NgModule({
  declarations: [ ...modules ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [ ...modules ]
})
export class UiModule { }
