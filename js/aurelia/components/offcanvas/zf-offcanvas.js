import {autoinject} from 'aurelia-framework';
import {Api} from '../../foundation';

@autoinject()
class zfOffcanvas {
  constructor(foundationApi) {
    var type = 'offcanvas';

    this.zfClosable = type;
    document.body.classList.add('has-off-canvas');

    this.position = this.position || 'left';
    this.active = false;
    //setup
    this.api.subscribe(attrs.id, function(msg) {
      if(msg === 'show' || msg === 'open') {
        this.show();
      } else if (msg === 'close' || msg === 'hide') {
        this.hide();
      } else if (msg === 'toggle') {
        this.toggle();
      }
    });
  }

  hide() {
    this.active = false;
  }

  show() {
    this.active = true;
  }

  toggle() {
    this.active = !this.active;
  }
}