/// <reference path="../libs/typings/tweenjs.d.ts" />
/// <reference path="../libs/typings/easeljs.d.ts" />
module canv {
    ///images/website-images.jpg
    import c = createjs;
    var stage:createjs.Stage
  export  class Gallery {
        public view: HTMLDivElement;
      private canvas: HTMLCanvasElement;
      private ctx: CanvasRenderingContext2D 
      private _timeout: number;
       // private stage: createjs.Stage;

        constructor(public id:string) {
            this.view = < HTMLDivElement>document.getElementById(id);
            if (this.view) this.init();
           
        }
      private catImage(): void {
        // this.ctx.drawImage(this.canvas, 0, 0, 300, 300);



      }

        private init(): void {
            this.canvas = document.createElement('canvas');
            this.ctx = this.canvas.getContext('2d');
            trace(this.view.getAttribute('data-width'));
            this.canvas.width = Number(this.view.getAttribute('data-width')) || 800;
            this.canvas.height = Number(this.view.getAttribute('data-height')) || 350;
            this.view.appendChild(this.canvas);
            stage = new createjs.Stage(this.canvas);
            
            var img: HTMLImageElement = new Image();
            img.src = 'images/website-images.jpg';

            var _this = this;
            img.onload = function () {                
               
                var holder: ImageHolder = new ImageHolder(new createjs.Bitmap(img));
                stage.enableMouseOver(100);
                stage.addEventListener("mouseover", function (evt: MouseEvent) {
                    if (!holder.isChaos) holder.chaosImage();
                    trace("mouseover");
                   
                });
                stage.addEventListener("mouseout", function (evt: MouseEvent) {
                    trace("mouseout");
                    clearTimeout(_this._timeout);
                    _this._timeout = setTimeout(() => holder.backImage(), 5000);
                    //holder.chaosImage();
                });
               // stage.addChild(holder.bmp);
               // stage.update();
            }
           
        }


    }
   
    class ImageHolder {

        public isChaos: boolean;


        private rows: number = 3;
        private cols: number = 4;
        private dx: number;
        private dy: number;
        private rects: c.Rectangle[] = [];
        private bmps: c.Bitmap[] = [];

       

        public chaosImage(sh: c.Shape= null): void {
            
            if (sh) stage.removeChild(sh);
            var newAr: c.Rectangle[] = this.rects.slice(0);
            newAr = this.shuffle(newAr);
            this.isChaos = true;
            for (var i = 0, n = this.bmps.length; i < n; i++) {
                // c.Tween.get(this.bmps[i]).to({ x: this.rects[n - i - 1].x, y: this.rects[n - i - 1].y }, 1500).call(function () { createjs.Ticker.removeEventListener("tick", stage); });
                c.Tween.get(this.bmps[i]).to({ x: newAr[i].x, y: newAr[i].y }, 1000, c.Ease.circOut).call(function () { createjs.Ticker.removeEventListener("tick", stage.update); });


            }

            createjs.Ticker.addEventListener("tick", stage);
          
        }

        public backImage(): void { 
            this.isChaos = false;          
            for (var i = 0, n = this.bmps.length; i < n; i++) {

                c.Tween.get(this.bmps[i]).to({ x: this.rects[i].x, y: this.rects[i].y }, 1000, c.Ease.circOut).call(function () { createjs.Ticker.removeEventListener("tick", stage.update); });
            }
            createjs.Ticker.addEventListener("tick", stage);
         
        }
        constructor(public bmp: createjs.Bitmap) { this.init(); }

    private shuffle(o) { //v1.0
        for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    }
        


        private drawRectangles(): void {
            var b: c.Bitmap = this.bmp;
            var cont: any = b.parent
            var dx: number = b.getBounds().width / this.cols;
            var dy: number = b.getBounds().height / this.rows;

            for (var i = 0, n = this.cols; i < n;i++) {
                for (var j = 0; j < this.rows; j++) {
                    var r: c.Rectangle = new c.Rectangle(i * dx, j * dy, dx, dy);
                    this.rects.push(r);
                    var b2: c.Bitmap = b.clone()
                    b2.sourceRect = r;
                    this.bmps.push(b2);
                    b2.x = i * dx;
                    b2.y = j * dy;
                    stage.addChild(b2);
                }
               
            }
            var sh: c.Shape = new c.Shape;
            var g: c.Graphics = sh.graphics;
            g.setStrokeStyle(2);
           
            g.beginStroke('#FFFFFF');
            for(i = 0, n = this.rects.length; i < n ; i++){
                g.drawRect(this.rects[i].x, this.rects[i].y, this.rects[i].width, this.rects[i].height);
            }
            g.setStrokeStyle(4);
            sh.scaleX = 0.1;  
                    
            stage.addChild(sh);

            sh.shadow = new createjs.Shadow("#FFFFFF", 5, 5,15);
            var _this = this;
            c.Tween.get(sh).to({scaleX:1.0 }, 1000,c.Ease.cubicInOut).call(function () {               
                c.Tween.get(sh.shadow).to({ offsetX: 0, offsetY: 0,blur:0 }, 1000).call(function () {
                    sh.shadow = null;
                    g.clear();
                    g.setStrokeStyle(1);
                    g.beginStroke('#FFFFFF');
                    for (i = 0, n = _this.rects.length; i < n; i++) {
                        g.drawRect(_this.rects[i].x, _this.rects[i].y, _this.rects[i].width, _this.rects[i].height);
                    }
                    stage.update();                    
                    setTimeout((sh) => _this.chaosImage(sh),1000,sh);
                    createjs.Ticker.removeEventListener("tick", stage.update);

                });
               
               
            });           
            createjs.Ticker.addEventListener("tick", stage);
        }
        private init() {


            setTimeout(() => this.drawRectangles(), 1000);
        }
        
    }
  

}

var trace = trace || function (v) { console.log(v); }
var c: canv.Gallery = new canv.Gallery('myCanvas');