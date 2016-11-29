'use strict';

import $ from 'jquery';

const TwitterScraper = {
   test: () => {
      return $('[name="twitter:title"]').length > 0 && $('[name="twitter:description"]').length > 0;
   },
   scrape: () => {
      var bodyContent = $('[name="twitter:title"]').attr('content');
      bodyContent = bodyContent + '. ' + $('[name="twitter:description"]').attr('content')
      console.log(bodyContent);
      return bodyContent;
   }
};

export default TwitterScraper;
