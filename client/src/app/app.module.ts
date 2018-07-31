import './operators';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { APP_STATES } from './app.routes';
import { UIRouterModule, UIView } from '@uirouter/angular';
import { PatternModule } from './PatternComponent/pattern.module';
import { HttpService } from '../sdk/http.service';
import { SocketIoModule } from 'ng-socket-io';
import { HttpModule } from '@angular/http';
import { SocketService } from '../sdk/socket.service';
import { PatternService } from '../sdk/pattern.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports     : [
    BrowserModule,
    HttpModule,
    SocketIoModule,
    UIRouterModule.forRoot({
      states: APP_STATES
    }),

    PatternModule
  ],
  providers   : [
    HttpService,
    SocketService,
    PatternService
  ],
  bootstrap   : [UIView]
})
export class AppModule {
}
