/*globals self*/

(function () {

'use strict';


self.on('context', function () {
    var ws = window.getSelection();
    // We use the second condition to avoid showing the context menu on pages like Github's non-raw (text/html) view of a coffee file
    return !!(window.location.href.match(/\.coffee$/) && ['text/plain', 'text/coffeescript'].indexOf(document.contentType) > -1);
});



}());