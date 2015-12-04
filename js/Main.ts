/// <reference path="libs/typings/jquery.d.ts" />


module uplight.ca {
    export class Main {

        
        constructor() {
            $(window).on('hashchange', this.onHashChanged);
           
        }

        private onHashChanged(): void {
            var h: string = document.location.hash;
            var eq: number = h.indexOf('=');
            var q: number = h.indexOf('?');
            var topic: string = eq > -1 ? h.substr(0, eq) :h;
            var evt: string = 'Event';
            var params: string = null;
            if (eq > -1) {
                if (q > -1) {
                    evt = h.substring(eq + 1, q);
                    params = h.substr(q + 1);
                } else evt = h.substr(eq); 
            }                  
            trace('topic ' + topic + ' evt: '+evt+ ' params: ' + params);
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
        }
    }

}
var trace = function (data) {
    console.log(data);
}
var main: uplight.ca.Main = new uplight.ca.Main();
