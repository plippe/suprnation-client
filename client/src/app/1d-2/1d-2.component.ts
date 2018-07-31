import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Environment } from '../../environments/environment';
import { HttpService } from '../../sdk/http.service';
import { SocketService } from '../../sdk/socket.service';
import { PatternService } from '../../sdk/pattern.service';
import 'rxjs/add/operator/take';

@Component({
  templateUrl: './1d-2.component.html',
  styleUrls  : ['./1d-2.component.scss']
})
export class FirstComplexComponent implements OnInit, OnDestroy {

  @Input() session: any;

  signals: number[] = [];
  pattern: number[] = undefined;

  minPatternLength: number = 2
  maxPatternLength: number = 500

  constructor(private socketService: SocketService, private httpService: HttpService, private patternService: PatternService) {

  }

  ngOnInit() {
    let socketSubscription = this.socketService.createAndSubscribeToNewSocketInstance(this.session.id);
    socketSubscription
      .take(this.maxPatternLength * 2)
      .map(data => data.value)
      .forEach(data => {
        this.signals.push(data);

        let patternFound = this.patternService.findPattern(this.signals, this.minPatternLength);
        if(patternFound !== undefined) {
          this.pattern = patternFound;
          this.socketService.disconnect(this.session.id);
        }
      });
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
