/// <reference path="../libs/typings/tweenjs.d.ts" />
/// <reference path="../libs/typings/easeljs.d.ts" />
var canv;
(function (canv) {
    ///images/website-images.jpg
    var c = createjs;
    var stage;
    var Gallery = (function () {
        // private stage: createjs.Stage;
        function Gallery(id) {
            this.id = id;
            this.view = document.getElementById(id);
            if (this.view)
                this.init();
        }
        Gallery.prototype.catImage = function () {
            // this.ctx.drawImage(this.canvas, 0, 0, 300, 300);
        };
        Gallery.prototype.init = function () {
            this.canvas = document.createElement('canvas');
            this.ctx = this.canvas.getContext('2d');
            trace(this.view.getAttribute('data-width'));
            this.canvas.width = Number(this.view.getAttribute('data-width')) || 800;
            this.canvas.height = Number(this.view.getAttribute('data-height')) || 350;
            this.view.appendChild(this.canvas);
            stage = new createjs.Stage(this.canvas);
            var img = new Image();
            img.src = 'images/website-images.jpg';
            var _this = this;
            img.onload = function () {
                var holder = new ImageHolder(new createjs.Bitmap(img));
                stage.enableMouseOver(100);
                stage.addEventListener("mouseover", function (evt) {
                    if (!holder.isChaos)
                        holder.chaosImage();
                    trace("mouseover");
                });
                stage.addEventListener("mouseout", function (evt) {
                    trace("mouseout");
                    clearTimeout(_this._timeout);
                    _this._timeout = setTimeout(function () { return holder.backImage(); }, 5000);
                    //holder.chaosImage();
                });
                // stage.addChild(holder.bmp);
                // stage.update();
            };
        };
        return Gallery;
    })();
    canv.Gallery = Gallery;
    var ImageHolder = (function () {
        function ImageHolder(bmp) {
            this.bmp = bmp;
            this.rows = 3;
            this.cols = 4;
            this.rects = [];
            this.bmps = [];
            this.init();
        }
        ImageHolder.prototype.chaosImage = function (sh) {
            if (sh === void 0) { sh = null; }
            if (sh)
                stage.removeChild(sh);
            var newAr = this.rects.slice(0);
            newAr = this.shuffle(newAr);
            this.isChaos = true;
            for (var i = 0, n = this.bmps.length; i < n; i++) {
                // c.Tween.get(this.bmps[i]).to({ x: this.rects[n - i - 1].x, y: this.rects[n - i - 1].y }, 1500).call(function () { createjs.Ticker.removeEventListener("tick", stage); });
                c.Tween.get(this.bmps[i]).to({ x: newAr[i].x, y: newAr[i].y }, 1000, c.Ease.circOut).call(function () { createjs.Ticker.removeEventListener("tick", stage.update); });
            }
            createjs.Ticker.addEventListener("tick", stage);
        };
        ImageHolder.prototype.backImage = function () {
            this.isChaos = false;
            for (var i = 0, n = this.bmps.length; i < n; i++) {
                c.Tween.get(this.bmps[i]).to({ x: this.rects[i].x, y: this.rects[i].y }, 1000, c.Ease.circOut).call(function () { createjs.Ticker.removeEventListener("tick", stage.update); });
            }
            createjs.Ticker.addEventListener("tick", stage);
        };
        ImageHolder.prototype.shuffle = function (o) {
            for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x)
                ;
            return o;
        };
        ImageHolder.prototype.drawRectangles = function () {
            var b = this.bmp;
            var cont = b.parent;
            var dx = b.getBounds().width / this.cols;
            var dy = b.getBounds().height / this.rows;
            for (var i = 0, n = this.cols; i < n; i++) {
                for (var j = 0; j < this.rows; j++) {
                    var r = new c.Rectangle(i * dx, j * dy, dx, dy);
                    this.rects.push(r);
                    var b2 = b.clone();
                    b2.sourceRect = r;
                    this.bmps.push(b2);
                    b2.x = i * dx;
                    b2.y = j * dy;
                    stage.addChild(b2);
                }
            }
            var sh = new c.Shape;
            var g = sh.graphics;
            g.setStrokeStyle(2);
            g.beginStroke('#FFFFFF');
            for (i = 0, n = this.rects.length; i < n; i++) {
                g.drawRect(this.rects[i].x, this.rects[i].y, this.rects[i].width, this.rects[i].height);
            }
            g.setStrokeStyle(4);
            sh.scaleX = 0.1;
            stage.addChild(sh);
            sh.shadow = new createjs.Shadow("#FFFFFF", 5, 5, 15);
            var _this = this;
            c.Tween.get(sh).to({ scaleX: 1.0 }, 1000, c.Ease.cubicInOut).call(function () {
                c.Tween.get(sh.shadow).to({ offsetX: 0, offsetY: 0, blur: 0 }, 1000).call(function () {
                    sh.shadow = null;
                    g.clear();
                    g.setStrokeStyle(1);
                    g.beginStroke('#FFFFFF');
                    for (i = 0, n = _this.rects.length; i < n; i++) {
                        g.drawRect(_this.rects[i].x, _this.rects[i].y, _this.rects[i].width, _this.rects[i].height);
                    }
                    stage.update();
                    setTimeout(function (sh) { return _this.chaosImage(sh); }, 1000, sh);
                    createjs.Ticker.removeEventListener("tick", stage.update);
                });
            });
            createjs.Ticker.addEventListener("tick", stage);
        };
        ImageHolder.prototype.init = function () {
            var _this = this;
            setTimeout(function () { return _this.drawRectangles(); }, 1000);
        };
        return ImageHolder;
    })();
})(canv || (canv = {}));
var trace = trace || function (v) { console.log(v); };
var c = new canv.Gallery('myCanvas');
//# sourceMappingURL=myCanvas.js.map