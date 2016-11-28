'use strict';

import $ from 'jquery';

import Sender from './send/simple';

import NoOpScraper from './scraper/no-scrapes';
import SchemaDotOrgScraper from './scraper/schema-dot-org';

import template from './ui.handlebars';

console.log('All Roads Lead to the FT.')

var url = window.location.href;
var scraped;

if (SchemaDotOrgScraper.test()) {
   scraped = SchemaDotOrgScraper.scrape();
}

if (!scraped){
   scraped = NoOpScraper.scrape();
}

Sender.send(url, scraped, (suggestions) => {
   console.log(suggestions);
   if (!suggestions || suggestions.length === 0) {
      console.log('No Roads Lead to the FT :(');
      return;
   }

   var suggestion = suggestions[0];
   if (suggestion.live){
      suggestion.inprogress = 'o-teaser__timestamp--inprogress';
   }

   var ft = chrome.extension.getURL("ft.png");

   $('body').append('<div id="ft-all-roads"></div>');
   $('#ft-all-roads').append(template(suggestion));

   window.setTimeout(() => {
      $('.ft-all-roads-container').addClass('open');
   }, 2000);
});
