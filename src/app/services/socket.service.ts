import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { Nominee } from '../models/Nominee';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private socket: Socket) {}

  /**
   * Observable - Subscribe to recieving voting updates.
   * @returns Nominee[] - Returns the array of nominee stats.
   */
  public get voteRecieved(): Observable<Array<Nominee>> {
    return this.socket.fromEvent('recieve-update');
  }
}
