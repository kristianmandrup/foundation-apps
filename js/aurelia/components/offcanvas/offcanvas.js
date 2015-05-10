import {autoinject} from 'aurelia-framework';
import {Api} from '../../foundation';

@autoinject()
export class Offcanvas {
  constructor(api: Api) {
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
}

