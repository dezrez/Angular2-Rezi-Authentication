import {Injectable} from 'angular2/core';
import {Http, RequestOptionsArgs} from 'angular2/http';
import {AppState} from '../../app.state';
import * as config from '../../config';
import * as constants from '../../constants';
import {Observable} from 'rxjs';

@Injectable()
export class AuthService {        
  constructor(public http: Http, public appState: AppState) {
  }
 
  public GetToken(oAuthCode: string): Observable<any> {
    var authConfig: any = { grant_type: "authorization_code", code: oAuthCode, redirect_uri: config.redirectUrl };
    var authHeader: any = { 
      "Content-Type": "application/json",
      "Authorization": this.GetAuthenticationUrl(config.clientId, config.clientPassword) 
    };
    
    var request: RequestOptionsArgs = {
      headers: authHeader
    };
    
    return this.http.post(config.tokenUrl, JSON.stringify(authConfig), request)
      .map(r => { 
        var j = r.json();
        localStorage.setItem(constants.AUTH_TOKEN, j.access_token);
        return j.access_token; 
      });
  }
  
  public BuildAuthUrl(): string {
    var state: string = Date.now() + "" + Math.random();
    var url: string = config.authenticationUrl + "?" +
      "client_id=" + encodeURI(config.clientId) + "&" +
      "redirect_uri=" + encodeURI(config.redirectUrl) + "&" +
      "response_type=" + encodeURI("code") + "&" +
      "scope=" + encodeURI(config.accessScope) + "&" +
      "state=" + encodeURI(state);
    return url;
  }
  
  public GetAndSetCode(url: string): string {
    var code = this.GetQueryStringValue("code", url);
    if (code) {
      this.appState.set(constants.AUTH_CODE, code);
    }
    
    return code;
  }
  
  public DefaultRequest(): RequestOptionsArgs {
    return {
      headers: <any>{
        "Content-Type": "application/json",
        "Authorization": `bearer ${localStorage.getItem(constants.AUTH_TOKEN)}`,
        "Rezi-Api-Version": "1" 
      }
    };
  }
  
  private GetQueryStringValue(key: string, url: string): string {
    key = key.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + key + "(=([^&#]*)|&|#|$)", "i"),
      results = regex.exec(url);
    if (!results) {
      return null;
    }
    if (!results[2]) {
      return '';
    }
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }
  
  private GetAuthenticationUrl(clientId: string, clientPassword: string) {
    var token: string = clientId + ":" + clientPassword;
    var hash: string = btoa(token);
    return "Basic " + hash;
  }
}
