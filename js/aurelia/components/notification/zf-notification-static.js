import {autoinject} from 'aurelia-framework';
import {Api} from '../../foundation';

@autoinject()
export class ZfNotificationStatic {
  constructor(api: Api) {
    var type = 'notification';
    this.zfClosable = type;
    this.position = attrs.position ? attrs.position.split(' ').join('-') : 'top-right';

    var animationIn = attrs.animationIn || 'fadeIn';
    var animationOut = attrs.animationOut || 'fadeOut';

    //setup
    this.api.subscribe(attrs.id, function(msg) {
      if(msg == 'show' || msg == 'open') {
        this.show();
        // close if autoclose
        if (this.autoclose) {
          setTimeout(function() {
            if (this.active) {
              this.hide();
            }
          }, parseInt(this.autoclose));
        };
      } else if (msg == 'close' || msg == 'hide') {
        this.hide();
      } else if (msg == 'toggle') {
        this.toggle();
        // close if autoclose
        if (this.autoclose) {
          setTimeout(function() {
            if (this.active) {
              this.toggle();
            }
          }, parseInt(this.autoclose));
        };
      }

      this.api.animate(element, this.active, animationIn, animationOut);
    });
  }

  hide() {
    this.active = false;
    this.api.animate(element, this.active, animationIn, animationOut);
  }

  show() {
    this.active = true;
    this.api.animate(element, this.active, animationIn, animationOut);
  }

  toggle() {
    this.active = !this.active;
    this.api.animate(element, this.active, animationIn, animationOut);
  }
}