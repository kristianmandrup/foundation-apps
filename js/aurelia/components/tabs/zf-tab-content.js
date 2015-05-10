import {autoinject} from 'aurelia-framework';
import {Api} from '../../foundation';

@autoinject()
export class zfTabContent {
  constructor(api: Api) {
    this.tabs = this.tabs || [];
    var id = this.target;
    var self = this;

    api.subscribe(id, function(msg) {
      if(msg[0] === 'activate') {
        var tabId = msg[1];
        self.tabs.forEach(function (tab) {
          tab.active = false;

          if(tab.id === id) {
            tab.active = true;
            tab.active = true;
          }
        });
      }
    });

    //if tabs empty, request tabs
    if(self.tabs.length === 0) {
      api.subscribe(id + '-tabs', function(tabs) {
        self.tabs = tabs;
      });

      api.publish(id + '-get-tabs', '');
    }
  }
}