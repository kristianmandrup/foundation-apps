@inject Api;
class ZfTab {
  constructor(Api: api, Tabs: tabs) {    
    this.id = attrs.id || foundationApi.generateUuid();
    this.active = false;
    this.transcludeFn = transclude;
    tabs.addTab(this);
    var self = this;

    api.subscribe(this.id, function(msg) {
      if(msg === 'show' || msg === 'open' || msg === 'activate') {
        this.makeActive();
      }
    });

    this.makeActive = function() {
      tabs.select(self);
    };
  }
}