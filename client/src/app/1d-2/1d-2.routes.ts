import { FirstComplexComponent } from './1d-2.component';
import { Environment } from '../../environments/environment';
import { HttpService } from '../../sdk/http.service';

export let FIRST_COMPLEX_STATES = [
  {
    name     : 'app.1d-2',
    url      : '1d-2',
    component: FirstComplexComponent,
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
  return httpService.get(Environment.FIRST_COMPLEX_REQUEST());
}
