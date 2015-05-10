import {autoinject} from 'aurelia-framework';
import Core from './core'

@autoinject()
export class MediaQuery {
  constructor(mqInit: MQInit, mqHelpers: MQHelpers, mq: MQ) {
    this.mqInit.init();
  }
}
