import {autoinject} from 'aurelia-framework';

@autoinject()
export class FoundationState {
  constructor(stateProvider: StateProvider, router: Router) {
    this.registerDynamicRoutes = registerDynamicRoutes(router.routes(), {});
  }
}