/// <reference path="../libs/typings/easeljs.d.ts" />
var canv;
(function (canv) {
    var c = createjs;
    var VideoSnap = (function () {
        // private filter:c.Shadow;
        function VideoSnap(id) {
            this.id = id;
            this.H = 75;
            this.bmps = [];
            this.ROWS = 3;
            this.COLS = 4;
            this.i = -1;
            this.view = document.getElementById(id);
            if (this.view)
                this.init();
        }
        VideoSnap.prototype.onImageClick = function (evt) {
            var img = evt.currentTarget;
            ///trace(img);
            if (!img)
                return;
            var same = this.currentImage == img;
            this.minifyImage();
            if (!same) {
                this.container2.addChild(img);
                this.currentImage = img;
                this.wasX = img.x;
                this.wasY = img.y;
                img.scaleX = 1.0;
                img.scaleY = 1.0;
                img.x = 0;
                img.y = 0;
            }
            this.stage.update();
        };
        VideoSnap.prototype.tick = function () {
        };
        VideoSnap.prototype.stopMotion = function (vr) {
        };
        VideoSnap.prototype.minifyImage = function () {
            if (!this.currentImage)
                return;
            c.Tween.get(this.currentImage).to({ x: this.wasX, y: this.wasY, scaleX: this.scale, scaleY: this.scale }, 500).call(function () { c.Ticker.removeEventListener("tick", this.tick); });
            c.Ticker.addEventListener("tick", this.stage);
            //this.currentImage.x = this.wasX;
            //this.currentImage.y = this.wasY;
            // this.currentImage.scaleX = this.scale;
            // this.currentImage.scaleY = this.scale;
            this.container1.addChild(this.currentImage);
            this.currentImage = null;
        };
        VideoSnap.prototype.craeteImage = function (n) {
            var _this = this;
            var bmp = new c.Bitmap(this.video);
            var scale = (this.W / this.video.videoWidth) * 0.95;
            bmp.scaleX = scale;
            bmp.scaleY = scale;
            this.scale = scale;
            bmp.cache(0, 0, this.video.videoWidth, this.video.videoHeight);
            bmp.x = (n % this.COLS) * this.W;
            if (this.i > 3)
                bmp.y = this.H;
            if (this.i > 7)
                bmp.y = 2 * this.H;
            if (this.i > 11)
                bmp.y = 3 * this.H;
            bmp.addEventListener('click', function (evt) { return _this.onImageClick(evt); });
            this.container1.addChild(bmp);
            this.bmps.push(bmp);
            //bmp.shadow = this.filter;
            return bmp;
        };
        VideoSnap.prototype.btnClick = function (evt) {
            this.minifyImage();
            this.i++;
            if (this.i > 15)
                this.i = 0;
            var n = this.bmps.length;
            if (n < 16) {
                var bmp = this.craeteImage(n);
            }
            else {
                var bmp = this.bmps[this.i];
                bmp.updateCache();
            }
            //trace(bmp);
            this.stage.update();
            //this.ctx.drawImage(this.video, 0, 0, 400, 300);
        };
        VideoSnap.prototype.init = function () {
            var _this = this;
            trace(this.id + ' init ');
            this.canvas = this.view.getElementsByTagName('canvas')[0];
            this.stage = new c.Stage(this.canvas);
            this.ctx = this.canvas.getContext("2d");
            this.video = this.view.getElementsByTagName('video')[0];
            this.btn = this.view.getElementsByTagName('button')[0];
            this.btn.addEventListener('click', function (evt) { return _this.btnClick(evt); });
            this.W = this.canvas.width / this.COLS;
            this.container1 = new c.Container();
            this.container2 = new c.Container();
            this.stage.addChild(this.container1);
            this.stage.addChild(this.container2);
            //this.filter = new c.Shadow('#000055', 3, 3, 10);
        };
        return VideoSnap;
    })();
    canv.VideoSnap = VideoSnap;
})(canv || (canv = {}));
var snap = new canv.VideoSnap('VideoSnap');
//# sourceMappingURL=VideoSnap.js.map