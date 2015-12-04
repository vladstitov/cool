/**
 * Created by VladHome on 12/3/2015.
 */
var uplight;
(function (uplight) {
    var Camera = (function () {
        function Camera(w, h) {
            this.w = w;
            this.h = h;
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
            console.log('initcamera');
            n.getUserMedia({ video: true, audio: true }, function (cam) { return _this.onCameraSuccess(cam); }, this.onCameraFail);
        };
        Camera.prototype._onCameraReady = function (video) {
            var _this = this;
            this.video = video;
            if (video.videoWidth < 100)
                setTimeout(function () { return _this._onCameraReady(video); }, 100);
            else
                this.onCameraReady(video);
        };
        Camera.prototype.onCameraSuccess = function (cam) {
            var _this = this;
            console.log(cam);
            this.camera = cam;
            var w = window;
            var URL = w.URL || w.webkitURL;
            var video = document.createElement('video');
            video.width = this.w;
            video.height = this.h;
            video.src = URL.createObjectURL(cam);
            video.play();
            setTimeout(function () { return _this._onCameraReady(video); }, 100);
        };
        Camera.prototype.onCameraFail = function (res) {
        };
        return Camera;
    })();
    uplight.Camera = Camera;
})(uplight || (uplight = {}));
//# sourceMappingURL=Camera.js.map