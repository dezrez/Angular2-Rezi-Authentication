import {Component, OnInit} from 'angular2/core';
import {AuthService} from '../../services/auth/authService';


@Component({
  selector: 'login',
  templateUrl: require('./login.html'),
  styleUrls: [require('./login.css')],
  providers: [AuthService],
  directives: [],
  pipes: []
})
export class Login implements OnInit {

  constructor(public authService: AuthService) { }
  
  ngOnInit() {
    var authUrl: string = this.authService.BuildAuthUrl();
    window.location.href = authUrl;
  }
}
