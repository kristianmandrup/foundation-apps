import {autoinject} from 'aurelia-framework';
import {Api} from '../../foundation';

@autoinject()

export class ZfPanel {
  constructor(api: Api, window) {
    var type = 'panel';

    this.zfClosable = type;
    this.position = this.position || 'left';
    this.positionClass = 'panel-' + this.position;

    this.active = false;
    var animationIn, animationOut;
    var globalQueries = api.getSettings().mediaQueries;

    //urgh, there must be a better way
    if(scope.position === 'left') {
      animationIn  = attrs.animationIn || 'slideInRight';
      animationOut = attrs.animationOut || 'slideOutLeft';
    } else if (scope.position === 'right') {
      animationIn  = attrs.animationIn || 'slideInLeft';
      animationOut = attrs.animationOut || 'slideOutRight';
    } else if (scope.position === 'top') {
      animationIn  = attrs.animationIn || 'slideInDown';
      animationOut = attrs.animationOut || 'slideOutUp';
    } else if (scope.position === 'bottom') {
      animationIn  = attrs.animationIn || 'slideInUp';
      animationOut = attrs.animationOut || 'slideOutDown';
    }


    //setup
    api.subscribe(attrs.id, function(msg) {
      var panelPosition = $window.getComputedStyle(element[0]).getPropertyValue("position");

      // patch to prevent panel animation on larger screen devices
      // don't run animation on grid elements, only panel
      if (panelPosition == 'static' || panelPosition == 'relative') {
        return;
      }

      if(msg == 'show' || msg == 'open') {
        scope.show();
      } else if (msg == 'close' || msg == 'hide') {
        scope.hide();
      } else if (msg == 'toggle') {
        scope.toggle();
      }
      
      if (!scope.$root.$$phase) {
        scope.$apply();
      }

      return;
    });

    element.on('click', function(e) {
      // Check sizing
      var srcEl = e.target;

      if (!matchMedia(globalQueries.medium).matches && srcEl.href && srcEl.href.length > 0) {
        // Hide element if it can't match at least medium
        scope.hide();
        foundationApi.animate(element, scope.active, animationIn, animationOut);
      }
    });      
  }
    
  hide() {
    if(scope.active){
      scope.active = false;
      foundationApi.animate(element, scope.active, animationIn, animationOut);
    }
  }

  show() {
    if(!scope.active){
      scope.active = true;
      foundationApi.animate(element, scope.active, animationIn, animationOut);
    }
  }

  toggle() {
    scope.active = !scope.active;
    foundationApi.animate(element, scope.active, animationIn, animationOut);
  }
}