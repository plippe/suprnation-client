import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';
import { Environment } from '../environments/environment';
import 'rxjs/add/operator/map';

@Injectable()
export class SocketService {

  subscriptions = {};

  constructor() {
  }

  public createAndSubscribeToNewSocketInstance(nameSpace) {
    let socket = this.createNewSocketInstance(nameSpace);
    this.subscriptions[nameSpace] = socket;
    return socket
      .fromEvent<any>('update');
  }

  public disconnect(nameSpace) {
    let socket = this.subscriptions[nameSpace];
    if (!!socket) {
      socket.disconnect(true);
    }
  }

  private createNewSocketInstance(nameSpace) {
    return new Socket({url: `${Environment.WS_URL}/${nameSpace}`, options: {}});
  }
}
