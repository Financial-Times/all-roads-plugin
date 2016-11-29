'use strict';

import $ from 'jquery';

const BBCScraper = {
   test: () => {
      return window.location.href.indexOf('http://www.bbc.co.uk') !== -1;
   },

   scrape: () => {
      var bodyContent = undefined;
      $('[type="application/ld+json"]').each((i, elem) => {
         var schemaText = $(elem).text();
         if (schemaText.trim() === ''){
            return true;
         }

         var schema = JSON.parse($(elem).text());
         if (schema['@context'] === 'http://schema.org' && (schema['@type'] === 'Article' || schema['@type'] === 'NewsArticle')){
            bodyContent = schema.headline + '. ' + schema.articleBody;
         }
      });

      bodyContent = bodyContent + '. ' + $('[property="articleBody"]').text();
      console.log(bodyContent);
      return bodyContent;
   }
};

export default BBCScraper;
