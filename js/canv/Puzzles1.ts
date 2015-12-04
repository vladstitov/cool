/**
 * Created by VladHome on 12/3/2015.
 */
    /// <reference path="../libs/typings/tweenjs.d.ts" />
/// <reference path="../libs/typings/easeljs.d.ts" />
declare var CLICK:string;
module uplight{
    import c = createjs;
  export  class Puzzles1 {
      constructor( private stage: c.Stage,bmp: c.Bitmap, sourceRec: c.Rectangle,res:string) {
          var ar: string[] = res.split('x');
          var cols = Number(ar[0]);
          var rows = Number(ar[1]);
          if (isNaN(cols) || isNaN(rows)) {
              alert('value of columns is wrong');
              return
          }
          //this.removePuzzles();
          var dx: number = sourceRec.width / cols;
          var dy: number = sourceRec.height / rows;
          //console.log(dx);
         // console.log(dy);
          var sc: number = bmp.scaleX;
          bmp.sourceRect = sourceRec;
         // console.log(bmp);
         // bmp.scaleX = 1.0;
         // bmp.scaleY = 1.0;

         // console.log(sc);

          var cont: c.Container = new c.Container();
          this.stage.addChild(cont);
         cont.setBounds(0,0,sourceRec.width,sourceRec.height);
          var bmps: c.Bitmap[] = [];
          var rects:c.Rectangle[]=[];


          for (var i = 0, n = cols; i < n; i++) {
              for (var j = 0; j < rows; j++) {
                  var r: c.Rectangle = new c.Rectangle(i * dx, j * dy, dx, dy);
                  rects.push(r);
                  var b2: c.Bitmap = bmp.clone();
                  b2.name= 'b_'+i+'_'+j;
                  b2.sourceRect = r;
                  bmps.push(b2);
                  b2.addEventListener(CLICK, (evt: MouseEvent) => this.onImageClicked(evt));
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

        private hiliter: c.Shape;
        private selectedImage: c.Bitmap;
        private cont: c.DisplayObject;
        private contPuzzles: c.Container;

        public rects: c.Rectangle[]=[];
        public puzzles: c.Bitmap[]=[];

        private isChaos: boolean;

      private onImageClicked(evt:MouseEvent): void {
       //   console.log(evt);

          var bmp:any = evt.currentTarget;
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


      }
        public removePuzzles(): void {
            if (this.contPuzzles) {
                this.stage.removeChild(this.contPuzzles);
                this.contPuzzles = null;
            }
        }
        public chaosImage(): void {
            if(this.inProgres ) return;
            var newAr: c.Rectangle[] = this.rects.slice(0);
            newAr = this.shuffle(newAr);
            this.isChaos = true;
            this.inProgres = true;
            setTimeout(() => { this.inProgres = false }, 1100);

            var bmps: c.Bitmap[]=this.puzzles;

            for (var i = 0, n = this.puzzles.length; i < n; i++) {
                // trace(bmps[i]);
                // c.Tween.get(this.bmps[i]).to({ x: this.rects[n - i - 1].x, y: this.rects[n - i - 1].y }, 1500).call(function () { createjs.Ticker.removeEventListener("tick", this.stage); });
                c.Tween.get(bmps[i]).to({ x: newAr[i].x, y: newAr[i].y }, 1000, c.Ease.circOut);//.call(function () { createjs.Ticker.removeEventListener("tick", this.stage); });


            }
            //  createjs.Ticker.addEventListener("tick", this.stage);

        }

        public backImage(): void {
            if (this.inProgres) return;
            this.inProgres = true;
            setTimeout(() => { this.inProgres = false }, 1100);
            this.isChaos = false;
            var bmps: c.Bitmap[] = this.puzzles;
            for (var i = 0, n = bmps.length; i < n; i++) {
                c.Tween.get(bmps[i]).to({ x: this.rects[i].x, y: this.rects[i].y }, 1000, c.Ease.circOut);//.call(function () { createjs.Ticker.removeEventListener("tick", stage); });
            }
            // createjs.Ticker.addEventListener("tick", this.stage);

        }


/*
        createPuzzles(bmp: c.Bitmap, sourceRec: c.Rectangle,res:string ): boolean {
            var ar: string[] = res.split('x');
            var cols = Number(ar[0]);
            var rows = Number(ar[1]);
            if (isNaN(cols) || isNaN(rows)) {
                alert('value of columns is wrong');
                return false;
            }
            this.removePuzzles();
            var dx: number = sourceRec.width / cols;
            var dy: number = sourceRec.height / rows;
            var sc: number = bmp.scaleX;
            bmp.scaleX = 1.0;
            bmp.scaleY = 1.0;

            var cont: c.Container = new c.Container();
            var bmps: c.Bitmap[] = [];
            var rects:c.Rectangle[]=[]
            for (var i = 0, n = cols; i < n; i++) {
                for (var j = 0; j < rows; j++) {
                    var r: c.Rectangle = new c.Rectangle(i * dx, j * dy, dx, dy);
                    rects.push(r);
                    var b2: c.Bitmap = bmp.clone()
                    b2.sourceRect = r;
                    bmps.push(b2);
                    b2.addEventListener(CLICK, (evt: MouseEvent) => this.onImageClicked(evt.currentTarget));
                    b2.x = r.x;
                    b2.y = r.y;
                    cont.addChild(b2);
                }
            }
            this.rects = rects;
            this.puzzles = bmps;
            // bmp.alpha = 0;
            cont.scaleX = sc;
            cont.scaleY = sc;
            bmp.scaleX = sc;
            bmp.scaleY = sc;
            this.hiliter = new c.Shape((new c.Graphics()).setStrokeStyle(3).beginStroke('#FFFFFF').drawRect(0, 0, r.width, r.height));
            this.stage.addChild(cont);
            this.contPuzzles = cont;
            return true;
        }*/

        /////////////////////////////////////////////////////////////////////////////////////////////
        onGameOver:Function;

        //////////////////////////////////////////////////////////////////////////////////
        private inProgres: boolean;
        private isOver: boolean;


        private stickImage(bmp: c.Bitmap, rec: c.Rectangle): void {
            bmp.x = rec.x;
            bmp.y = rec.y;
            bmp.removeAllEventListeners(CLICK);
            //this.inProgres = true;
            var hl: c.Shape = new c.Shape((new c.Graphics()).setStrokeStyle(5).beginStroke('#FFFFFF').drawCircle(0, 0, 100));
            hl.x = bmp.x + rec.width/2;
            hl.y = bmp.y + rec.height/2;
            this.contPuzzles.addChild(hl);
            c.Tween.get(hl).to({ scaleX: 0.1, scaleY: 0.1 }, 500).call(() => {
                this.contPuzzles.removeChild(hl);
                this.stage.update();
                ///this.inProgres = false;
                if (this.isAllinPlace() && !this.isOver) this.onGameOver();
            })
        }

        private isAllinPlace(): boolean {
            var puz: c.Bitmap[] = this.puzzles;
            var recs: c.Rectangle[] = this.rects;
            var isall: boolean = true;
            for (var i = 0, n = puz.length; i < n; i++) {
                if (Math.abs(puz[i].x - recs[i].x) + Math.abs(puz[i].y - recs[i].y) > 10) isall = false;
            }
            return isall;
        }

        private checkPositions(bmp1: c.Bitmap, bmp2: c.Bitmap): void {
            var puz: c.Bitmap[] = this.puzzles;
            var recs: c.Rectangle[] = this.rects;
            for (var i = 0, n = puz.length; i < n; i++) {
                if (bmp1 === puz[i] || bmp2 === puz[i]) {
                    if (Math.abs(puz[i].x - recs[i].x) + Math.abs(puz[i].y - recs[i].y) < 10) this.stickImage(puz[i], recs[i]);
                }
            }


        }
        private swapImages(bmp1: c.Bitmap, bmp2: c.Bitmap): void {
            if (this.inProgres) return;
            this.inProgres = true;

            this.contPuzzles.addChild(bmp1);
            this.contPuzzles.addChild(bmp2);
            c.Tween.get(bmp1).to({ x: bmp2.x, y: bmp2.y }, 400, c.Ease.circOut);
            c.Tween.get(bmp2).to({ x: bmp1.x, y: bmp1.y }, 400, c.Ease.circOut);

            setTimeout(() => { this.checkPositions(bmp1, bmp2); this.inProgres = false; }, 500);
        }


        private shuffle(o) { //v1.0
            for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
            return o;
        }
    }
}