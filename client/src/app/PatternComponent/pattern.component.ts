import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SocketService } from '../../sdk/socket.service';
import { HttpService } from '../../sdk/http.service';
import { Observable } from 'rxjs/Observable';
import { PatternService } from '../../sdk/pattern.service';
import 'rxjs/add/operator/take';

@Component({
  templateUrl: './pattern.component.html',
  styleUrls  : ['./pattern.component.scss']
})
export class PatternComponent implements OnInit, OnDestroy {

  @Input() session: any;
  @Input() title: any;

  @Input() guessUrlFn: (String) =>any;
  @Input() connectFn: (SocketService, String) => Observable<any>;
  @Input() disconnectFn: (SocketService, String) =>void;

  signals: number[] = [];
  pattern: number[] = undefined;

  minPatternLength: number = 2
  maxPatternLength: number = 500

  constructor(private socketService: SocketService, private httpService: HttpService, private patternService: PatternService) {
  }

  ngOnInit() {
    this.connectFn(this.socketService, this.session.id)
      .take(this.maxPatternLength * 2)
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
    this.disconnectFn(this.socketService, this.session.id)
  }

  private guess(pattern) {
    this.httpService.post(this.guessUrlFn(this.session.id), {pattern: pattern}).then((response) => {
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
