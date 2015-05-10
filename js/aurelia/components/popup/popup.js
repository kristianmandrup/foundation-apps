import {autoinject} from 'aurelia-framework';
import {Api} from '../../foundation';

@autoinject()
export class Popup {
  constructor(api: Api) {
  }

  //target should be element ID
  activate(target) {
    foundationApi.publish(target, 'show');
  }

  //target should be element ID
  deactivate(target) {
    foundationApi.publish(target, 'hide');
  }

  toggle(target, popupTarget) {
    foundationApi.publish(target, ['toggle', popupTarget]);
  }
}
