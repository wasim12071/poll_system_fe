import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Utils } from 'src/app/utils';
import { NomineeService } from 'src/app/services/nominee.service';

@Injectable({ providedIn: 'root' })
export class AllNomineesResolver implements Resolve<any>  {

  constructor( private nomineeService: NomineeService) { }

  async resolve(route: ActivatedRouteSnapshot, rstate: RouterStateSnapshot): Promise<any>  {
    try {
      return await this.nomineeService.getAllNominees() as any;
    } catch (error) {
      Utils.showErrorMessage('', error);
    }
  }
}
