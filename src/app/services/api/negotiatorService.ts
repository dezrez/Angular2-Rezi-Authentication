import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {AuthService} from '../auth/authService';
import * as config from '../../config';
import {Observable} from 'rxjs';
import {AppState} from '../../app.state';
import * as constants from '../../constants';

@Injectable()
export class NegotiatorService {
  constructor(private _authService: AuthService, private _http: Http, public appState: AppState) {}

  public Me(): Observable<any> {
    return this._http.get(`${config.ApiUrl}/api/negotiator/me`, this._authService.DefaultRequest())
      .map(res => res.json())
      .map(r => {
        this.appState.set(constants.LOGGED_IN_NEGOTIATOR, r);
        return r;
      });
  }
}
