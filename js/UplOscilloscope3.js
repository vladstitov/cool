/// <reference path="../../scripts/typings/easeljs/easeljs.d.ts" />
/// <reference path="../../scripts/typings/MediaStream.d.ts" />
/// <reference path="../../scripts/typings/jquery/jquery.d.ts" />
/**
* Created by Vlad  Titov http://uplight.ca  on 7/5/2014.
*/
var upl;
(function (upl) {
    var c = createjs;

    var Oscilloscope = (function () {
        function Oscilloscope(prefix) {
            var _this = this;
            this.prefix = prefix;
            this.bufferSize = 2048;
            this.isRecording = 0;
            this.sensitivity = 0;
            this.start = 0;
            this.count = 0;
            var view = $('#' + prefix + '-oscilloscope');
            this.stage = new c.Stage(document.getElementById(prefix + '-screen1'));

            this.bufferSize = Number(view.data('buffer') || 2048);
            this.select = view.find('[data-id=input_select]:first').on('change', null, function (evt) {
                return _this.onInputChanged(evt);
            });

            var canvas = $('#' + prefix + '-screen1');

            this.lineColor = canvas.data('color') || '#000000';
            this.width = canvas.width();

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

            this.oscAnalyser = new OscRecorder(prefix);

            this.btnStartStop = view.find('[data-id=start_stop]:first').on('click', null, function (evt) {
                return _this.onStartStop(evt);
            });
            this.lengthV = view.find('[data-id=length]:first');

            this.oscAnalyser.onReady = function () {
                _this.btnStartStop.removeClass('color-red');
                setTimeout(function () {
                    _this.btnStartStop.text('Start Recording');
                    _this.btnPrint.attr('disabled', false);
                    _this.btnClear.attr('disabled', false);
                }, 500);
            };

            this.dataV = $('#' + prefix + '-dataView');
            this.btnPrint = view.find('[data-id=print]:first').on('click', null, function (evt) {
                return _this.onPrintClick(evt);
            }).attr('disabled', true);
            this.btnClear = view.find('[data-id=clear]:first').on('click', null, function (evt) {
                return _this.onClearClick(evt);
            }).attr('disabled', true);
            this.sensitivityV = view.find('[data-id=sensitivity]:first').on('change', null, function (evt) {
                return _this.onSensitivityChanged(evt);
            });
            // navigator.getUserMedia({ video: false, audio: true }, (stream: MediaStream) => this.onConnect(stream), function (e) {
            //  alert('Error getting audio');
            // console.log(e);
            //   });
        }
        Oscilloscope.prototype.onSensitivityChanged = function (evt) {
            var num = this.sensitivityV.val();
            if (isNaN(num) || num > 120 || num < 0)
                num = 0;
            this.sensitivity = num;
            //  this.oscAnalyser.setSensitivity(num);
        };
        Oscilloscope.prototype.onClearClick = function (evt) {
            this.dataV.text('');
            this.oscAnalyser.reset();
            this.btnPrint.attr('disabled', true);
            this.btnClear.attr('disabled', true);
        };
        Oscilloscope.prototype.onPrintClick = function (evt) {
            // this.oscAnalyser.drawFullMemory();
            // return;
            var ar = this.oscAnalyser.getRefers();

            var ar1 = this.oscAnalyser.getData();
            var str = '';

            for (var i = 0, n = ar.length; i < n; i++) {
                var ar2 = ar1[i];
                var ar3 = [];

                for (var i2 = 0, n2 = ar2.length; i2 < n2; i2++)
                    ar3[i2] = ar2[i2].toString();
                str += (ar[i] + ':' + ar3.join(',')) + "\n";
                //console.log(ar[i]);
            }

            this.dataV.text(str);
        };

        Oscilloscope.prototype.start_stop = function (evt) {
            this.jsNode.disconnect();
        };

        Oscilloscope.prototype.getInputsList = function () {
            var _this = this;
            MediaStreamTrack.getSources(function (info) {
                return _this.gotSources(info);
            });
        };

        Oscilloscope.prototype.gotSources = function (souces) {
            //   console.log(souces);
            var str = '';
            for (var i = 0, n = souces.length; i < n; i++)
                if (souces[i].kind == 'audio')
                    str += '<option value="' + souces[i].id + '">' + (souces[i].label || 'Input ' + i) + '</option>';
            this.select.html(str);
            this.getUserMedia({ audio: true, video: false });
        };

        Oscilloscope.prototype.getUserMedia = function (constraints) {
            var _this = this;
            navigator.getUserMedia(constraints, function (stream) {
                return _this.onConnect(stream);
            }, function (e) {
                alert('Error getting audio');
                console.log(e);
            });
        };
        Oscilloscope.prototype.onInputChanged = function (evt) {
            var select = evt.currentTarget;

            //  clearInterval(this.timer);
            var constraints = {
                audio: {
                    optional: [{ sourceId: select.value }]
                },
                video: false
            };
            console.log('getting source ' + select.value);
            this.getUserMedia(constraints);
        };

        Oscilloscope.prototype.onConnect = function (stream) {
            var _this = this;
            this.mediaStriam = stream;

            // console.log(stream);
            var context = this.audioContext;

            var color = this.lineColor;

            /////////////////////////////////////////////////////
            var streamSource = context.createMediaStreamSource(stream);
            this.analyser = context.createAnalyser();

            this.jsProcessor = context.createScriptProcessor(this.bufferSize, 1, 1);
            streamSource.connect(this.analyser);
            this.jsProcessor.connect(this.analyser);
            this.jsProcessor.onaudioprocess = function (evt) {
                return _this.onProcess(evt);
            };
            this.stage.removeAllChildren();
            this.stage.update();
            var sh = new c.Shape();
            this.stage.addChild(sh);
            this.graphics = sh.graphics;
            // this.showProcess(jsProcessor,analyser);
        };

        /*
        private showProcess(jsProcessor: ScriptProcessorNode, analyser: AnalyserNode): void {
        var stage = this.stage;
        stage.removeAllChildren();
        stage.update();
        
        var sh: c.Shape = new c.Shape();
        stage.addChild(sh);
        var g: c.Graphics = sh.graphics;
        
        
        var start: number = Date.now();
        var speed: HTMLSpanElement = this.speed;
        //txt.text(start.toString());
        var count = 0;
        //var width: number = this.width;
        var step: number = this.width / this.bufferSize;
        var color:string =this.lineColor;
        var rec:OscRecorder = this.oscAnalyser;
        var size:number= this.bufferSize;
        var sens:number=0;
        var sense:number=0;
        jsProcessor.onaudioprocess = function (evt: AudioProcessingEvent) {
        // console.log(evt);
        var data: Uint8Array = new Uint8Array(size);
        analyser.getByteTimeDomainData(data);
        g.clear();
        g.setStrokeStyle(1);
        g.beginStroke(color);
        g.moveTo(0, data[0]);
        var isRec:number=0
        if(sense==0) isRec=1;
        
        for (var i = 1, n = data.length; i < n; i++){
        g.lineTo(step*i, data[i]);
        if(sense==0) continue;
        
        if(isRec==0 && (( data[i]<(128-sense) || ( data[i]>(128+sense)))))isRec=1;
        }
        // } for (var i = 1, n = data.length; i < n; i++)  g.lineTo(step*i, data[i]);
        stage.update();
        var end = Date.now();
        if (++count == 9) {
        count = 0;
        speed.textContent = ((end - start)/10).toString();
        start = end;
        // console.log(i);
        }
        if(isRec)sense = rec.addData(data,end);
        };
        }
        */
        Oscilloscope.prototype.onProcess = function (evt) {
            var size = this.bufferSize;
            var data = new Uint8Array(size);
            this.analyser.getByteTimeDomainData(data);
            var g = this.graphics;
            g.clear();
            g.setStrokeStyle(1);
            g.beginStroke(this.lineColor);
            g.moveTo(0, data[0]);
            var step = this.width / this.bufferSize;
            var sense = this.sensitivity;
            var isRec = 0;

            if (sense == 0)
                isRec = 1;
            for (var i = 1, n = size; i < n; i++) {
                g.lineTo(step * i, data[i]);
                if (sense == 0)
                    continue;
                if (isRec == 0 && ((data[i] < (128 - sense) || (data[i] > (128 + sense)))))
                    isRec = 1;
            }
            this.stage.update();
            var end = Date.now();
            if (isRec)
                this.oscAnalyser.addData(data, end);

            if (++this.count == 9) {
                this.count = 0;
                this.speed.textContent = ((end - this.start) / 10).toString();
                this.start = end;
                // console.log(i);
            }
        };

        Oscilloscope.prototype.onStartStop = function (evt) {
            if (this.btnStartStop.text() != 'Start Recording') {
                this.btnStartStop.text('Start Recording');
                this.oscAnalyser.stopRecording();
                this.btnStartStop.removeClass('color-red');
            } else {
                this.btnStartStop.text('Stop Recording');
                this.btnStartStop.addClass('color-red');
                this.oscAnalyser.startRecording(this.lengthV.val());
            }
        };
        return Oscilloscope;
    })();
    upl.Oscilloscope = Oscilloscope;

    var OscRecorder = (function () {
        function OscRecorder(prefix) {
            var _this = this;
            this.data = [];
            this.refer = [];
            this.length = 1000;
            this.isRecording = false;
            this.view = $('#' + prefix + '-recorder');
            var canvas = $('#' + prefix + '-screen2');

            this.stage = new c.Stage(document.getElementById(prefix + '-screen2'));
            this.range = this.view.find('[data-id=an_range]:first').on('input', null, function (evt) {
                return _this.onRangeChanged(evt);
            });
            this.screens = this.view.find('[data-id=screens]:first');
            this.color = canvas.data('color') || '0x000000';
        }
        OscRecorder.prototype.getRefers = function () {
            return this.refer;
        };
        OscRecorder.prototype.getData = function () {
            return this.data;
        };

        OscRecorder.prototype.addData = function (ar, timestamp) {
            var _this = this;
            if (!this.isRecording)
                return 0;
            this.data.push(ar);
            this.refer.push(timestamp);
            var l = this.refer.length;
            this.screens.text(l.toString());
            this.range.val(l);
            setTimeout(function () {
                return _this.drawArrayScreen(ar, timestamp);
            }, 20);
            if (l >= this.length)
                this.gotFull();
            return l;
        };
        OscRecorder.prototype.gotFull = function () {
            this.stopRecording();
        };
        OscRecorder.prototype.reset = function () {
            this.data = [];
            this.refer = [];
            this.range.val(0);
            this.range.attr('disabled', true);
            this.screens.text('0');
            this.stage.removeAllChildren();
            this.graphics = null;
        };
        OscRecorder.prototype.startRecording = function (num) {
            // console.log('Start recording '+num);
            //this.reset();
            this.length = num;
            this.range.attr('max', num - 1);
            this.isRecording = true;
        };

        OscRecorder.prototype.stopRecording = function () {
            this.isRecording = false;
            this.range.attr('disabled', false);
            if (this.refer.length > 0 && this.onReady)
                this.onReady();
            //this.range.attr('max',this.length-1);
        };

        OscRecorder.prototype.createGraphics = function () {
            var sh = new c.Shape();
            var txt = new c.Text();
            this.stamp = txt;
            this.stage.addChild(txt);
            this.stage.addChild(sh);
            return sh.graphics;
        };

        OscRecorder.prototype.drawFullMemory = function () {
            var start = Date.now();
            var ar = this.data;
            var out = [];
            this.stage.removeAllChildren();

            //  var g:c.Graphics= this.graphics;
            //  g.clear();
            // g.setStrokeStyle(1);
            // g.beginStroke(this.color);
            var step = 0.01;
            var offset = 0;
            for (var i = 0, n = ar.length; i < n; i++) {
                // var out:number[]=[];
                var sh = new c.Shape();
                var g = sh.graphics;
                g.setStrokeStyle(1);
                g.beginStroke(this.color);
                offset += 100;

                // for(var i2=0,n2= ar[i].length;i2<n2;i2++)out.push(ar[i][i2]);
                this.drawArray(ar[i], g, step, offset);
                this.stage.addChild(sh);
            }
            this.stage.update();
            console.log('total array ' + out.length + ' takes :' + (Date.now() - start) + ' ms');
            //setTimeout(()=>this.drawArray(out),100);
        };
        OscRecorder.prototype.drawArray = function (ar, g, step, offset) {
            //  var start:number= Date.now();
            g.moveTo(0, ar[0]);
            for (var i = 1, n = ar.length; i < n; i++)
                g.lineTo(step * i + offset, ar[i]);

            ;
            //console.log('drawArray takes : '+(Date.now()-start));
        };
        OscRecorder.prototype.drawArrayScreen = function (ar, ts) {
            if (!this.graphics)
                this.graphics = this.createGraphics();
            var d = new Date(ts);
            this.stamp.text = d.toDateString() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() + ':' + d.getMilliseconds();

            // this.currentTime.text(d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()+':'+d.getMilliseconds());
            var step = 1024 / ar.length;
            var g = this.graphics;
            g.clear();
            g.setStrokeStyle(1);
            g.beginStroke(this.color);
            g.moveTo(0, ar[0]);
            for (var i = 1, n = ar.length; i < n; i++)
                g.lineTo(step * i, ar[i]);

            // console.log(i);
            this.stage.update();
        };

        OscRecorder.prototype.onRangeChanged = function (evt) {
            var n = this.range.val();
            if (isNaN(n) || n < 0 || n >= this.refer.length)
                return;
            var ar = this.data[n];
            var ts = this.refer[n];
            this.drawArrayScreen(ar, ts);
        };
        return OscRecorder;
    })();
    upl.OscRecorder = OscRecorder;
})(upl || (upl = {}));


//# sourceMappingURL=UplOscilloscope3.js.map
