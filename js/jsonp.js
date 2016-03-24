/**
 * Simple jsonp
 * @param {String} url The url of resource.
 * @param {Function} cb Callback function.
 */
function jsonp(url, cb) {
    var head = document.getElementsByTagName('head')[0];

    var fnName = 'fn' + (+new Date);
    url = url + '&jsoncallback=jsonp.' + fnName;
    jsonp[fnName] = cb;

    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = url;

    script.onload = function onload() {
        jsonp[fnName] = undefined;
        head.removeChild(this);
    }

    head.appendChild(script);
}
