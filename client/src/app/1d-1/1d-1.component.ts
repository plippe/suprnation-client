import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SocketService } from '../../sdk/socket.service';
import { HttpService } from '../../sdk/http.service';
import { Environment } from '../../environments/environment';

@Component({
  templateUrl: './1d-1.component.html',
  styleUrls  : ['./1d-1.component.scss']
})
export class FirstSimpleComponent implements OnInit, OnDestroy {

  @Input() session: any;

  constructor(private socketService: SocketService, private httpService: HttpService) {

  }

  ngOnInit() {
    let socketSubscription = this.socketService.createAndSubscribeToNewSocketInstance(this.session.id);

    // Decode Pattern
  }

  ngOnDestroy() {
    this.socketService.disconnect(this.session.id);
  }

  private guess(pattern) {
    this.httpService.post(Environment.FIRST_SIMPLE_GUESS(this.session.id), {pattern: pattern}).then((response) => {
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
