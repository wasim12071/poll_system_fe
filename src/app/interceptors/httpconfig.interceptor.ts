import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

    constructor(
        private authenticationService: AuthenticationService,
        private router: Router
    ) { }

    /**
     * Interscpt all http requests and inject the token into the header, if the token is present.
     * @param request Request
     * @param next Next
     * @returns Next
     */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // Check if the cookie has the user session object.
        if (this.authenticationService.isLoggedIn) {

            // Attach the token to the header and send it.
            request = request.clone({ setHeaders: { token: this.authenticationService.auth.token } });
        }
        return next.handle(request).pipe(
            catchError( (error: HttpErrorResponse) => {
                if (error.status === 401) {

                    // If the return code if 401, meaning unauthorised access, remove the cookie and redirect to 401 page.
                    this.authenticationService.endSession();
                    this.authenticationService.authenticationStatusUpdate.next({ isLoggedIn: false, msg: 'Unauthroised' });
                    this.router.navigateByUrl('/401');
                } else if (error.status === 500) {

                    // If there is a server crash, redirect to 500 page
                    this.authenticationService.endSession();
                    this.router.navigateByUrl('/500');
                }else {

                    // For rest of the errors, redirect to 404 page.
                    this.router.navigateByUrl('/404');
                }
                return throwError(error);
            })
        );
    }
}
