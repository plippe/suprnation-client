import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpService {

  constructor(private http: Http) {

  }

  public get(url: string) {
    return new Promise((resolve, reject) => {
      this.http.get(url).toPromise().then((response: any) => {
        let body = response.json();
        resolve(body);
      }, (error: any) => {
        reject(error);

      });
    });
  }

  public post(url: string, payload: any) {
    return new Promise((resolve, reject) => {
      this.http.post(url, payload).toPromise().then((response: any) => {
        let body = response.json();
        resolve(body);
      }, (error: any) => {
        reject(error);
      });
    });
  }
}
