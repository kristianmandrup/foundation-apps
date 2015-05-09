@inject StateProvider, Router;
class FoundationState
  constructor(StateProvider: stateProvider, Router: router) {
    var complexViews = {};
    this.registerDynamicRoutes = registerDynamicRoutes(router.routes(), complexViews);
  }
}