import {autoinject} from 'aurelia-framework';
import {Api} from '../../foundation';
import Hammer from 'hammerjs';
import Notification from './notification';

@autoinject()
class ZfNotification {
  constructor(api: Api, notification: Notification) {
    this.zfClosable = 'notification';

    this.active = false;
    var animationIn  = attrs.animationIn || 'fadeIn';
    var animationOut = attrs.animationOut || 'fadeOut';
    var hammerElem;

    //due to dynamic insertion of DOM, we need to wait for it to show up and get working!
    setTimeout(function() {
      this.active = true;
      this.api.animate(element, this.active, animationIn, animationOut);
    }, 50);

    // close if autoclose
    if (this.autoclose) {
      setTimeout(function() {
        if (this.active) {
          this.hide();
        }
      }, parseInt(this.autoclose));
    };

    // close on swipe
    if (Hammer) {
      hammerElem = new Hammer(element[0]);
      // set the options for swipe (to make them a bit more forgiving in detection)
      hammerElem.get('swipe').set({
        direction: Hammer.DIRECTION_ALL,
        threshold: 5, // this is how far the swipe has to travel
        velocity: 0.5 // and this is how fast the swipe must travel
      });
    }

    hammerElem.on('swipe', function() {
      if (this.active) {
        this.hide();
      }
    });    
  }

  hide() {
    this.active = false;
    this.api.animate(element, this.active, animationIn, animationOut);
    setTimeout(function() {
      notification.removeNotification(this.notifId);
    }, 50);
  }

}