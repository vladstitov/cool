/**
 * Created by VladHome on 12/3/2015.
 */
module uplight{
   export class Camera {
        video: HTMLVideoElement;
        camera: any;
        onCameraReady:Function;
        initCamera() :void {
            var n = <any>navigator;
            n.getUserMedia = n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia || n.msGetUserMedia;
            if (!n.getUserMedia) {
                alert("Your browser dosn't support Camera");
                return null;
            }


            n.getUserMedia({ video:true
            //{
               // mandatory:{
                  // maxWidth: w,
                  //  maxHeight: h
                   // minWidth: 330,
                   // minHeight: 240
               // }
           // }
                , audio: true }, (cam) => this.onCameraSuccess(cam), this.onCameraFail);

        }


        constructor(private w:number,private h:number){
         // this.video = <HTMLVideoElement>document.getElementById('myVideo');
            this.video = <HTMLVideoElement>document.createElement('video');
            //this.video.width=w;
           // this.video.height=h;
            this.initCamera();
        }


       onDemChanged():void{
           console.log('onDemChanged  '+this.video.videoWidth+' '+this.video.videoHeight );
       }


        private _onCameraReady(): void {
            var  video = this.video;
           console.log(this.w+'  '+video.width+' video.videoWidth '+video.videoWidth +'  height '+this.h+'  '+video.height+'  video.videoHeight '+video.videoHeight);

            if (video.videoWidth < 100) setTimeout(() => this._onCameraReady(), 1000);
            else {
                video.width = video.videoWidth;
                video.height = video.videoHeight;
               // var dw:number = this.w/ video.width;

              //  video.style.transform = 'scale(' + dw + ')';
               // video.style['-o-transform'] = 'scale(' + dw + ')';
               // video.style['-webkit-transform'] = 'scale(' + dw+ ')';
                //video.style['-moz-transform'] = 'scale(' + dw + ')';

                this.onCameraReady(video);
            }
        }

        private onCameraSuccess(cam:MediaSource) {
           // console.log(cam);
            this.camera = cam;
            var w: any = window;
            var URL = w.URL || w.webkitURL;
            this.video.src = URL.createObjectURL(cam);
           //video.play();
           setTimeout(() => this._onCameraReady(), 100);

        }

        private onCameraFail(res) {

        }
    }
}