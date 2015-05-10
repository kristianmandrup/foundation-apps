import {autoinject} from 'aurelia-framework';
import Api from '../../foundation/api';
import Tab from './tab';

@autoinject()
export class ZfTabIndividual {
  constructor(api: Api, tab: Tab) {
    var id = tab.id;

    tab.scope.transcludeFn(tab, function(tabContent) {
      element.append(tabContent);
    });

    api.subscribe(tab.id, function(msg) {
      api.publish(tab.parentContent, ['activate', tab.id]);
    });
  }
}