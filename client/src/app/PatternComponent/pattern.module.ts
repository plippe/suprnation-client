import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PatternComponent } from './pattern.component';
import { UIRouterModule } from '@uirouter/angular';
import { PATTERN_STATES } from './pattern.routes';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    PatternComponent
  ],
  imports     : [
    BrowserModule,
    UIRouterModule.forChild({
      states: PATTERN_STATES
    }),
    ChartsModule
  ]
})
export class PatternModule {
}
