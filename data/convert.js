/*globals CoffeeScript */

function cmConvertClick (node, data) {
    'use strict';
    var i, rct, js,
        coffee = '',
        ws = window.getSelection(),
        fn, fnParent,
        jsAsNode = document.createElement('pre'),
        opts = JSON.parse(data);
    
    if (!ws.toString().trim()) {
        ws.selectAllChildren(document.body);
    }
    fn = ws.focusNode;
    fnParent = fn.parentNode;
    
    // var coffee = ws.toString(), // The problem with this is that this toString() won't preserve newlines if as raw text in <pre> elements (as used on the CoffeeScript main page)
    for (i = 0, rct = ws.rangeCount; i < rct; i++) {
        coffee += '\n\n' + ws.getRangeAt(i).toString(); // This doesn't work with line breaks in <pre> elements
    }

    if (rct === 1 && // Needed this condition for doing multiple ctrl-clicked ranges in likes of CoffeeScript main page (Github non-raw didn't allow)
        coffee.match(/\n/g).length <= (2 * rct )) { // No other line breaks found in code
        coffee = ws.toString();
    }

    js = CoffeeScript.compile(coffee);
    
    if (opts.remove_IIFEs) {
        js = js.replace(/^\(function\(\) \{\n/, '').replace(/\}\)\.call\(this\);\n*$/, '').replace(/^ {2}/gm, '');
    }

    jsAsNode.appendChild(document.createTextNode(js));
    
    ws.deleteFromDocument();
    fn.parentNode.insertBefore(jsAsNode, fn);
    ws.removeAllRanges();

}
