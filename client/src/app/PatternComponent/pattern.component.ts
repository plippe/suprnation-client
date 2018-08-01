import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SocketService } from '../../sdk/socket.service';
import { HttpService } from '../../sdk/http.service';
import { Observable } from 'rxjs/Observable';
import { PatternService } from '../../sdk/pattern.service';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/catch';

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

  isLoading: boolean = false;
  guessed: boolean = undefined;

  constructor(private socketService: SocketService, private httpService: HttpService, private patternService: PatternService) {
  }

  ngOnInit() {
    this.isLoading = true;
    let finish = () => {
      this.disconnectFn(this.socketService, this.session.id);
      this.isLoading = false;
    }

    this.connectFn(this.socketService, this.session.id)
      .take(this.maxPatternLength * 2)
      .subscribe(
        data => {
          this.signals.push(data);
          this.updateChartValues();

          this.pattern = this.patternService.findPattern(this.signals, this.minPatternLength);
          if(this.pattern !== undefined) {
            finish()
          }
        },
        error => {
          console.log("Something bad happened: " + error);
          finish()
        },
        finish
      );
  }

  ngOnDestroy() {
    this.disconnectFn(this.socketService, this.session.id)
  }

  private guess(pattern) {
    let self = this;
    this.httpService.post(this.guessUrlFn(this.session.id), {pattern: pattern}).then((response) => {
      if (response) {
        self.guessed = true;
      } else {
        self.guessed = false;
      }
    }, (error) => {
      console.log("Something bad happened: " + error);
    });
  }

  @ViewChild("chart")
  chart: any;

  updateChartValues() {
    this.chartDataSets = [
      {label: 'X', data: this.signals.map((signal) => signal.x)},
      {label: 'Y', data: this.signals.map((signal) => signal.y)},
    ]

    let chartLabels = this.signals.map((_, i) => i);
    chartLabels.push(this.signals.length);
    this.chartLabels = chartLabels;

    if(this.chart !== undefined){
      this.chart.ngOnDestroy();
      this.chart.chart = this.chart.getChartBuilder(this.chart.ctx);
    }
  }

  chartDataSets: any[] = [];
  chartLabels: number[] = [];
  chartType: string = 'line';
  chartOptions: any = {
    legend: {
      display: true,
      position: 'left'
    },
    animation: { duration: 0 },
    showLines: false,
    hover: { mode: false },
    tooltips: { enabled: false }
  };

}
