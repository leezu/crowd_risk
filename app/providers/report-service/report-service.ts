import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {AuthHttp} from 'angular2-jwt';
import {AuthService} from '../auth-service/auth-service';
import {BackendConfig} from '../../config'

export class Report {
  _id: string;
  user: string;
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
    return this.http.get(BackendConfig.BACKEND_URL + '/api/reports')
      .map(res => res.json())
  }

  public add(report: Report) {
    let headers = new Headers({'Content-Type': 'application/json'});

    return this.authHttp.post(BackendConfig.BACKEND_URL + '/api/reports', JSON.stringify(report), {headers: headers})
      .toPromise()
  }

  public update(report: Report) {
    let headers = new Headers({'Content-Type': 'application/json'});

    return this.authHttp.put(BackendConfig.BACKEND_URL + '/api/reports', JSON.stringify(report), {headers: headers})
      .toPromise()
  }

  public delete(report: Report) {
    return this.authHttp.delete(BackendConfig.BACKEND_URL + '/api/reports/' + report._id)
      .toPromise()
  }
}
