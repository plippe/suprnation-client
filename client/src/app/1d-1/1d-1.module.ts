import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FirstSimpleComponent } from './1d-1.component';
import { UIRouterModule } from '@uirouter/angular';
import { FIRST_SIMPLE_STATES } from './1d-1.routes';

@NgModule({
  declarations: [
    FirstSimpleComponent
  ],
  imports     : [
    BrowserModule,
    UIRouterModule.forChild({
      states: FIRST_SIMPLE_STATES
    })
  ]
})
export class FirstSimpleModule {
}
