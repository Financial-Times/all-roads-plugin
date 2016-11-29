'use strict';

import $ from 'jquery';

const SchemaDotOrgScraper = {
   test: () => {
      if ($('[itemtype="http://schema.org/Article"]').length > 0 || $('[itemtype="http://schema.org/NewsArticle"]').length > 0){
         return true;
      }
   },
   scrape: () => {
      var bodyContent = $('[itemprop="articleBody"]').text();
      console.log(bodyContent);
      return bodyContent;
   }
};

export default SchemaDotOrgScraper;
