'use strict';

import $ from 'jquery';

const SchemaDotOrgScraper = {
   test: () => {
      return $('[itemtype="http://schema.org/Article"]').length > 0 || $('[itemtype="http://schema.org/NewsArticle"]').length > 0;
   },
   scrape: () => {
      var bodyContent = $('[itemprop="articleBody"]').text();
      console.log(bodyContent);
      return bodyContent;
   }
};

export default SchemaDotOrgScraper;
