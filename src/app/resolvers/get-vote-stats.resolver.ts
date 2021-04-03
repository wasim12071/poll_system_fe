import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Utils } from 'src/app/utils';
import { VoteService } from '../services/vote.service';

@Injectable({ providedIn: 'root' })
export class GetVoteStatsResolver implements Resolve<any>  {

  constructor(private voteService: VoteService) { }

  async resolve(route: ActivatedRouteSnapshot, rstate: RouterStateSnapshot): Promise<any>  {
    try {
      return await this.voteService.getVoteStats() as any;
    } catch (error) {
      Utils.showErrorMessage('', error);
    }
  }
}
