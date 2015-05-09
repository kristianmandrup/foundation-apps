import Api from '../../foundation/api';
import Tab from './tab';

@inject Api;
class ZfTabIndividual {
  constructor(Api: api, Tab: tab) {
    var id = tab.id;

    tab.scope.transcludeFn(tab, function(tabContent) {
      element.append(tabContent);
    });

    api.subscribe(tab.id, function(msg) {
      api.publish(tab.parentContent, ['activate', tab.id]);
    });
  }
}