import {
  it,
  describe,
  expect,
  inject,
  beforeEachProviders
} from 'angular2/testing';
import {provide} from "angular2/core";
import {BaseRequestOptions, Response, ResponseOptions, Http} from 'angular2/http';
import {MockBackend, MockConnection} from 'angular2/http/testing';
import {Login} from './login';
import {AuthService} from '../../services/auth/authService';
import {AppState} from '../../app.state';

describe('Login Component', () => {

  beforeEachProviders((): any[] => [
    AuthService,
    BaseRequestOptions,
    MockBackend,
    provide(Http, {
      useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
        return new Http(backend, defaultOptions);
      },
      deps: [MockBackend, BaseRequestOptions]
    }),
    AppState,
    Login
  ]);


  it('should have an authService', inject([Login], (login: Login) => {
    expect(login.authService).not.toBeNull();
  }));

});
