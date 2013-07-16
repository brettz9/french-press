/*globals exports */


// This is an active module of the brettz9 Add-on
exports.main = function() {

var MatchPattern = require('sdk/page-mod/match-pattern').MatchPattern,
    coffeePattern = new MatchPattern(/.*\.coffee$/),
    data = require('sdk/self').data,
    cm = require('sdk/context-menu');

cm.Item({
  label: "CoffeeScript to JavaScript",
  contentScriptFile: [data.url('coffee-script.js'), data.url('convert.js'), data.url('convert-by-url.js')],
  context: cm.PageContext()
});
cm.Item({
  label: "CoffeeScript to JavaScript",
  contentScriptFile: [data.url('coffee-script.js'), data.url('convert.js')],
  context: cm.SelectionContext()
});


};