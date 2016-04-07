import {enableProdMode, provide} from "angular2/core";
import {bootstrap, ELEMENT_PROBE_PROVIDERS} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS, HashLocationStrategy, LocationStrategy} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';
import {APP_PROVIDERS} from './app/app';

const ENV_PROVIDERS = [];
if (process.env.ENV === 'build') {
  enableProdMode();
} else {
  ENV_PROVIDERS.push(ELEMENT_PROBE_PROVIDERS);
}

import {App} from './app/app';

function main() {
  return bootstrap(App, [
    ...HTTP_PROVIDERS,
    ...ROUTER_PROVIDERS,
    ...ENV_PROVIDERS,
    ...APP_PROVIDERS,
    provide(LocationStrategy, {useClass: HashLocationStrategy})
  ])
  .catch(err => console.error(err));
}

if (process.env.ENV !== 'build') {
    let ngHmr = require('angular2-hmr');
    ngHmr.hotModuleReplacement(main, module);
}

document.addEventListener('DOMContentLoaded', main);
