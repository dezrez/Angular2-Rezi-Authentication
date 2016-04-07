import {
  it,
  inject,
  describe,
  beforeEachProviders,
} from 'angular2/testing';

// Load the implementations that should be tested
import {Home} from './home';
import {AppState} from '../../app.state';

describe('Home', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEachProviders(() => [
    AppState,
    Home
  ]);

  it('should log ngOnInit', inject([Home], (home) => {
    spyOn(console, 'log');

    home.ngOnInit();
    expect(home.negotiator).toBeUndefined();
  }));

});
