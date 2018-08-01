import { PatternComponent, XY } from './pattern.component';
import { SocketService } from '../../sdk/socket.service';
import { HttpService } from '../../sdk/http.service';
import { Environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';

interface UpdateResponce {
  value: number
}

let connect = function(socketService: SocketService, sessionId: String): Observable<XY> {
  return socketService.createAndSubscribeToNewSocketInstance(sessionId)
    .map((x: UpdateResponce) => ({x: x.value, y: undefined}))
}

let disconnect = function(socketService: SocketService, sessionId: String) {
  socketService.disconnect(sessionId);
}

let castPattern = function(xs: XY[]) {
  return xs.map(x => x.x);
}

let connect2d = function(socketService: SocketService, sessionId: String): Observable<XY> {
  let socketX = socketService.createAndSubscribeToNewSocketInstance(sessionId + '-x');
  let socketY = socketService.createAndSubscribeToNewSocketInstance(sessionId + '-y');

  return Observable.zip(socketX, socketY, (x: UpdateResponce, y: UpdateResponce) => ({x: x.value, y: y.value}));
}

let disconnect2d = function(socketService: SocketService, sessionId: String): void {
  socketService.disconnect(sessionId + '-x');
  socketService.disconnect(sessionId + '-y');
}

let castPattern2d = function(xys: XY[]) {
  return xys;
}

let resolvers = function(
    title: String,
    env: String,
    connectFn: (socket: SocketService, string: String) => Observable<XY>,
    disconnectFn: (socket: SocketService, string: String) => void,
    castPatternFn: (xys: XY[]) => any) {
  return [
    { token    : 'title', resolveFn: _ => title },
    { token    : 'guessUrlFn', resolveFn: _ => Environment[env + "_GUESS"] },
    { token    : 'connectFn', resolveFn: _ => connectFn },
    { token    : 'disconnectFn', resolveFn: _ => disconnectFn },
    { token    : 'castPatternFn', resolveFn: _ => castPatternFn },
    {
      token    : 'session',
      deps     : [HttpService],
      resolveFn: (httpService) => httpService.get(Environment[env + "_REQUEST"]())
    }
  ]
}

export let PATTERN_STATES = [
  {
    component: PatternComponent,
    name     : 'app.1d-1',
    url      : '1d-1',
    resolve  : resolvers("1d-1", "FIRST_SIMPLE", connect, disconnect, castPattern)
  },
  {
    component: PatternComponent,
    name     : 'app.1d-2',
    url      : '1d-2',
    resolve  : resolvers("1d-2", "FIRST_COMPLEX", connect, disconnect, castPattern)
  },
  {
    component: PatternComponent,
    name     : 'app.2d-1',
    url      : '2d-1',
    resolve  : resolvers("2d-1", "SECOND_SIMPLE", connect2d, disconnect2d, castPattern2d)
  },
  {
    component: PatternComponent,
    name     : 'app.2d-2',
    url      : '2d-2',
    resolve  : resolvers("2d-2", "SECOND_COMPLEX", connect2d, disconnect2d, castPattern2d)
  }
];
