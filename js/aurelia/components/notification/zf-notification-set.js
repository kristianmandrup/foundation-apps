import {autoinject} from 'aurelia-framework';
import {Api} from '../../foundation';
import Notification from './notification';

@autoinject()
export class zfNotificationSet {
  constructor(api: Api, notification: Notification) {
    this.position = this.position ? this.position.split(' ').join('-') : 'top-right';

    this.api.subscribe(attrs.id, function(msg) {
      if(msg === 'clearall') {
        notification.clearAll();
      }
      else {
        notification.addNotification(msg);
      }
    });
  }
}