import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { UIRouterModule } from '@uirouter/angular';
import { SecondSimpleComponent } from './2d-1.component';
import { SECOND_SIMPLE_STATES } from './2d-1.routes';

@NgModule({
  declarations: [
    SecondSimpleComponent
  ],
  imports     : [
    BrowserModule,
    UIRouterModule.forChild({
      states: SECOND_SIMPLE_STATES
    })
  ]
})
export class SecondSimpleModule {
}
