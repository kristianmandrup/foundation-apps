export default function(routes, complexViews) {
  var dynamicRoutes = routes || foundationRoutes;

  for(page of dynamicRoutes) {
    if (page.hasComposed) {
      if (!isDefined(complexViews[page.parent])) {
        complexViews[page.parent] = { children: {} };
      }

      if (page.controller) {
        page.controller = getController(page);
      }

      complexViews[page.parent].children[page.name] = page;

    } else if (page.composed) {
      if(!isDefined(complexViews[page.name])) {
        complexViews[page.name] = { children: {} };
      }

      if (page.controller) {
        page.controller = getController(page);
      }

      extend(complexViews[page.name], page);
    } else {
      var state = {
        url: page.url,
        templateUrl: page.path,
        abstract: page.abstract || false,
        parent: page.parent || '',
        controller: getController(page),
        data: getData(page),
        animation: buildAnimations(page),
      };
      
      stateProvider.state(page.name, state);
    }
  });

  for(page of complexViews) {
      var state = {
        url: page.url,
        parent: page.parent || '',
        abstract: page.abstract || false,
        data: getData(page),
        animation: buildAnimations(page),
        views: {
          '': buildState(page.path, page)
        }
      };
      
      for(sub of page.children) {
        state.views[sub.name + '@' + page.name] = buildState(sub.path, page);
      });

      stateProvider.state(page.name, state);
  }
}


  getData(page) {
    var data = { vars: {} };
    if (page.data) {
      if (typeof page.data.vars === "object") {
        data.vars = page.data.vars;
      }
      delete page.data.vars;
      angular.extend(data, page.data);
    }
    delete page.data;
    angular.extend(data.vars, page);
    return data;
  }
  
function buildState(path, state) {
  return {
    templateUrl: path,
    controller: getController(state),
  };
}


function buildAnimations(state) {
  var animations = {};

  if (state.animationIn) {
    animations.enter = state.animationIn;
  }

  if (state.animationOut) {
    animations.leave = state.animationOut;
  }

  return animations;
}