import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { UIRouterModule } from '@uirouter/angular';
import { SecondComplexComponent } from './2d-2.component';
import { SECOND_COMPLEX_STATES } from './2d-2.routes';

@NgModule({
  declarations: [
    SecondComplexComponent
  ],
  imports     : [
    BrowserModule,
    UIRouterModule.forChild({
      states: SECOND_COMPLEX_STATES
    })
  ]
})
export class SecondComplexModule {
}
