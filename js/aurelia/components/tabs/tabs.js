import {autoinject} from 'aurelia-framework';
import {Api} from '../../foundation';

@autoinject()
export class Tabs {
  id         = ''
  tabs       = []

  constructor(api: Api) {
    this.api = api;
  }
  
  //target should be element ID
  activate(target) {
    this.api.publish(target, 'show');
  }

  select(selectTab) {
    for (tab in tabs) {
      tab.active = false;
      tab.scope.active = false;

      if(tab.scope === selectTab) {
        this.api.publish(this.id, ['activate', tab]);

        tab.active = true;
        tab.scope.active = true;
      }
    });
  }

  addTab(tabScope) {
    tabs.push({ scope: tabScope, active: false, parentContent: this.id });

    if(tabs.length === 1) {
      tabs[0].active = true;
      tabScope.active = true;
    }
  };
}