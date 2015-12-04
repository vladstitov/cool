/// <reference path="../libs/typings/easeljs.d.ts" />
module canv {
    import c = createjs;
    export class VideoSnap {
        public view: HTMLDivElement;
        private canvas: HTMLCanvasElement;
        private video: HTMLVideoElement;
        private btn: HTMLButtonElement;
        private ctx: CanvasRenderingContext2D;
        private posX: number;
        private posY: number;
        private stage: c.Stage;
        private W: number;
        private H: number=75;
        private bmps: c.Bitmap[]=[];
       
        private ROWS: number=3;
        private COLS: number=4;
        private i: number = -1;
        private currentImage: c.Bitmap;
        private wasX: number;
        private wasY: number;
        private scale: number;
        private container1: c.Container;
        private container2: c.Container;

       // private filter:c.Shadow;

        constructor(public id: string) {
            this.view = <HTMLDivElement>document.getElementById(id);
            if (this.view) this.init();
        }
        private onImageClick(evt:any): void {
            var img: c.Bitmap = <c.Bitmap> evt.currentTarget;
            ///trace(img);
            if (!img) return;      
            var same: boolean = this.currentImage == img;
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

        }
        private tick():void{

        }
        private stopMotion(vr): void {

        }
        private minifyImage(): void {
            if (!this.currentImage) return;

            c.Tween.get(this.currentImage).to({ x: this.wasX, y: this.wasY, scaleX: this.scale, scaleY: this.scale }, 500).call(function () { c.Ticker.removeEventListener("tick", this.tick); });
            c.Ticker.addEventListener("tick", this.stage);
            //this.currentImage.x = this.wasX;
            //this.currentImage.y = this.wasY;
           // this.currentImage.scaleX = this.scale;
           // this.currentImage.scaleY = this.scale;
            this.container1.addChild(this.currentImage); 
            this.currentImage = null;
        }
        private craeteImage(n:number): c.Bitmap {           
            var bmp: c.Bitmap = new c.Bitmap(this.video);          
            var scale = (this.W / this.video.videoWidth)*0.95;            
            bmp.scaleX = scale;
            bmp.scaleY = scale;
            this.scale = scale;
            bmp.cache(0, 0, this.video.videoWidth, this.video.videoHeight);
            bmp.x = (n % this.COLS) * this.W;          
            if (this.i > 3) bmp.y = this.H;
            if (this.i > 7) bmp.y = 2 * this.H;
            if (this.i > 11) bmp.y = 3 * this.H;
            bmp.addEventListener('click', (evt) => this.onImageClick(evt));
            this.container1.addChild(bmp);
            this.bmps.push(bmp);
            //bmp.shadow = this.filter;
            return bmp;
        }
        private btnClick(evt: MouseEvent): void {
            this.minifyImage();
            this.i++;
            if (this.i > 15) this.i = 0;
            var n: number = this.bmps.length;
            if (n < 16) {
                var bmp: c.Bitmap = this.craeteImage(n);
               
            } else {
                var bmp: c.Bitmap = this.bmps[this.i];
                bmp.updateCache();
            }

            //trace(bmp);
            this.stage.update();
            
            //this.ctx.drawImage(this.video, 0, 0, 400, 300);
        }
        private init(): void {
            trace(this.id + ' init ');
            this.canvas = this.view.getElementsByTagName('canvas')[0];
            this.stage = new c.Stage(this.canvas);
            this.ctx = this.canvas.getContext("2d");
            this.video = this.view.getElementsByTagName('video')[0];
            this.btn = this.view.getElementsByTagName('button')[0];
            this.btn.addEventListener('click', (evt) => this.btnClick(evt));
            this.W = this.canvas.width / this.COLS;
            this.container1 = new c.Container();
            this.container2 = new c.Container();
            this.stage.addChild(this.container1);
            this.stage.addChild(this.container2);
            //this.filter = new c.Shadow('#000055', 3, 3, 10);
        }

    }

}
declare var trace: (data) => { };
var snap: canv.VideoSnap = new canv.VideoSnap('VideoSnap');