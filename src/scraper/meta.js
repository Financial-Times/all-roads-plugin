'use strict';

import $ from 'jquery';

const MetaScraper = {
   test: () => {
      return $('meta[name="description"]').length > 0;
   },
   scrape: () => {
      var bodyContent = $('meta[name="description"]').attr('content');
      console.log(bodyContent);
      return bodyContent;
   }
};

export default MetaScraper;
