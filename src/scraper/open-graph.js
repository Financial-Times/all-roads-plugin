'use strict';

import $ from 'jquery';

const OpenGraphScraper = {
   test: () => {
      return $('[property="og:type"]').length > 0 && $('[property="og:type"]').attr('content').toLowerCase() === 'article';
   },
   scrape: () => {
      var bodyContent = $('[property="og:title"]').attr('content');
      bodyContent = bodyContent + '. ' + $('[property="og:description"]').attr('content')
      console.log(bodyContent);
      return bodyContent;
   }
};

export default OpenGraphScraper;
