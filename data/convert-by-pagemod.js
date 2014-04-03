/*globals self, cmConvertClick*/

(function () {
    'use strict';
    self.port.on('passOptions', function(opts) {
        // We use this condition to avoid showing this (whole-page) context menu on pages like Github's non-raw (text/html) view of a coffee file
        if (['text/plain', 'text/coffeescript'].indexOf(document.contentType) > -1) {
            cmConvertClick(null, opts);
        }
    });
}());
