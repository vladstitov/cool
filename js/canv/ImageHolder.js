/**
 * Created by VladHome on 12/3/2015.
 */
/// <reference path="../libs/typings/jquery.d.ts" />
/// <reference path="../libs/typings/tweenjs.d.ts" />
/// <reference path="../libs/typings/easeljs.d.ts" />
var uplight;
(function (uplight) {
    var c = createjs;
    var ImageHolder = (function () {
        /* private centerImage(w: number, h: number): void {
             this.recSource = new c.Rectangle(0, 0, w, h);
 
             var r: c.Rectangle = this.container.getBounds();
             var sc: number = r.width /w ;
             var sc2: number = r.height / h;
             var sc: number = sc > sc2 ? sc2 : sc;
             this.bmp.scaleX = sc;
             this.bmp.scaleY = sc;
         }*/
        function ImageHolder(stage) {
            this.stage = stage;
            this.container = new c.Container();
            this.stage.addChild(this.container);
            this.container.setBounds(0, 0, this.stage.getBounds().width, this.stage.getBounds().height);
        }
        ImageHolder.prototype.removeImage = function () {
            this.container.removeAllChildren();
            c.Ticker.removeEventListener('tick', this.stage.update);
        };
        ImageHolder.prototype.createVideo = function (video) {
            this.isVideo = true;
            this.bmp = new c.Bitmap(video);
            this.container.removeAllChildren();
            this.container.addChild(this.bmp);
            var recSt = this.stage.getBounds();
            var rec = this.bmp.getBounds();
            if (recSt.width < rec.width) {
                this.bmp.x = (recSt.width - rec.width) / 2;
            }
            if (recSt.height < rec.height) {
                this.bmp.y = (recSt.height - rec.height) / 2;
            }
        };
        ImageHolder.prototype.createImage = function (url) {
            this.container.removeAllChildren();
            this.bmp = new c.Bitmap(url);
            this.bmp.setBounds(0, 0, this.stage.getBounds().width, this.stage.getBounds().height);
            this.container.addChild(this.bmp);
            //this.bmp.image = img;
            //this.centerImage(img.naturalWidth, img.naturalHeight);
            //var r: c.Rectangle = this.container.getBounds();
            this.stage.update();
        };
        return ImageHolder;
    })();
    uplight.ImageHolder = ImageHolder;
})(uplight || (uplight = {}));
//# sourceMappingURL=ImageHolder.js.map