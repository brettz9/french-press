/*globals exports, require */
/*eslint new-cap: 0*/
/* jscs:disable requireCamelCaseOrUpperCaseIdentifiers */
var _ = require('sdk/l10n').get,
    simplePrefs = require('sdk/simple-prefs'),
    data = require('sdk/self').data,
    pageMod = require('sdk/page-mod'),
    cm = require('sdk/context-menu');

// This is an active module of the french-press Add-on
exports.main = function () {
    'use strict';

    var c2jItem, c2jURLItem,
        prefs = simplePrefs.prefs,
        // MatchPattern = require('sdk/page-mod/match-pattern').MatchPattern,
        // coffeePattern = new MatchPattern(/.*\.coffee$/),
        coffeePattern = /.*\.coffee$/;

    function buildURLCMItem () {
        c2jURLItem = cm.Item({
            label: "CoffeeScript to JavaScript",
            contentScriptFile: [
                data.url('coffeescript/extras/coffee-script.js'),
                data.url('convert.js'),
                data.url('convert-click.js'),
                data.url('convert-by-url.js')
            ],
            context: cm.PageContext()
        });
    }

    function setProperty (contextMenu, prop, value) {
        var obj = JSON.parse(contextMenu.data || '{}');
        obj[prop] = value;
        contextMenu.data = JSON.stringify(obj);
    }
    function setByPref (pref) {
        switch (pref) {
        case 'remove_IIFEs':
            setProperty(c2jItem, pref, prefs[pref]);
            setProperty(c2jURLItem, pref, prefs[pref]);
            break;
        case 'auto_convert_coffee_files':
            if (c2jURLItem) {
                c2jURLItem.destroy();
            }
            if (prefs[pref]) {
                c2jURLItem = pageMod.PageMod({
                    include: coffeePattern,
                    contentScriptWhen: 'ready',
                    contentScriptFile: [
                        data.url('coffeescript/extras/coffee-script.js'),
                        data.url('convert.js'),
                        data.url('convert-by-pagemod.js')
                    ],
                    onAttach: function (worker) {
                        worker.port.emit('passOptions', c2jItem.data);
                    }
                });
            }
            else {
                buildURLCMItem();
                setProperty(c2jURLItem, pref, prefs[pref]);
                setProperty(c2jURLItem, 'remove_IIFEs', prefs.remove_IIFEs);
            }
            break;
        default:
            throw 'Unknown pref supplied to setByPref ' + pref;
        }
    }

    c2jItem = cm.Item({
        label: _("CoffeeScript_to_JavaScript"),
        contentScriptFile: [
            data.url('coffeescript/extras/coffee-script.js'),
            data.url('convert.js'),
            data.url('convert-click.js')
        ],
        context: cm.SelectionContext()
    });

    simplePrefs.on('', setByPref);
    setByPref('auto_convert_coffee_files');
    setByPref('remove_IIFEs');
};
