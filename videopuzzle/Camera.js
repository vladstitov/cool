/**
 * Created by VladHome on 12/3/2015.
 */
var uplight;
(function (uplight) {
    var Camera = (function () {
        function Camera(w, h) {
            this.w = w;
            this.h = h;
            // this.video = <HTMLVideoElement>document.getElementById('myVideo');
            this.video = document.createElement('video');
            //this.video.width=w;
            // this.video.height=h;
            this.initCamera();
        }
        Camera.prototype.initCamera = function () {
            var _this = this;
            var n = navigator;
            n.getUserMedia = n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia || n.msGetUserMedia;
            if (!n.getUserMedia) {
                alert("Your browser dosn't support Camera");
                return null;
            }
            n.getUserMedia({ video: true,
                audio: true }, function (cam) { return _this.onCameraSuccess(cam); }, this.onCameraFail);
        };
        Camera.prototype.onDemChanged = function () {
            console.log('onDemChanged  ' + this.video.videoWidth + ' ' + this.video.videoHeight);
        };
        Camera.prototype._onCameraReady = function () {
            var _this = this;
            var video = this.video;
            console.log(this.w + '  ' + video.width + ' video.videoWidth ' + video.videoWidth + '  height ' + this.h + '  ' + video.height + '  video.videoHeight ' + video.videoHeight);
            if (video.videoWidth < 100)
                setTimeout(function () { return _this._onCameraReady(); }, 1000);
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
        };
        Camera.prototype.onCameraSuccess = function (cam) {
            var _this = this;
            // console.log(cam);
            this.camera = cam;
            var w = window;
            var URL = w.URL || w.webkitURL;
            this.video.src = URL.createObjectURL(cam);
            //video.play();
            setTimeout(function () { return _this._onCameraReady(); }, 100);
        };
        Camera.prototype.onCameraFail = function (res) {
        };
        return Camera;
    })();
    uplight.Camera = Camera;
})(uplight || (uplight = {}));
//# sourceMappingURL=Camera.js.map