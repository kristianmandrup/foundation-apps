export class MqHelpers {
  constructor() {
    this.headerHelper = headerHelper;
    this.getStyle = getStyle;
    this.parseStyleToObject = parseStyleToObject;
  }

  headerHelper(classArray) {
    var i = classArray.length;
    var head = angular.element(document.querySelectorAll('head'));

    while(i--) {
      head.append('<meta class="' + classArray[i] + '" />');
    }

    return;
  }

  getStyle(selector, styleName) {
    var elem  = document.querySelectorAll(selector)[0];
    var style = window.getComputedStyle(elem, null);

    return style.getPropertyValue('font-family');
  }

    // https://github.com/sindresorhus/query-string
  parseStyleToObject(str) {
    var styleObject = {};

    if (typeof str !== 'string') {
      return styleObject;
    }

    str = str.trim().slice(1, -1); // browsers re-quote string style values

    if (!str) {
      return styleObject;
    }

    styleObject = str.split('&').reduce(function(ret, param) {
      var parts = param.replace(/\+/g, ' ').split('=');
      var key = parts[0];
      var val = parts[1];
      key = decodeURIComponent(key);

      // missing `=` should be `null`:
      // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
      val = val === undefined ? null : decodeURIComponent(val);

      if (!ret.hasOwnProperty(key)) {
        ret[key] = val;
      } else if (Array.isArray(ret[key])) {
        ret[key].push(val);
      } else {
        ret[key] = [ret[key], val];
      }
      return ret;
    }, {});

    return styleObject;
  }
}