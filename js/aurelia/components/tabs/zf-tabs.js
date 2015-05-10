import {autoinject} from 'aurelia-framework';
import Api from '../../foundation/api';

@autoinject()
export class ZfTabs {
  constructor(api: Api) {
    this.id = attrs.id || api.generateUuid();
    this.showTabContent = this.displaced !== 'true';

    //update tabs in case tab-content doesn't have them
    var updateTabs = function() {
      api.publish(this.id + '-tabs', scope.tabs);
    };

    api.subscribe(this.id + '-get-tabs', function() {
      updateTabs();
    });
  }
}