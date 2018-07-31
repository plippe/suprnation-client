import { FirstSimpleComponent } from './1d-1.component';
import { HttpService } from '../../sdk/http.service';
import { Environment } from '../../environments/environment';

export let FIRST_SIMPLE_STATES = [
  {
    name     : 'app.1d-1',
    url      : '1d-1',
    component: FirstSimpleComponent,
    resolve  : [
      {
        token    : 'session',
        deps     : [HttpService],
        resolveFn: sessionResolver

      }
    ]
  }
];

export function sessionResolver(httpService: HttpService) {
  return httpService.get(Environment.FIRST_SIMPLE_REQUEST());
}
