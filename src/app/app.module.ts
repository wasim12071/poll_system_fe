import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from './interceptors/httpconfig.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { CookieModule } from 'ngx-cookie';
import { ToastrModule } from 'ngx-toastr';
import { TableModule } from 'ngx-easy-table';
import { environment } from 'src/environments/environment';
import { GuestGuard } from './guards/guest.guard';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

const config: SocketIoConfig = { url: environment.socket, options: {} };

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./main/main.module').then(m => m.MainModule)
  },
  {
    path: '401',
    component: ErrorComponent,
    data: { title: '401', description: 'Whoops. Looks like your logged out.', button: 'Go To Home', route: '/' },
    canActivate: [GuestGuard]
  },
  {
    path: '500',
    component: ErrorComponent,
    data: { title: '500', description: 'Whoops. Looks like something went wrong. Please visit us later.', button: null, route: null}
  },
  {
    path: '**',
    redirectTo: '/404'
  },
  {
    path: '404',
    component: ErrorComponent,
    data: { title: '404', description: 'Whoops. What you are trying to find is not available.', button: 'Go To Home', route: '/' }
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled'
    }),
    ToastrModule.forRoot({
      timeOut: 6000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      easing: 'ease-in',
      tapToDismiss: true
    }),
    CookieModule.forRoot(),
    HttpClientModule,
    BrowserAnimationsModule,
    SocketIoModule.forRoot(config),
    TableModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
