import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {BackendConfig} from '../../config'

@Injectable()
export class UserService {
  constructor(private http: Http) {}

  public getNumberOfComments(user_id: string) {
    return this.http.get(BackendConfig.BACKEND_URL + '/api/users/' + user_id + "/comments/count")
      .map(res => res.json())
  }

  public getNumberOfReports(user_id: string) {
    return this.http.get(BackendConfig.BACKEND_URL + '/api/users/' + user_id + "/reports/count")
      .map(res => res.json())
  }
}
