/// <reference path="../libs/typings/tweenjs.d.ts" />
/// <reference path="../libs/typings/easeljs.d.ts" />
var uplight;
(function (uplight) {
    var c = createjs;
    var Puzzles1 = (function () {
        function Puzzles1(stage, bmp, sourceRec, res) {
            var _this = this;
            this.stage = stage;
            this.rects = [];
            this.puzzles = [];
            var ar = res.split('x');
            var cols = Number(ar[0]);
            var rows = Number(ar[1]);
            if (isNaN(cols) || isNaN(rows)) {
                alert('value of columns is wrong');
                return;
            }
            //this.removePuzzles();
            var dx = sourceRec.width / cols;
            var dy = sourceRec.height / rows;
            //console.log(dx);
            // console.log(dy);
            var sc = bmp.scaleX;
            bmp.sourceRect = sourceRec;
            // console.log(bmp);
            // bmp.scaleX = 1.0;
            // bmp.scaleY = 1.0;
            // console.log(sc);
            var cont = new c.Container();
            this.stage.addChild(cont);
            cont.setBounds(0, 0, sourceRec.width, sourceRec.height);
            var bmps = [];
            var rects = [];
            for (var i = 0, n = cols; i < n; i++) {
                for (var j = 0; j < rows; j++) {
                    var r = new c.Rectangle(i * dx, j * dy, dx, dy);
                    rects.push(r);
                    var b2 = bmp.clone();
                    b2.name = 'b_' + i + '_' + j;
                    b2.sourceRect = r;
                    bmps.push(b2);
                    b2.addEventListener(CLICK, function (evt) { return _this.onImageClicked(evt); });
                    b2.x = r.x;
                    b2.y = r.y;
                    cont.addChild(b2);
                }
            }
            this.rects = rects;
            this.puzzles = bmps;
            // console.log( this.puzzles);
            // bmp.alpha = 0;
            //cont.scaleX = sc;
            // cont.scaleY = sc;
            // bmp.scaleX = sc;
            // bmp.scaleY = sc;
            this.hiliter = new c.Shape((new c.Graphics()).setStrokeStyle(3).beginStroke('#FFFFFF').drawRect(0, 0, r.width, r.height));
            this.contPuzzles = cont;
            // this.removePuzzles();
            this.chaosImage();
            //createjs.Ticker.addEventListener("tick", this.stage);
        }
        Puzzles1.prototype.onImageClicked = function (evt) {
            //   console.log(evt);
            var bmp = evt.currentTarget;
            console.log(bmp.name);
            if (this.contPuzzles.contains(this.hiliter)) {
                if (this.selectedImage != bmp) {
                    this.swapImages(this.selectedImage, bmp);
                }
                this.selectedImage = null;
                this.contPuzzles.removeChild(this.hiliter);
            }
            else {
                this.selectedImage = bmp;
                this.hiliter.x = bmp.x;
                this.hiliter.y = bmp.y;
                this.contPuzzles.addChild(this.hiliter);
            }
            //bmp.alpha = (bmp.alpha > 0.85) ? 0.8 : 1.0;
        };
        Puzzles1.prototype.removePuzzles = function () {
            if (this.contPuzzles) {
                this.stage.removeChild(this.contPuzzles);
                this.contPuzzles = null;
            }
        };
        Puzzles1.prototype.chaosImage = function () {
            var _this = this;
            if (this.inProgres)
                return;
            var newAr = this.rects.slice(0);
            newAr = this.shuffle(newAr);
            this.isChaos = true;
            this.inProgres = true;
            setTimeout(function () { _this.inProgres = false; }, 1100);
            var bmps = this.puzzles;
            for (var i = 0, n = this.puzzles.length; i < n; i++) {
                // trace(bmps[i]);
                // c.Tween.get(this.bmps[i]).to({ x: this.rects[n - i - 1].x, y: this.rects[n - i - 1].y }, 1500).call(function () { createjs.Ticker.removeEventListener("tick", this.stage); });
                c.Tween.get(bmps[i]).to({ x: newAr[i].x, y: newAr[i].y }, 1000, c.Ease.circOut); //.call(function () { createjs.Ticker.removeEventListener("tick", this.stage); });
            }
            //  createjs.Ticker.addEventListener("tick", this.stage);
        };
        Puzzles1.prototype.backImage = function () {
            var _this = this;
            if (this.inProgres)
                return;
            this.inProgres = true;
            setTimeout(function () { _this.inProgres = false; }, 1100);
            this.isChaos = false;
            var bmps = this.puzzles;
            for (var i = 0, n = bmps.length; i < n; i++) {
                c.Tween.get(bmps[i]).to({ x: this.rects[i].x, y: this.rects[i].y }, 1000, c.Ease.circOut); //.call(function () { createjs.Ticker.removeEventListener("tick", stage); });
            }
            // createjs.Ticker.addEventListener("tick", this.stage);
        };
        Puzzles1.prototype.stickImage = function (bmp, rec) {
            var _this = this;
            bmp.x = rec.x;
            bmp.y = rec.y;
            bmp.removeAllEventListeners(CLICK);
            //this.inProgres = true;
            var hl = new c.Shape((new c.Graphics()).setStrokeStyle(5).beginStroke('#FFFFFF').drawCircle(0, 0, 100));
            hl.x = bmp.x + rec.width / 2;
            hl.y = bmp.y + rec.height / 2;
            this.contPuzzles.addChild(hl);
            c.Tween.get(hl).to({ scaleX: 0.1, scaleY: 0.1 }, 500).call(function () {
                _this.contPuzzles.removeChild(hl);
                _this.stage.update();
                ///this.inProgres = false;
                if (_this.isAllinPlace() && !_this.isOver)
                    _this.onGameOver();
            });
        };
        Puzzles1.prototype.isAllinPlace = function () {
            var puz = this.puzzles;
            var recs = this.rects;
            var isall = true;
            for (var i = 0, n = puz.length; i < n; i++) {
                if (Math.abs(puz[i].x - recs[i].x) + Math.abs(puz[i].y - recs[i].y) > 10)
                    isall = false;
            }
            return isall;
        };
        Puzzles1.prototype.checkPositions = function (bmp1, bmp2) {
            var puz = this.puzzles;
            var recs = this.rects;
            for (var i = 0, n = puz.length; i < n; i++) {
                if (bmp1 === puz[i] || bmp2 === puz[i]) {
                    if (Math.abs(puz[i].x - recs[i].x) + Math.abs(puz[i].y - recs[i].y) < 10)
                        this.stickImage(puz[i], recs[i]);
                }
            }
        };
        Puzzles1.prototype.swapImages = function (bmp1, bmp2) {
            var _this = this;
            if (this.inProgres)
                return;
            this.inProgres = true;
            this.contPuzzles.addChild(bmp1);
            this.contPuzzles.addChild(bmp2);
            c.Tween.get(bmp1).to({ x: bmp2.x, y: bmp2.y }, 400, c.Ease.circOut);
            c.Tween.get(bmp2).to({ x: bmp1.x, y: bmp1.y }, 400, c.Ease.circOut);
            setTimeout(function () { _this.checkPositions(bmp1, bmp2); _this.inProgres = false; }, 500);
        };
        Puzzles1.prototype.shuffle = function (o) {
            for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x)
                ;
            return o;
        };
        return Puzzles1;
    })();
    uplight.Puzzles1 = Puzzles1;
})(uplight || (uplight = {}));
//# sourceMappingURL=Puzzles1.js.map