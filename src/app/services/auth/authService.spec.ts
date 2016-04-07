import {
  it,
  iit,
  describe,
  ddescribe,
  expect,
  inject,
  injectAsync,
  TestComponentBuilder,
  beforeEachProviders
} from 'angular2/testing';
import {provide} from 'angular2/core';
import {AuthService} from './authService';


describe('AuthService Service', () => {

  beforeEachProviders(() => [AuthService]);


  // it('should ...', inject([AuthService], (service: AuthService) => {

  // }));

});
