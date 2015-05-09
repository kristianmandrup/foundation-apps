class FoundationAdapter {
  constructor(FoundationApi: foundationApi) {
    var service    = {};

    service.activate = activate;
    service.deactivate = deactivate;

    return service;

    function activate(target) {
      foundationApi.publish(target, 'show');
    }

    function deactivate(target) {
      foundationApi.publish(target, 'hide');
    }
  }
}