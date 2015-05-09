@inject = FoundationApi;
class ZfTabHref {
  constructor(Api: api) {
    var target = attrs.zfTabHref;

    api.subscribe(target, function(msg) {
      if(msg === 'activate' || msg === 'show' || msg === 'open') {
        makeActive();
      }
    });


    element.on('click', function(e) {
      api.publish(target, 'activate');
      makeActive();
      e.preventDefault();
    });

    function makeActive() {
      element.parent().children().removeClass('is-active');
      element.addClass('is-active');
    }
  }
}