/**
 * Created by VladHome on 12/3/2015.
 */
    /// <reference path="../libs/typings/jquery.d.ts" />
/// <reference path="../libs/typings/tweenjs.d.ts" />
/// <reference path="../libs/typings/easeljs.d.ts" />
module uplight{
    import c = createjs;
    export class ImageHolder {
        public container: c.Container;
        public recSource: c.Rectangle;
        public bmp: c.Bitmap



        private isVideo: boolean;

        removeImage(): void {
            this.container.removeAllChildren();
            c.Ticker.removeEventListener('tick', this.stage.update);
        }

        createVideo(video: HTMLVideoElement): void    {
             this.isVideo = true;
            this.bmp = new c.Bitmap(video);
           // this.bmp.setBounds(0,0,video.videoWidth,video.videoHeight);
            console.log(video.videoWidth+'   '+video.videoHeight);
            this.container.removeAllChildren();
            this.container.addChild(this.bmp);
          //  this.centerImage(video.videoWidth, video.videoHeight);


        }

        createImage(url:string) {
            this.container.removeAllChildren();
            this.bmp = new c.Bitmap(url);
            this.bmp.setBounds(0,0,this.stage.getBounds().width, this.stage.getBounds().height);
            this.container.addChild(this.bmp);
            //this.bmp.image = img;
            //this.centerImage(img.naturalWidth, img.naturalHeight);
            //var r: c.Rectangle = this.container.getBounds();

            this.stage.update();
        }

       /* private centerImage(w: number, h: number): void {
            this.recSource = new c.Rectangle(0, 0, w, h);

            var r: c.Rectangle = this.container.getBounds();
            var sc: number = r.width /w ;
            var sc2: number = r.height / h;
            var sc: number = sc > sc2 ? sc2 : sc;
            this.bmp.scaleX = sc;
            this.bmp.scaleY = sc;
        }*/

        constructor(public stage: c.Stage) {
            this.container = new c.Container();
            this.stage.addChild(this.container);
            this.container.setBounds(0,0,this.stage.getBounds().width, this.stage.getBounds().height);
        }

        /*
         ////////////////////////////////////////
         drawRectangles(): void {
         var puzzles: c.Container = new c.Container();
         this.stage.addChild(puzzles);
         var b: c.Bitmap = this.bmp;
         this.container.removeChild(b);
         //trace(this.container.scaleX);

         //puzzles.set({ x: b.x+this.container.x, y: b.y+this.container.y });

         var cont: any = b.parent
         var dx: number = this.W / this.cols;
         var dy: number = this.H / this.rows;

         for (var i = 0, n = this.cols; i < n;i++) {
         for (var j = 0; j < this.rows; j++) {
         var r: c.Rectangle = new c.Rectangle(i * dx, j * dy, dx, dy);
         this.rects.push(r);
         var b2: c.Bitmap = b.clone()
         b2.sourceRect = r;
         this.bmps.push(b2);
         b2.x = i * dx;
         b2.y = j * dy;
         puzzles.addChild(b2);
         }

         }


         //recs.scaleX = this.container.scaleX;
         // recs.scaleY = this.container.scaleY;


         this.stage.update();
         // trace(recs.x+ '   '+ this.bmp.x);
         //sh.shadow = new createjs.Shadow("#FFFFFF", 5, 5,15);
         /*
         // c.Tween.get(sh).to({ scaleX: 1.0 }, 1000, c.Ease.cubicInOut).call(function () {
         var _this = this;
         c.Tween.get(sh.shadow).to({ offsetX: 0, offsetY: 0,blur:0 }, 1000).call(function () {
         sh.shadow = null;
         g.clear();
         g.setStrokeStyle(1);
         g.beginStroke('#FFFFFF');
         for (i = 0, n = _this.rects.length; i < n; i++) {
         g.drawRect(_this.rects[i].x, _this.rects[i].y, _this.rects[i].width, _this.rects[i].height);
         }

         _this.stage.update();
         setTimeout((sh) => _this.chaosImage(sh),1000,sh);
         createjs.Ticker.removeEventListener("tick", this.stage);

         });
         */

        //});
        //createjs.Ticker.addEventListener("tick", this.stage);
        //}


    }

}