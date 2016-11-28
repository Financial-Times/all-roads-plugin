'use strict';

import $ from 'jquery';

const allRoadsUrl = 'https://dynpub-uk-up.ft.com/__all-roads/__health';

const Sender = {
   send: (url, content, ok) => {
      $.post({
         url: allRoadsUrl,
         processData: false,
         data: JSON.stringify({
            url: url,
            content: content
         }),
         dataType: 'json',
         success: ok,
         contentType: 'application/json',
         error: (err) => {
            console.error(err);
         }
      });
   }
};

export default Sender;
