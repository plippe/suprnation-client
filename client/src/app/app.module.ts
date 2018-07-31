import './operators';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { APP_STATES } from './app.routes';
import { UIRouterModule, UIView } from '@uirouter/angular';
import { FirstSimpleModule } from './1d-1/1d-1.module';
import { FirstComplexModule } from './1d-2/1d-2.module';
import { SecondSimpleModule } from './2d-1/2d-1.module';
import { SecondComplexModule } from './2d-2/2d-2.module';
import { HttpService } from '../sdk/http.service';
import { SocketIoModule } from 'ng-socket-io';
import { HttpModule } from '@angular/http';
import { SocketService } from '../sdk/socket.service';

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

    FirstSimpleModule,
    FirstComplexModule,
    SecondSimpleModule,
    SecondComplexModule
  ],
  providers   : [
    HttpService,
    SocketService
  ],
  bootstrap   : [UIView]
})
export class AppModule {
}
