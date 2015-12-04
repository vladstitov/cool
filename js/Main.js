/// <reference path="libs/typings/jquery.d.ts" />
var uplight;
(function (uplight) {
    var ca;
    (function (ca) {
        var Main = (function () {
            function Main() {
                $(window).on('hashchange', this.onHashChanged);
            }
            Main.prototype.onHashChanged = function () {
                var h = document.location.hash;
                var eq = h.indexOf('=');
                var q = h.indexOf('?');
                var topic = eq > -1 ? h.substr(0, eq) : h;
                var evt = 'Event';
                var params = null;
                if (eq > -1) {
                    if (q > -1) {
                        evt = h.substring(eq + 1, q);
                        params = h.substr(q + 1);
                    }
                    else
                        evt = h.substr(eq);
                }
                trace('topic ' + topic + ' evt: ' + evt + ' params: ' + params);
                switch (topic) {
                    case '#back':
                        window.history.go(-2);
                        break;
                    case '#topic':
                        $(evt).load(params);
                        break;
                    case '':
                        document.location.reload();
                        break;
                    default:
                        $(topic).triggerHandler(evt, [params]);
                        break;
                }
            };
            return Main;
        })();
        ca.Main = Main;
    })(ca = uplight.ca || (uplight.ca = {}));
})(uplight || (uplight = {}));
var trace = function (data) {
    console.log(data);
};
var main = new uplight.ca.Main();
//# sourceMappingURL=Main.js.map