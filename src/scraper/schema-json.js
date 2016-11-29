'use strict';

import $ from 'jquery';

const inflate = (text) => {
   if (text.length < 150) {
      return text + ' ' + text + ' ' + text + ' ' + text + ' ' + text + ' ' + text + ' ' + text + ' ' + text + ' ' + text + ' ' + text + ' ' + text + ' ' + text;
   }
   return text;
}

const SchemaDotOrgJsonScraper = {
   test: () => {
      var valid = false;
      $('[type="application/ld+json"]').each((i, elem) => {
         var schemaText = $(elem).text();
         if (schemaText.trim() === ''){
            return true;
         }

         var schema = JSON.parse($(elem).text());
         valid = (schema['@context'] === 'http://schema.org' && (schema['@type'] === 'Article' || schema['@type'] === 'NewsArticle'));
      });

      return valid;
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

      console.log(bodyContent);
      return bodyContent;
   }
};

export default SchemaDotOrgJsonScraper;
