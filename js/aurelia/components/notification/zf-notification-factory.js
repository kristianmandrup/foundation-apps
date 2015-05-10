import {autoinject} from 'aurelia-framework';
import {Api} from '../../foundation';
  
@autoinject()
export class NotificationFactory {
  constructor(api: Api) {
    var self = this, //for prototype functions
        container = element(config.container || document.body),
        id = config.id || this.api.generateUuid(),
        attached = false,
        destroyed = false,
        html,
        element,
        scope,
        contentScope
    ;

    var props = [
      'position'
    ];
  }

  checkStatus() {
    if(destroyed) {
      throw "Error: Notification Set was destroyed. Delete the object and create a new NotificationFactory instance."
    }
  }

  addNotification(notification) {
    checkStatus();
    var self = this;
    $timeout(function() {
      self.api.publish(id, notification);
    }, 0, false);
  }

  clearAll() {
    checkStatus();
    var self = this;
    timeout(function() {
      self.api.publish(id, 'clearall');
    }, 0, false);
  }

  init(state) {
    if(!attached && html.length > 0) {
      var modalEl = container.append(element);

      this.active = state;
      attached = true;
    }
  }

  assemble() {
    // check for duplicate element to prevent factory from cloning notification sets
    if (document.getElementById(id)) {
      return;
    }
    html = '<zf-notification-set id="' + id + '"></zf-notification-set>';

    element = angular.element(html);

    scope = $rootScope.$new();
    
    for(var i = 0; i < props.length; i++) {
      if(config[props[i]]) {
        element.attr(props[i], config[props[i]]);
      }
    }

    // access view scope variables
    if (config.contentScope) {
      contentScope = config.contentScope;
      for (var prop in contentScope) {
        if (contentScope.hasOwnProperty(prop)) {
          scope[prop] = contentScope[prop];
        }
      }
    }
    init(true);
  }

  destroy() {
    self.clearAll();
    setTimeout(function() {
      scope.$destroy();
      element.remove();
      destroyed = true;
    }, 3000);
    foundationApi.unsubscribe(id);
  }

}