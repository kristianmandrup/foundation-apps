import MqHelpers from './mq-helpers';
import Api from './api';
import Utils from './utils';

@autoinject()
export class MqInit {
  constructor(helpers: MQHelpers, api: Api, utils: Utils){
    this.namedQueries = {
      'default' : 'only screen',
      landscape : 'only screen and (orientation: landscape)',
      portrait : 'only screen and (orientation: portrait)',
      retina : 'only screen and (-webkit-min-device-pixel-ratio: 2),' +
        'only screen and (min--moz-device-pixel-ratio: 2),' +
        'only screen and (-o-min-device-pixel-ratio: 2/1),' +
        'only screen and (min-device-pixel-ratio: 2),' +
        'only screen and (min-resolution: 192dpi),' +
        'only screen and (min-resolution: 2dppx)'
    };
  }

  init() {
    var mediaQueries;
    var extractedMedia;
    var mediaObject;

    helpers.headerHelper(['foundation-mq']);
    extractedMedia = helpers.getStyle('.foundation-mq', 'font-family');

    if (!extractedMedia.match(/([\w]+=[\d]+[a-z]*&?)+/)) {
      extractedMedia = 'small=0&medium=40rem&large=75rem&xlarge=90rem&xxlarge=120rem';
    }

    mediaQueries = helpers.parseStyleToObject((extractedMedia));

    for(var key in mediaQueries) {
      mediaQueries[key] = 'only screen and (min-width: ' + mediaQueries[key].replace('rem', 'em') + ')';
    }


    api.modifySettings({
      mediaQueries: extend(mediaQueries, namedQueries)
    });

    window.addEventListener('resize', u.throttle(function() {
      api.publish('resize', 'window resized');
    }, 50));

  }
}