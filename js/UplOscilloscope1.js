/// <reference path="../../scripts/typings/easeljs/easeljs.d.ts" />
/// <reference path="../../scripts/typings/waa.d.ts" />
/// <reference path="../../scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../scripts/typings/mediastream.d.ts" />
/*
Created By Vlad Titov  vlad.vlad.titov@gmail.com 07/07/2014
*/
var upl;
(function (upl) {
    var c = createjs;

    var Oscilloscope1 = (function () {
        // private oscAnalyser:OscRecorder
        function Oscilloscope1(prefix) {
            var _this = this;
            this.prefix = prefix;
            this.bufferSize = 1024;
            var view = $('#' + prefix + '-oscilloscope');
            this.stage = new c.Stage(document.getElementById(prefix + '-screen1'));
            this.select = view.find('[data-id=input_select]:first').on('change', null, function (evt) {
                return _this.onInputChanged(evt);
            });

            var canvas = $('#' + prefix + '-screen1');

            this.lineColor = canvas.data('color') || '#000000';

            //this.width = canvas.width();
            var audioContext = window.AudioContext || window.webkitAudioContext;
            this.audioContext = new audioContext();

            navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia);

            if (navigator.getUserMedia)
                setTimeout(function () {
                    return _this.getInputsList();
                }, 200);
            else
                alert('browser doest support getUserMedia');
            this.speed = document.getElementById(prefix + '-speed');
            this.hrange = view.find('[data-id=h-range]').on('change', null, function (evt) {
                return _this.onRangeChanged(evt);
            }).on('input', null, function (evt) {
                return _this.onRangeInput(evt);
            });
            ;
            this.h_indicator = view.find('[data-id=h_indicator]');
            this.onRangeInput(null);
            this.onRangeChanged(null);
        }
        Oscilloscope1.prototype.onRangeChanged = function (evt) {
            var val = Number(this.hrange.val());
            if (isNaN(val))
                return;
            val = Math.pow(2, val);
            this.bufferSize = val;
            if (this.display)
                this.display.makeBuffer(val);
        };

        Oscilloscope1.prototype.onRangeInput = function (evt) {
            var val = Number(this.hrange.val());
            if (isNaN(val))
                return;

            val = Math.pow(2, val);
            this.h_indicator.text(val);
        };
        Oscilloscope1.prototype.getInputsList = function () {
            var _this = this;
            MediaStreamTrack.getSources(function (info) {
                return _this.gotSources(info);
            });
        };

        Oscilloscope1.prototype.gotSources = function (souces) {
            //   console.log(souces);
            var str = '';
            for (var i = 0, n = souces.length; i < n; i++)
                if (souces[i].kind == 'audio')
                    str += '<option value="' + souces[i].id + '">' + (souces[i].label || 'Input ' + i) + '</option>';
            this.select.html(str);
            this.getUserMedia({ audio: true, video: false });
        };

        Oscilloscope1.prototype.getUserMedia = function (constraints) {
            var _this = this;
            navigator.getUserMedia(constraints, function (stream) {
                return _this.onConnect(stream);
            }, function (e) {
                alert('Error getting audio');
                console.log(e);
            });
        };
        Oscilloscope1.prototype.onInputChanged = function (evt) {
            var select = evt.currentTarget;

            var constraints = {
                audio: {
                    optional: [{ sourceId: select.value }]
                },
                video: false
            };
            console.log('getting source ' + select.value);
            this.getUserMedia(constraints);
        };

        Oscilloscope1.prototype.onConnect = function (stream) {
            //  this.mediaStriam = stream;
            if (this.display)
                this.display.destroy();
            this.stage.removeAllChildren();
            this.display = new OscDisplay(this.audioContext, stream, this.stage, this.speed, this.lineColor);
            this.display.makeBuffer(this.bufferSize).connect();
        };
        return Oscilloscope1;
    })();
    upl.Oscilloscope1 = Oscilloscope1;

    var OscDisplay = (function () {
        function OscDisplay(context, stream, stage, speed, color) {
            this.count = 0;
            this.startn = 0;
            this.speed = speed;
            this.stage = stage;
            this.color = color;
            this.context = context;
            this.stream = stream;
            var sh = new c.Shape();
            this.screen = sh;
            stage.addChild(sh);
            this.graphics = sh.graphics;
            this.create();
        }
        OscDisplay.prototype.create = function () {
            this.streamSource = this.context.createMediaStreamSource(this.stream);
            this.analyser = this.context.createAnalyser();
        };

        OscDisplay.prototype.destroy = function () {
            this.streamSource = null;
            this.jsProcessor.onaudioprocess = null;
            this.jsProcessor = null;
            this.analyser = null;
            this.isConnected = false;
        };
        OscDisplay.prototype.disconnect = function () {
            this.analyser.disconnect();
            this.streamSource.disconnect();
            this.jsProcessor.disconnect();
            this.jsProcessor.onaudioprocess = null;
            this.isConnected = false;
            return this;
        };
        OscDisplay.prototype.connect = function () {
            var _this = this;
            console.log('Connectiong with data length: ' + this.data.length);
            this.isConnected = true;
            this.jsProcessor.connect(this.analyser);
            this.streamSource.connect(this.analyser);
            this.startn = Date.now();
            this.count = 0;
            this.jsProcessor.onaudioprocess = function (evt) {
                return _this.onAudioProcess(evt);
            };
            return this;
        };
        OscDisplay.prototype.makeBuffer = function (buffer) {
            var connected = this.isConnected;
            if (connected)
                this.disconnect();
            this.data = new Uint8Array(buffer);
            this.jsProcessor = this.context.createScriptProcessor(buffer, 1, 1);
            if (connected)
                this.connect();
            return this;
        };

        OscDisplay.prototype.onAudioProcess = function (evt) {
            var data = this.data;
            this.analyser.getByteTimeDomainData(data);
            var g = this.graphics;
            g.clear();
            g.setStrokeStyle(1);
            g.beginStroke(this.color);
            g.moveTo(0, data[0]);
            var n = data.length;
            var dev = 1024 / n;
            for (var i = 1; i < n; i++)
                g.lineTo(i * dev, data[i]);
            this.stage.update();

            if (++this.count == 9) {
                var end = Date.now();
                this.count = 0;
                this.speed.textContent = ((end - this.startn) / 10).toString();
                this.startn = end;
            }
        };
        return OscDisplay;
    })();
    upl.OscDisplay = OscDisplay;
})(upl || (upl = {}));
