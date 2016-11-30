'use strict';

import $ from 'jquery';
import _ from 'lodash';

import Sender from './send/simple';
import SchemaDotOrgScraper from './scraper/schema-dom';
import SchemaDotOrgJsonScraper from './scraper/schema-json';
import PartialSchemaDotOrgScraper from './scraper/partial-schema';
import OpenGraphScraper from './scraper/open-graph';
import TwitterScraper from './scraper/twitter-graph';
import BBCScraper from './scraper/bbc';
import MetaScraper from './scraper/meta';

import template from './ui.handlebars';

import md5 from './md5';

console.log('All Roads Lead to the FT.')

const convertToId = (title) => {
   return md5(title);
};

const animate = (suggestions) => {
   var count = 0;
   window.setInterval(() => {
      $('#' + suggestions[count % suggestions.length].id).toggleClass('ft-all-roads-open')
      count++;

      window.setTimeout(() => {
         $('#' + suggestions[count % suggestions.length].id).toggleClass('ft-all-roads-open')
      }, 1000);
   }, 8000);
}

const doSend = (scraped) => {
   if (!scraped){
      console.log('No Roads Lead to the FT :(');
      return;
   }

   var url = window.location.href;
   if (url === 'http://www.forbes.com/'){
      console.log('Skipping forbes homepage :/');
      return;
   }

   console.log(url);

   Sender.send(url, scraped, (suggestions) => {
      suggestions = _.uniqBy(suggestions, (i) => {
         return i.title;
      });
      console.log(suggestions);

      if (!suggestions || suggestions.length === 0) {
         console.log('No Roads Lead to the FT :(');
         return;
      }

      suggestions.map((s) => {
         s.id = convertToId(s.title);
      });

      $('body').append('<div id="ft-all-roads"></div>');
      $('#ft-all-roads').append(template({items: suggestions}));

      window.setTimeout(() => {
         $('#' + suggestions[0].id).addClass('ft-all-roads-open');
      }, 600);

      if (suggestions.length > 0){
         animate(suggestions);
      }
   });
};

if (SchemaDotOrgScraper.test()) {
   console.log('Scraped via schema.org DOM');
   doSend(SchemaDotOrgScraper.scrape());

} else if (BBCScraper.test()) {
   console.log('Detected BBC - scraped non-standard BBC style.');
   doSend(BBCScraper.scrape());

} else if (SchemaDotOrgJsonScraper.test()){
   console.log('Scraped via schema.org json model');
   doSend(SchemaDotOrgJsonScraper.scrape());

} else if (PartialSchemaDotOrgScraper.test()){
   console.log('Scraped via partial schema.org model');
   doSend(PartialSchemaDotOrgScraper.scrape());

} else if (OpenGraphScraper.test()){
   console.log('Scraped via open graph');
   doSend(OpenGraphScraper.scrape());

} else if (TwitterScraper.test()){
   console.log('Scraped via twitter graph');
   doSend(TwitterScraper.scrape());

} else if (MetaScraper.test()){
   console.log('Scraped via meta tag');
   doSend(MetaScraper.scrape());
}
