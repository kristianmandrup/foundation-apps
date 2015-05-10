import {autoinject} from 'aurelia-framework';
import {Api} from '../../foundation';

@autoinject()
export class ZfNotify {
  constructor(api: Api) {
    element.on('click', function(e) {
      api.publish(attrs.zfNotify, {
        title: scope.title,
        content: scope.content,
        color: scope.color,
        image: scope.image,
        autoclose: scope.autoclose
      });
      e.preventDefault();
    });
  }
}