import {autoinject} from 'aurelia-framework';
import {Api} from '../../foundation';

@autoinject()
export class ZfPopup {
  constructor(foundationApi) {
    this.closable = 'popup';

    this.active = false;
    this.target = this.target || false;

    var attachment = this.pinTo || 'top center';
    var targetAttachment = this.pinAt || 'bottom center';
    var tetherInit = false;
    var tether     = {};

    //setup
    this.api.subscribe(attrs.id, function(msg) {
      if(msg[0] === 'show' || msg[0] === 'open') {
        this.show(msg[1]);
      } else if (msg[0] === 'close' || msg[0] === 'hide') {
        this.hide();
      } else if (msg[0] === 'toggle') {
        this.toggle(msg[1]);
      }
    });
  }

  hide() {
    this.active = false;
    tetherElement();
    tether.disable();
  };

  show(newTarget) {
    this.active = true;
    tetherElement(newTarget);
    tether.enable();
  };

  toggle(newTarget) {
    this.active = !this.active;
    tetherElement(newTarget);

    if(this.active) {
      tether.enable();
    } else  {
      tether.disable();
    }
  };

  tetherElement(target) {
    if(tetherInit) {
      return;
    }

    this.target = this.target ? document.getElementById(this.target) : document.getElementById(target);

    tether = new Tether({
      element: element[0],
      target: this.target,
      attachment: attachment,
      targetAttachment: targetAttachment,
      enable: false
    });

    tetherInit = true;
  }
}