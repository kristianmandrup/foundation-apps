import {autoinject} from 'aurelia-framework';
import {Api} from '../../foundation';

@autoinject()
export class ZfPopupToggle {
  constructor(api: Api) {
    var target = attrs.zfPopupToggle;
    var id = attrs.id || this.api.generateUuid();
    this.id = id;

    element.on('click', function(e) {
      this.api.publish(target, ['toggle', id]);
      e.preventDefault();
    });
  }
}