import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Environment } from '../../environments/environment';
import { HttpService } from '../../sdk/http.service';
import { SocketService } from '../../sdk/socket.service';
import { Observable } from 'rxjs/Observable';
import { PatternService } from '../../sdk/pattern.service';
import 'rxjs/add/operator/take';

@Component({
  templateUrl: './2d-1.component.html',
  styleUrls  : ['./2d-1.component.scss']
})

export class SecondSimpleComponent implements OnInit, OnDestroy {

  @Input() session: any;

  signals: any[] = [];
  pattern: any[] = undefined;

  minPatternLength: number = 100
  maxPatternLength: number = 500

  constructor(private socketService: SocketService, private httpService: HttpService, private patternService: PatternService) {

  }

  ngOnInit() {
    let socketX = this.socketService.createAndSubscribeToNewSocketInstance(this.session.id + '-x');
    let socketY = this.socketService.createAndSubscribeToNewSocketInstance(this.session.id + '-y');

    Observable
      .zip(socketX, socketY, (x, y) => ({x: x.value, y: y.value}))
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
    this.socketService.disconnect(this.session.id + '-x');
    this.socketService.disconnect(this.session.id + '-y');
  }

  private guess(pattern) {
    this.httpService.post(Environment.SECOND_SIMPLE_GUESS(this.session.id), {pattern: pattern}).then((response) => {
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
