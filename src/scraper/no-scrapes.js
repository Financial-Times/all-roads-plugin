'use strict';

import $ from 'jquery';

const NoOpScraper = {
   scrape: () => {
      var bodyContent = $('body').text();
      return bodyContent;
   }
};

export default NoOpScraper;
