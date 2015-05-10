import {autoinject} from 'aurelia-framework';
import {Api} from '../../foundation';

@autoinject()
export class ZfTabCustom {
  constructor(api: Api) {
    var children = element.children();
    angular.element(children[0]).addClass('is-active');
  }
}