import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PatternComponent } from './pattern.component';
import { UIRouterModule } from '@uirouter/angular';
import { PATTERN_STATES } from './pattern.routes';

@NgModule({
  declarations: [
    PatternComponent
  ],
  imports     : [
    BrowserModule,
    UIRouterModule.forChild({
      states: PATTERN_STATES
    })
  ]
})
export class PatternModule {
}
