'use strict';

import $ from 'jquery';

import Sender from './send/simple';
import SchemaDotOrgScraper from './scraper/schema-dot-org';
import template from './ui.handlebars';

console.log('All Roads Lead to the FT.')

const switchArticle = () => {
   $('.ft-all-roads-animate').toggleClass('ft-all-roads-hide');
};

const doSend = (scraped) => {
   var url = window.location.href;
   console.log(url);

   var iteration = 0;

   Sender.send(url, scraped, (suggestions) => {
      console.log(suggestions);
      if (!suggestions || suggestions.length === 0) {
         console.log('No Roads Lead to the FT :(');
         return;
      }

      $('body').append('<div id="ft-all-roads"></div>');
      $('#ft-all-roads').append(template({items: suggestions}));

      window.setTimeout(() => {
         $('.ft-all-roads-container').addClass('ft-all-roads-open');
      }, 2000);

      window.setTimeout(() => {
         switchArticle();
         iteration++;
         $('#ft-all-roads').replaceWith(template({items: suggestions}));
      }, 30000)
   });
};

if (SchemaDotOrgScraper.test()) {
   var scraped = SchemaDotOrgScraper.scrape();
   doSend(scraped);
}
