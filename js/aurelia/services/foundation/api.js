@inject FoundationAnimation;
class FoundationApi(FoundationAnimation) {
  constructor() {
    var listeners  = {};
    var settings   = {};
    var uniqueIds  = [];
    var service    = {};

    service.subscribe           = subscribe;
    service.unsubscribe         = unsubscribe;
    service.publish             = publish;
    service.getSettings         = getSettings;
    service.modifySettings      = modifySettings;
    service.generateUuid        = generateUuid;
    service.toggleAnimate       = toggleAnimate;
    service.closeActiveElements = closeActiveElements;
    service.animate             = animate;    
    return service;    
  }


  subscribe(name, callback) {
    if (!listeners[name]) {
      listeners[name] = [];
    }

    listeners[name].push(callback);
    return true;
  }

  unsubscribe(name, callback) {
    if (listeners[name] !== undefined) {
      delete listeners[name];
    }
    if (typeof callback == 'function') {
        callback.call(this);
    }
  }

  publish(name, msg) {
    if (!listeners[name]) {
      listeners[name] = [];
    }

    listeners[name].forEach(function(cb) {
      cb(msg);
    });

    return;
  }

  getSettings() {
    return settings;
  }

  modifySettings(tree) {
    settings = angular.extend(settings, tree);
    return settings;
  }

  generateUuid() {
    var uuid = '';

    //little trick to produce semi-random IDs
    do {
      uuid += 'zf-uuid-';
      for (var i=0; i<15; i++) {
        uuid += Math.floor(Math.random()*16).toString(16);
      }
    } while(!uniqueIds.indexOf(uuid));

    uniqueIds.push(uuid);
    return uuid;
  }

  toggleAnimate(element, futureState) {
    FoundationAnimation.toggleAnimate(element, futureState);
  }

  closeActiveElements(options) {
    var self = this;
    options = options || {};
    var activeElements = document.querySelectorAll('.is-active[zf-closable]');
    // action sheets are nested zf-closable elements, so we have to target the parent
    var nestedActiveElements = document.querySelectorAll('[zf-closable] > .is-active')
    
    if (activeElements.length) {
      angular.forEach(activeElements, function(el) {
        if (options.exclude !== el.id) {
          self.publish(el.id, 'close');
        }
      });
    }
    if (nestedActiveElements.length) {
      angular.forEach(nestedActiveElements, function(el) {
        var parentId = el.parentNode.id;
        if (options.exclude !== parentId) {
          self.publish(parentId, 'close');
        }
      })
    }
  }

  animate(element, futureState, animationIn, animationOut) {
    FoundationAnimation.animate(element, futureState, animationIn, animationOut);
  }
}