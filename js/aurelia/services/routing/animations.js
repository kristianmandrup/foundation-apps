import {autoinject} from 'aurelia-framework';

@autoinject()
export class RoutingAnimations {
  constructor(state: State) {
    var animation = {};
    var animationEnded = false;
    var presetHeight;

    var cleanup = [
      on('stateChangeStart', onStateChangeStart),
      on('stateChangeError', onStateChangeError),
      on('stateChangeSuccess', onStateChangeSuccess),
      on('viewContentAnimationEnded', onViewContentAnimationEnded)
    ];

    var destroyed = on('destroy', function onDestroy() {
      angular.forEach(cleanup, function (cb) {
        if (angular.isFunction(cb)) {
          cb();
        }
      });

      destroyed();
    });

    function onStateChangeStart(event, toState, toParams, fromState, fromParams) {

      if (fromState.animation) {
        if (!fromState.animation.leave && !toState.animation.leave) {
          return;
        }
        else {
           animationRouter(event, toState, fromState);
        }
      }
    }

    function animationRouter(event, toState, fromState) {
      if (!animationEnded) {
        resetParent();
        prepareParent();

        element.removeClass(fromState.animation.leave);
      }
      else {
        prepareParent();

        element.addClass(fromState.animation.leave);
      }

    }

    function onStateChangeError() {
      if(animation.leave) {
        element.removeClass(animation.leave);
      }

      resetParent(); //reset parent if state change fails
    }

    function onStateChangeSuccess() {
      resetParent();
      if ($state.includes(getState()) && animation.enter) {
        element.addClass(animation.enter);
      }
    }

    function onViewContentAnimationEnded(event) {
      if (event.targetScope === scope && animation.enter) {
        element.removeClass(animation.enter);
      }
      
      animationEnded = true;

    }

    function getState() {
      var view  = element.data('$uiView');
      var state = view && view.state && view.state.self;

      if (state) {
        angular.extend(animation, state.animation);
      }

      return state;
    }

    function resetParent() {
      element.parent().removeClass('position-absolute');
      if(presetHeight !== true) {
        element.parent()[0].style.height = null;
      }
    }

    function prepareParent() {
      var parentHeight = parseInt(element.parent()[0].style.height);
      var elHeight = parseInt(window.getComputedStyle(element[0], null).getPropertyValue('height'));
      var tempHeight = parentHeight > 0 ? parentHeight : elHeight > 0 ? elHeight : '';

      if(parentHeight > 0) {
        presetHeight = true;
      }

      element.parent()[0].style.height = tempHeight + 'px';
      element.parent().addClass('position-absolute');
    }
  }
}
