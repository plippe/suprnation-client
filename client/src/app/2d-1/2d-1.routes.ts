import { SecondSimpleComponent } from './2d-1.component';
import { Environment } from '../../environments/environment';
import { HttpService } from '../../sdk/http.service';

export let SECOND_SIMPLE_STATES = [
  {
    name     : 'app.2d-1',
    url      : '2d-1',
    component: SecondSimpleComponent,
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
  return httpService.get(Environment.SECOND_SIMPLE_REQUEST());
}
