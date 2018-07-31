import { SecondComplexComponent } from './2d-2.component';
import { Environment } from '../../environments/environment';
import { HttpService } from '../../sdk/http.service';

export let SECOND_COMPLEX_STATES = [
  {
    name     : 'app.2d-2',
    url      : '2d-2',
    component: SecondComplexComponent,
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
  return httpService.get(Environment.SECOND_COMPLEX_REQUEST());
}
