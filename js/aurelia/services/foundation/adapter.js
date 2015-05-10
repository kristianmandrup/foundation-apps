import {autoinject} from 'aurelia-framework';

@autoinject()
export class Adapter {
  constructor(api: Api) {
  }

  activate(target) {
    this.api.publish(target, 'show');
  }

  deactivate(target) {
    this.api.publish(target, 'hide');
  }
}