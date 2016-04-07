import {
  it,
  inject,
  beforeEachProviders, 
  MockApplicationRef
} from 'angular2/testing';

// to use Translate Service, we need Http, and to test Http we need to mock the backend
import {BaseRequestOptions, Http} from 'angular2/http';
import {MockBackend} from 'angular2/http/testing';
import {provide, ApplicationRef} from "angular2/core";
import {ROUTER_PROVIDERS, ROUTER_PRIMARY_COMPONENT} from "angular2/router";

// Load the implementations that should be tested
import {App} from './app';
import {AppState} from './app.state';
import {AuthService} from './services/auth/authService';
import {NegotiatorService} from './services/api/negotiatorService';

describe('App', () => {
  // provide our implementations or mocks to the dependency injector
  // beforeEachProviders(() => [
  //   App,
  //   AuthService,
  //   NegotiatorService,
  //   AppState,
  //   BaseRequestOptions,
  //   MockBackend,
  //   // Provide a mocked (fake) backend for Http
  //   provide(Http, {
  //     useFactory: function useFactory(backend, defaultOptions) {
  //       return new Http(backend, defaultOptions);
  //     },
  //     deps: [MockBackend, BaseRequestOptions]
  //   }),
  //   ROUTER_PROVIDERS,
  //   provide(ROUTER_PRIMARY_COMPONENT, {useClass: App}),
  //   provide(ApplicationRef, { useClass: MockApplicationRef })
  // ]);

  // it('should have a null negotiator', inject([App], (app: App) => { 
  //   expect(app.negotiator).toBeNull();
  //  }));

});
