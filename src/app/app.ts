import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {FORM_PROVIDERS} from 'angular2/common';

import '../style/app.scss';

import {AuthService} from './services/auth/authService';
import {NegotiatorService} from './services/api/negotiatorService';
import {AppState} from './app.state';
import {Home} from './components/home/home';
import {About} from "./components/about/about";
import {Login} from './components/login/login';
import * as constants from './constants';

export const APP_PROVIDERS = [
  AppState
];

@Component({
  selector: 'app', // <app></app>
  providers: [...FORM_PROVIDERS, AuthService, NegotiatorService],
  directives: [...ROUTER_DIRECTIVES],
  pipes: [],
  styles: [require('./app.scss')],
  template: require('./app.html')
})
@RouteConfig([
  {path: '/', component: Home, name: 'Home'},
  {path: '/About', component: About, name: 'About'},
  {path: '/login', component: Login, name: 'Login'}
])
export class App {
  public negotiator: any = null;
    
  constructor(
      public authService: AuthService,
      public negotiatorService: NegotiatorService,
      public appState: AppState,
      public router: Router
  ) {}
  
  ngOnInit() {
    if (localStorage.getItem(constants.AUTH_TOKEN)) {
      this.negotiatorService.Me().subscribe(
        data => {
          this.negotiator = data;
          this.router.renavigate();
        },
        err => { 
          console.error(err);
          //this.router.navigate(['Login']);
        }
      );
    }
    var url: string = window.location.search;
    var authCode: string = this.authService.GetAndSetCode(url);
    if (authCode) {
      this.authService.GetToken(authCode).subscribe(t => window.location.reload(true));
    }
  }
}
