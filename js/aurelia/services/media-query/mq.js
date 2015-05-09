import Api from 'api'

@inject Api;
class MQ {
  constructor(Api: api) {
    var service = [];

    service.getMediaQueries = getMediaQueries;
    service.match = match;
    service.collectScenariosFromElement = collectScenariosFromElement;

    return service;
  }

  getMediaQueries() {
    return foundationApi.getSettings().mediaQueries;
  }

  match(scenarios) {
    var count   = scenarios.length;
    var queries = service.getMediaQueries();
    var matches = [];

    if (count > 0) {
      while (count--) {
        var mq;
        var rule = scenarios[count].media;

        if (queries[rule]) {
          mq = matchMedia(queries[rule]);
        } else {
          mq = matchMedia(rule);
        }

        if (mq.matches) {
          matches.push({ ind: count});
        }
      }
    }

    return matches;
  }

  // Collects a scenario object and templates from element
  collectScenariosFromElement(parentElement) {
    var scenarios = [];
    var templates = [];

    var elements = parentElement.children();
    var i        = 0;

    for(el of elements) {
      var elem = element(el);


      //if no source or no html, capture element itself
      if (!elem.attr('src') || !elem.attr('src').match(/.html$/)) {
        templates[i] = elem;
        scenarios[i] = { media: elem.attr('media'), templ: i };
      } else {
        scenarios[i] = { media: elem.attr('media'), src: elem.attr('src') };
      }

      i++;
    }

    return {
      scenarios: scenarios,
      templates: templates
    };
  }
}
