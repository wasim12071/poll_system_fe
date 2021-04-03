import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Nominee } from '../models/Nominee';

@Injectable({
  providedIn: 'root'
})
export class NomineeService {
  private GET_ALL_NOMINEES = '/nominee/all';
  private NOMINEE_ADMIN_ENDPOINT = '/admin/nominee';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  /**
   * Get the list of all nominees.
   * @returns Promise<ApiResponse>
   */
  public async getAllNominees(): Promise<any> {
    try {
      return await this.http.get(environment.apiBase + this.GET_ALL_NOMINEES).toPromise();
    } catch (error) {
      this.router.navigate(['/500']);
      return { success: false };
    }
  }

  /**
   * Get details about single Nominee against the id.
   * @param nomineeId ObjectId of the Nominee as String.
   * @returns Promise<ApiResponse>
   */
  public async getSingleNominee(nomineeId: string): Promise<any> {
    return this.http.get(environment.apiBase + this.NOMINEE_ADMIN_ENDPOINT, { params: { nomineeId } }).toPromise();
  }

  /**
   * Add a new Nominee into the system.
   * @param body Nominee object e.g. { firstName: "xyz", lastname: "abc" }
   * @returns Promise<ApiResponse>
   */
  public addNominee(body: Nominee): Promise<any> {
    return this.http.post(environment.apiBase + this.NOMINEE_ADMIN_ENDPOINT, body ).toPromise();
  }

  /**
   * Update details of a present Nominee in the system.
   * @param body Nominee object e.g. { nomineeId: "fdsfaf", firstName: "xyz", lastname: "abc" }
   * @returns Promise<ApiResponse>
   */
  public editNominee(body: Nominee): Promise<any> {
    return this.http.put(environment.apiBase + this.NOMINEE_ADMIN_ENDPOINT, body).toPromise();
  }

  /**
   * Delete a Nominee from the system.
   * @param nomineeId ObjectId of the Nominee as String.
   * @returns Promise<ApiResponse>
   */
  public removeNominee(nomineeId: string): Promise<any> {
    return this.http.delete(environment.apiBase + this.NOMINEE_ADMIN_ENDPOINT, { params: { nomineeId } }).toPromise();
  }
}
