import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../models/apiResponse';
import { Login } from '../models/login';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private LOGIN = '/login';
  private PROFILE_ADMIN_ENDPOINT = '/admin/profile';

  /**
   * Subscribe to authentication status change.
   */
  public authenticationStatusUpdate = new Subject<{}>();

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private cookieService: CookieService
  ) { }

  /**
   * Check if the user is logged in.
   */
  public get isLoggedIn(): boolean {
    return (this.cookieService.get('session') && this.cookieService.get('session') !== 'undefined') ? true : false;
  }

  /**
   * User session stored in the cookie.
   */
  public get auth(): User {
    if (this.cookieService.get('session') && this.cookieService.get('session') !== 'undefined') {
      return JSON.parse(decodeURIComponent(this.cookieService.get('session'))) as User;
    } else {
      return new User();
    }
  }

  /**
   * API | POST
   * Get user profile against JWT token.
   * @example {
   *  email: String,
   *  password: String
   * }
   * @param body Login
   * @returns Promise<ApiResponse>
   */
  public login(body: Login): Promise<any> {
    return this.http.post(environment.apiBase + this.LOGIN, body).toPromise();
  }

  /**
   * API | GET
   * Get user profile against JWT token.
   * @param token string
   * @returns Promise<ApiResponse>
   */
  public async getUserProfile(token: string): Promise<any> {
    return this.http.get(environment.apiBase + this.PROFILE_ADMIN_ENDPOINT, { headers: { token } }).toPromise();
  }

  /**
   * API | PUT
   * Update the user profile.
   * @param body Object { firstName: string, lastName: string }
   * @returns Promise<ApiResponse>
   */
  public editProfile(body: { firstName: string, lastName: string }): Promise<any> {
    return this.http.put(environment.apiBase + this.PROFILE_ADMIN_ENDPOINT, body).toPromise();
  }

  /**
   * API | PUT
   * Change the user password.
   * @param password string
   * @returns Promise<ApiResponse>
   */
  public changePassword(password: string): Promise<any> {
    return this.http.put(environment.apiBase + this.PROFILE_ADMIN_ENDPOINT, { password }).toPromise();
  }

  /**
   * Store the user session object in the cookie.
   * @param user User e.g. user session object.
   * @param showNoti Boolean default: true
   * @returns Promise<ApiResponse>
   */
  public createUserSession(user: User, showNoti: boolean = true): User {
    this.cookieService.put('session', JSON.stringify(user), { path: '/' });
    if (showNoti) {
      this.toastr.success( 'Welcome! ' + user.firstName);
    }
    return user;
  }

  /**
   * Remove the cookies from client side.
   */
  public endSession(): void {
    this.cookieService.remove('session', { path: '/' });
  }

  /**
   * Logout the user.
   */
  public async logout(): Promise<void> {
    this.endSession();
    this.authenticationStatusUpdate.next({ isLoggedIn: false });
  }

  /**
   * Refresh the user session, to update the user details stored.
   * @returns Boolean Either the session refresh was successful or not.
   */
  public async refreshSession(): Promise<boolean> {
    if (this.isLoggedIn) {
      const token = this.auth.token;
      this.endSession();
      const response = await this.getUserProfile(token) as ApiResponse;
      if (response.success) {
        response.data.user.token = token;
        const user = this.createUserSession(response.data.user, false) as User;
      }
      return true;
    } else {
      return false;
    }
  }
}
