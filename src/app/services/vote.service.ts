import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Vote } from '../models/vote';

@Injectable({
  providedIn: 'root'
})
export class VoteService {
  private VOTE_ADMIN_ENDPOINT = '/admin/votes';
  private CAST_VOTE = '/cast-vote';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  /**
   * API | GET
   * Get the present stats of voting.
   * @returns Promise<ApiResponse>
   */
  public async getVoteStats(): Promise<any> {
    try {
      return await this.http.get(environment.apiBase + this.VOTE_ADMIN_ENDPOINT).toPromise();
    } catch (error) {
      this.router.navigate(['/500']);
      return { success: false };
    }
  }

  /**
   * API | POST
   * Cast the vote against your email.
   * @param vote Vote e.g. { nomineeId: "abc", email: "xyz@domain.com" }
   * @returns Promise<ApiResponse>
   */
  public castVote(vote: Vote): Promise<any> {
    return this.http.post(environment.apiBase + this.CAST_VOTE, vote ).toPromise();
  }
}
