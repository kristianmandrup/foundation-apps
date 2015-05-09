@inject = Api;
class ZfTabCustom {
  constructor(foundationApi) {
    var children = element.children();
    angular.element(children[0]).addClass('is-active');
  }
}