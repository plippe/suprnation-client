import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Environment } from '../../environments/environment';
import { HttpService } from '../../sdk/http.service';
import { SocketService } from '../../sdk/socket.service';

@Component({
  templateUrl: './1d-2.component.html',
  styleUrls  : ['./1d-2.component.scss']
})
export class FirstComplexComponent implements OnInit, OnDestroy {

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
    this.httpService.post(Environment.FIRST_COMPLEX_GUESS(this.session.id), {pattern: pattern}).then((response) => {
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
