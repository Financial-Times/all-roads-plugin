'use strict';

import $ from 'jquery';

const PartialSchemaDotOrgScraper = {
   test: () => {
      return $('[itemprop="articleBody"]').length > 0;
   },
   scrape: () => {
      var bodyContent = $('[itemprop="articleBody"]').text();
      console.log(bodyContent);
      return bodyContent;
   }
};

export default PartialSchemaDotOrgScraper;
