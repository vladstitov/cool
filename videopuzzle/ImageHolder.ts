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
            this.container.removeAllChildren();
            this.container.addChild(this.bmp);
            var recSt:c.Rectangle = this.stage.getBounds();
            var rec:c.Rectangle = this.bmp.getBounds();
            if(recSt.width<rec.width){
                this.bmp.x=(recSt.width-rec.width)/2;
            }
            if(recSt.height<rec.height){
                this.bmp.y=(recSt.height-rec.height)/2;
            }
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



    }

}