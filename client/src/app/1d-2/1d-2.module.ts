import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { UIRouterModule } from '@uirouter/angular';
import { FIRST_COMPLEX_STATES } from './1d-2.routes';
import { FirstComplexComponent } from './1d-2.component';

@NgModule({
  declarations: [
    FirstComplexComponent
  ],
  imports     : [
    BrowserModule,
    UIRouterModule.forChild({
      states: FIRST_COMPLEX_STATES
    })
  ]
})
export class FirstComplexModule {
}
