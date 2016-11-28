'use strict';

import $ from 'jquery';

const NoOpScraper = {
   scrape: () => {
      var bodyContent = $('body').html();
      return bodyContent;
   }
};

export default NoOpScraper;
