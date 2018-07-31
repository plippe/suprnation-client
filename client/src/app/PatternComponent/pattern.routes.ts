import { PatternComponent } from './pattern.component';
import { SocketService } from '../../sdk/socket.service';
import { HttpService } from '../../sdk/http.service';
import { Environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';

export let PATTERN_STATES = [
  {
    component: PatternComponent,
    name     : 'app.1d-1',
    url      : '1d-1',
    resolve  : [
      { token    : 'title', resolveFn: _ => "1d-1" },
      { token    : 'guessUrlFn', resolveFn: _ => Environment.FIRST_SIMPLE_GUESS },
      { token    : 'connectFn', resolveFn: _ => connect },
      { token    : 'disconnectFn', resolveFn: _ => disconnect },
      {
        token    : 'session',
        deps     : [HttpService],
        resolveFn: (httpService) => httpService.get(Environment.FIRST_SIMPLE_REQUEST())
      }
    ]
  },
  {
    component: PatternComponent,
    name     : 'app.1d-2',
    url      : '1d-2',
    resolve  : [
      { token    : 'title', resolveFn: _ => "1d-2" },
      { token    : 'guessUrlFn', resolveFn: _ => Environment.FIRST_COMPLEX_GUESS },
      { token    : 'connectFn', resolveFn: _ => connect },
      { token    : 'disconnectFn', resolveFn: _ => disconnect },
      {
        token    : 'session',
        deps     : [HttpService],
        resolveFn: (httpService) => httpService.get(Environment.FIRST_COMPLEX_REQUEST())
      }
    ]
  },
  {
    component: PatternComponent,
    name     : 'app.2d-1',
    url      : '2d-1',
    resolve  : [
      { token    : 'title', resolveFn: _ => "2d-1" },
      { token    : 'guessUrlFn', resolveFn: _ => Environment.SECOND_SIMPLE_GUESS },
      { token    : 'connectFn', resolveFn: _ => connect2d },
      { token    : 'disconnectFn', resolveFn: _ => disconnect2d },
      {
        token    : 'session',
        deps     : [HttpService],
        resolveFn: (httpService) => httpService.get(Environment.SECOND_SIMPLE_REQUEST())
      }
    ]
  },
  {
    component: PatternComponent,
    name     : 'app.2d-2',
    url      : '2d-2',
    resolve  : [
      { token    : 'title', resolveFn: _ => "2d-2" },
      { token    : 'guessUrlFn', resolveFn: _ => Environment.SECOND_COMPLEX_GUESS },
      { token    : 'connectFn', resolveFn: _ => connect2d },
      { token    : 'disconnectFn', resolveFn: _ => disconnect2d },
      {
        token    : 'session',
        deps     : [HttpService],
        resolveFn: (httpService) => httpService.get(Environment.SECOND_COMPLEX_REQUEST())
      }
    ]
  }
];

interface UpdateResponce {
  value: number
}

let connect = function(socketService: SocketService, sessionId: String): Observable<any> {
  return socketService.createAndSubscribeToNewSocketInstance(sessionId)
    .map((x: UpdateResponce) => x.value)
}

let disconnect = function(socketService: SocketService, sessionId: String) {
  socketService.disconnect(sessionId);
}

let connect2d = function(socketService: SocketService, sessionId: String): Observable<any> {
  let socketX = socketService.createAndSubscribeToNewSocketInstance(sessionId + '-x');
  let socketY = socketService.createAndSubscribeToNewSocketInstance(sessionId + '-y');

  return Observable.zip(socketX, socketY, (x: UpdateResponce, y: UpdateResponce) => ({x: x.value, y: y.value}));
}

let disconnect2d = function(socketService: SocketService, sessionId: String) {
  socketService.disconnect(sessionId + '-x');
  socketService.disconnect(sessionId + '-y');
}
