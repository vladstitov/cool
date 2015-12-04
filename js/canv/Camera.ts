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
            console.log('initcamera');
            n.getUserMedia({ video: true, audio: true }, (cam) => this.onCameraSuccess(cam), this.onCameraFail);

        }

        constructor(private  w: number,private h: number) {
        this.initCamera();
        }


        private _onCameraReady(video: HTMLVideoElement): void {
            this.video = video;

            if (video.videoWidth < 100) setTimeout(() => this._onCameraReady(video), 100);
            else this.onCameraReady(video);
        }
        private onCameraSuccess(cam) {
            console.log(cam);
            this.camera = cam;
            var w: any = window;
            var URL = w.URL || w.webkitURL;
            var video: HTMLVideoElement = document.createElement('video');
            video.width = this.w;
            video.height = this.h;
            video.src = URL.createObjectURL(cam);
            video.play();
            setTimeout(() => this._onCameraReady(video), 100);

        }

        private onCameraFail(res) {

        }
    }
}