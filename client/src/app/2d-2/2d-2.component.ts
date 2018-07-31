import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Environment } from '../../environments/environment';
import { HttpService } from '../../sdk/http.service';
import { SocketService } from '../../sdk/socket.service';
import { Observable } from 'rxjs/Observable';

@Component({
  templateUrl: './2d-2.component.html',
  styleUrls  : ['./2d-2.component.scss']
})
export class SecondComplexComponent implements OnInit, OnDestroy {

  @Input() session: any;

  constructor(private socketService: SocketService, private httpService: HttpService) {

  }

  ngOnInit() {
    let socketX = this.socketService.createAndSubscribeToNewSocketInstance(this.session.id + '-x');
    let socketY = this.socketService.createAndSubscribeToNewSocketInstance(this.session.id + '-y');

    Observable.zip(socketX, socketY, (x, y) => ({xId: x.id, yId: y.id, x: x.value, y: y.value}));

    // Decode Pattern
  }

  ngOnDestroy() {
    this.socketService.disconnect(this.session.id + '-x');
    this.socketService.disconnect(this.session.id + '-y');
  }

  private guess(pattern) {
    this.httpService.post(Environment.SECOND_COMPLEX_GUESS(this.session.id), {pattern: pattern}).then((response) => {
      if (response) {
        // SUCCESS
      } else {
        // FAILURE
      }
    }, (error) => {
      // ERROR
    });
  }
}
