import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {AuthHttp} from 'angular2-jwt';

import {AuthService} from '../auth-service/auth-service';

export class Report {
  _id: string;
  title: string;
  description: string;
  category: string;
  base64Image: string;
  location: {
    type: String,
    coordinates: number[]
  }

  constructor() {
    this.location = {
      type: "Point",
      coordinates: undefined
    };
  }
}

@Injectable()
export class ReportService {
  constructor(private http: Http,
              private authHttp: AuthHttp,
              private auth: AuthService) {}

  public getAll() {
    return this.http.get('http://localhost:8080/api/reports')
      .map(res => res.json())
  }

  public add(report: Report) {
    let headers = new Headers({'Content-Type': 'application/json'});

    return this.authHttp.post('http://localhost:8080/api/reports', JSON.stringify(report), {headers: headers})
      .toPromise()
  }

  public update(report: Report) {
    let headers = new Headers({'Content-Type': 'application/json'});

    return this.authHttp.put('http://localhost:8080/api/reports', JSON.stringify(report), {headers: headers})
      .toPromise()
  }

  public delete(report: Report) {
    return this.authHttp.delete('http://localhost:8080/api/reports/' + report._id)
      .toPromise()
  }
}
