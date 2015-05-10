import Api from     './api';
import Adapter from './adapter';
import Utils from   './utils';
import Setup from   './setup';
import {autoinject} from 'aurelia-framework';

export class Core {
  constructor(api: Api, adapter: Adapter, utils: Utils, setup: Setup) {
    this.setup.init();
  }
}
