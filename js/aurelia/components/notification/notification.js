import NotificationFactory from './notification-factory';
import {autoinject} from 'aurelia-framework';
import {Api} from '../../foundation';

@autoinject()
export class Notification {
  constructor(api: Api, factory: NotificationFactory) {
    this.notifications = this.notifications || [];
  }

  //target should be element ID
  activate(target) {
    this.api.publish(target, 'show');
  }

  //target should be element ID
  deactivate(target) {
    this.api.publish(target, 'hide');
  }

  toggle(target) {
    this.api.publish(target, 'toggle');
  }

  createNotificationSet(config) {
    return new NotificationFactory(config);
  }

  addNotification(info) {
    var id  = foundationApi.generateUuid();
    info.id = id;
    this.notifications.push(info);
  };

  removeNotification(id) {
    this.notifications.forEach(function(notification) {
      if(notification.id === id) {
        var ind = this.notifications.indexOf(notification);
        this.notifications.splice(ind, 1);
      }
    });
  }

  clearAll() {
    while(this.notifications.length > 0) {
      this.notifications.pop();
    }
  }
}
