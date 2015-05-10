import {autoinject} from 'aurelia-framework';
import {Api} from '../../foundation';

@autoinject()
export class zfTabContentCustom {
  constructor(api: Api) {
    var tabs = [];
    var children = element.children();

    for(node of children) {
      if(node.id) {
        var tabId = node.id;
        tabs.push(tabId);
        api.subscribe(tabId, function(msg) {
          if(msg === 'activate' || msg === 'show' || msg === 'open') {
            activateTabs(tabId);
          }
        });

        if(tabs.length === 1) {
          var el = element(node);
          el.addClass('is-active');
        }
      }
    });

    function activateTabs(tabId) {
      var tabNodes = element.children();
      angular.forEach(tabNodes, function(node) {
        var el = angular.element(node);
        el.removeClass('is-active');
        if(el.attr('id') === tabId) {
          el.addClass('is-active');
        }
      });
    }
  }
}