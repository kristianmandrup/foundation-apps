import Api from     './api';
import Adapter from './adapter';
import Utils from   './utils';
import Setup from   './setup';

@inject FoundationAnimation
class Core {
  constructor(Api: api, Adapter: adapter, Utils: utils, Setup: setup) {
    setup.init();
  }
}
