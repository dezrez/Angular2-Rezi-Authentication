import {Component, OnInit} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {AppState} from '../../app.state';
import {CanReuse} from 'angular2/router';
import * as constants from '../../constants';

@Component({
  selector: 'home',
  directives: [...FORM_DIRECTIVES],
  providers: [],
  pipes: [],
  styles: [require('./home.scss')],
  template: require('./home.html')
})
export class Home implements OnInit, CanReuse {
  public negotiator: any = {};

  constructor(public appState: AppState) {
  }

  ngOnInit() {    
    this.negotiator = this.appState.get(constants.LOGGED_IN_NEGOTIATOR);
  }
  
  routerCanReuse(): boolean {
    return false;
  }
}
