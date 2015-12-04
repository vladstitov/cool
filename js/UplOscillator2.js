/// <reference path="../../scripts/typings/easeljs/easeljs.d.ts" />
/// <reference path="../../scripts/typings/waa.d.ts" />
/// <reference path="../../scripts/typings/mediastream.d.ts" />
/// <reference path="../../scripts/typings/jquery/jquery.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
* Created by Vlad  Titov http://uplight.ca  on 7/15/2014.
*/
var upl;
(function (upl) {
    var Oscillator = (function () {
        function Oscillator(prefix) {
            var _this = this;
            this.wave = 'sine';
            console.log('Oscillator');
            this.view = $('#' + prefix + '-oscillator');
            this.range = this.view.find('[data-id=an_range]:first').on('input', null, function (evt) {
                return _this.onRangeChanged(evt);
            });
            this.inicator = this.view.find('[data-id=frequency]:first');

            var audioContext = window.AudioContext || window.webkitAudioContext;
            this.audioContext = new audioContext();

            this.view.find('[name=wave]').on('click', null, function (evt) {
                return _this.onWavesClick(evt);
            });
            this.onOffGen = this.view.find('[data-id=onoff]').on('click', null, function (evt) {
                return _this.onOnOffClick(evt);
            });

            this.volume = this.view.find('[data-id=volume]').on('input', null, function (evt) {
                return _this.onVolume(evt);
            });
            this.volumeInd = this.view.find('[data-id=volumeind]').text(this.volume.val());
            this.imgImpulse = this.view.find('[data-id=imgImpulse]:first'); //.on(CLICK, null, (evt) => this.onImgImpuleClick(evt));
            this.delay = this.view.find('[data-id=delay]:first');
            var btnFromImage = this.view.find('[data-id="btnFromImage"]').on(CLICK, null, function (evt) {
                return _this.onFromImageClick(evt);
            });
            ;

            this.onoffImp = this.view.find('[data-id="onoffImp"]').on(CLICK, null, function (evt) {
                return _this.onOnOffImpClick(evt);
            });
            ;
            this.rngSamplRate = this.view.find('[data-id=rngSamplRate]').on('input', null, function (evt) {
                return _this.onSamplRateInput(evt);
            }).on('change', null, function (evt) {
                return _this.onSamplRateChange(evt);
            });
            this.lblSamplRate = this.view.find('[data-id=lblSamplRate]');
            this.onSamplRateInput(null);
        }
        Oscillator.prototype.onSamplRateInput = function (evt) {
            this.lblSamplRate.text(((Math.pow(this.rngSamplRate.val(), 3) + 3) * 100).toString());
        };
        Oscillator.prototype.onSamplRateChange = function (evt) {
            var val = Number(this.lblSamplRate.text());
            if (isNaN(val))
                return;
            this.stopImpuleGenerator();
            this.startImpulseOscillator();
        };
        Oscillator.prototype.onOnOffImpClick = function (evt) {
            if (this.oscillator) {
                this.stopOscillator();
                this.onOffGen.prop('checked', false);
            }

            if (this.onoffImp.is(':checked'))
                this.startImpulseOscillator();
            else
                this.stopImpuleGenerator();
        };

        Oscillator.prototype.playImpulse = function () {
            var source = this.audioContext.createBufferSource();
            source.buffer = this.bufferImp;
            source.connect(this.audioContext.destination);
            source.start(0);
            this.impuleSourece = source;
        };

        Oscillator.prototype.stopImpuleGenerator = function () {
            clearInterval(this.timerImp);
            if (!this.impuleSourece)
                return;
            this.impuleSourece.disconnect();
            this.impuleSourece = null;
            this.bufferImp = null;
        };
        Oscillator.prototype.startImpulseOscillator = function () {
            var _this = this;
            var del = this.delay.val();
            if (isNaN(del) || del < 1) {
                alert('Please set delay between impulses form 1');
                return;
            }
            if (!this.arImpulse) {
                alert('Please set impulse form');
                return;
            }
            var rate = Number(this.lblSamplRate.text());

            if (isNaN(rate)) {
                alert('Samples rate should be between 3000 and 192000');
                return;
            }
            var ar = this.arImpulse;

            //var rate: number = this.audioContext.sampleRate / 16;
            //rate   [3000, 192000].
            //console.log(rate);
            this.bufferImp = this.audioContext.createBuffer(1, 1024, rate);
            var buf = this.bufferImp.getChannelData(0);
            for (var i = 0; i < 1024; ++i) {
                for (var n = ar.length; i < n; i++)
                    buf[i] = (128 - ar[i]) / 128;

                // audio needs to be in [-1.0; 1.0]
                //buf[i] = Math.sin(4400 * Math.PI * i / rate);
                buf[i] = 0;
            }

            if (this.timerImp)
                clearInterval(this.timerImp);
            this.timerImp = setInterval(function () {
                return _this.playImpulse();
            }, del);
        };

        Oscillator.prototype.onFromImageClick = function (evt) {
            var _this = this;
            if (this.fromImage)
                this.fromImage.destroy();

            this.popup = $('<div></div>').addClass('pop-up-over').html('<h2>Image to Array Converter<button>X</button ></h2>');
            this.popup.on(CLICK, 'h2>button', function (evt) {
                return _this.onClosePopup(evt);
            });

            this.fromImage = new ImageToArray();
            this.fromImage.view.appendTo(this.popup);
            this.view.append(this.popup);
        };

        Oscillator.prototype.onClosePopup = function (evt) {
            if (this.fromImage) {
                var ar = this.fromImage.getData();
                if (ar) {
                    this.imgImpulse.attr('src', this.fromImage.getImage());
                    this.arImpulse = ar;
                }
                this.fromImage.destroy();
                this.fromImage = null;
            }
            this.popup.remove();
        };

        Oscillator.prototype.onVolume = function (evt) {
            var val = this.volume.val();
            if (this.gain)
                this.gain.gain.value = val;
            this.volumeInd.text(val);
        };

        Oscillator.prototype.createOscillator = function () {
            this.oscillator = this.audioContext.createOscillator();
            this.oscillator.type = this.wave;
            this.gain = this.audioContext.createGain();
            this.gain.gain.value = this.volume.val();
            this.onRangeChanged();

            this.gain.connect(this.audioContext.destination);
            this.oscillator.connect(this.gain);
            this.oscillator.start(0);
        };

        Oscillator.prototype.stopOscillator = function () {
            if (!this.oscillator)
                return;

            this.oscillator.disconnect();
            this.gain.disconnect();
            this.oscillator.stop(0);
            this.oscillator = null;
            this.gain = null;
        };
        Oscillator.prototype.onOnOffClick = function (evt) {
            if (this.onoffImp.prop('checked')) {
                this.onoffImp.prop('checked', false);
                this.stopImpuleGenerator();
            }
            if ($(evt.currentTarget).is(':checked')) {
                this.createOscillator();
            } else
                this.stopOscillator();
        };

        Oscillator.prototype.onWavesClick = function (evt) {
            if (!$(evt.currentTarget).is(':checked'))
                return;

            switch ($(evt.currentTarget).data('id')) {
                case 'sin':
                    this.wave = 'sine';

                    break;
                case 'square':
                    this.wave = 'square';
                    break;
                case 'triangle':
                    this.wave = 'triangle'; // OscillatorType.triangle;//'triangle';
                    break;
                case 'sawtooth':
                    this.wave = 'sawtooth'; //OscillatorType.sawtooth;//'sawtooth';
                    break;
            }
            this.oscillator.type = this.wave;
        };

        Oscillator.prototype.onRangeChanged = function (evt) {
            if (typeof evt === "undefined") { evt = null; }
            var val = this.range.val();

            val = Math.round(Math.pow(val, 3));
            this.inicator.text(val);
            if (this.oscillator)
                this.oscillator.frequency.value = val;
        };
        return Oscillator;
    })();
    upl.Oscillator = Oscillator;

    var c = createjs;
    var CLICK = CLICK || 'click';

    /////////////////////////////////////////////////////////////////////////////////////////////////
    var ImageToArray = (function () {
        function ImageToArray() {
            var _this = this;
            var tools = $('<div></div>').html('.png .jpg .json <br/>');
            this.btnBrowse = $('<input type="file" />').appendTo(tools);
            this.btnBrowse.on('change', null, function (evt) {
                return _this.onBrowseSelect(evt);
            });
            this.btnConvert = $('<button>Convert</button>').on(CLICK, null, function (evt) {
                return _this.onConvert(evt);
            }).prop('disabled', true).appendTo(tools);
            this.btnPrint = $('<button>Print</button>').on(CLICK, null, function (evt) {
                return _this.onSaveClicked(evt);
            }).prop('disabled', true).appendTo(tools);
            this.ltSpice = $('<button>LTspice</button>').on(CLICK, null, function (evt) {
                return _this.onltSClicked(evt);
            }).prop('disabled', true).appendTo(tools);

            var view = $('<div></div>').append(tools);
            this.content = $('<div></div>').appendTo(view);
            this.view = view;
            //  this.view = view;
            ////  tools.find('[data-id=btnBrowse]').on(CLICK,null, (evt: JQueryEventObject) => this.onBrowse(evt));;
        }
        ImageToArray.prototype.getData = function () {
            return this.arResult;
        };

        ImageToArray.prototype.getImage = function () {
            return this.canvas.toDataURL();
        };
        ImageToArray.prototype.destroy = function () {
            this.view.remove();
            this.stage = null;
            this.btnBrowse = null;
            this.btnConvert = null;
            this.btnPrint = null;
            this.content = null;
            this.view = null;
            this.image = null;
            this.arResult = null;
        };

        ImageToArray.prototype.onCloseClicked = function (evt) {
        };
        ImageToArray.prototype.onSaveClicked = function (evt) {
            if (!this.arResult)
                return;

            $('<textarea rows="10" cols="40"></textarea>').text(JSON.stringify(this.arResult)).appendTo(this.view);
        };
        ImageToArray.prototype.onltSClicked = function (evt) {
            var ar = this.arResult;
            var str = '';
            for (var i = 0, n = ar.length; i < n; i++)
                str += (i).toString() + 'm ' + (256 - ar[i]) + 'm,';
            $('<textarea rows="10" cols="40"></textarea>').text(str.slice(0, -1)).appendTo(this.view);
        };
        ImageToArray.prototype.scanColumn = function (ar, col, width) {
            for (var i = 0; i < 256; i++) {
                var cell = col + (i * 4 * width);
                if (ar[cell - 3] < 250)
                    break;
            }
            return i;
        };
        ImageToArray.prototype.startScan = function () {
            var _this = this;
            var d2 = this.stage.canvas.getContext('2d');
            var ar = [];
            var start = Date.now();
            var w = this.implWidth;

            for (var x = 0; x < w; x++) {
                for (var y = 0; y < 256; y++)
                    if (d2.getImageData(x, y, 1, 1).data[0] < 200)
                        break;
                if (y == 256)
                    y = 128;
                ar.push(y);
                y = 0;
                // ar.push(this.getDataColumn(d2,x));
            }

            this.arResult = ar;
            setTimeout(function () {
                return _this.drawResult();
            }, 500);
            console.log(Date.now() - start);
            // console.log(ar);
        };
        ImageToArray.prototype.getDataColumn = function (d2, x) {
            for (var y = 0; y < 256; y++) {
                if (d2.getImageData(x, y, 1, 1).data[0] < 100)
                    break;
            }
            return y;
        };

        ImageToArray.prototype.drawResult = function () {
            this.btnPrint.prop('disabled', false);
            this.ltSpice.prop('disabled', false);
            this.btnBrowse.prop('disabled', false);
            this.content.html('');
            this.content.append(this.canvas);

            var sh = new c.Shape;
            var g = sh.graphics;
            g.beginStroke('#FF0000');
            var ar = this.arResult;
            g.moveTo(0, ar[0]);
            for (var i = 1, n = ar.length; i < n; i++)
                g.lineTo(i, ar[i]);
            var sh2 = new c.Shape;
            g = sh2.graphics;
            g.beginStroke('#00FF00');
            g.moveTo(0, 128);
            g.lineTo(n, 128);
            this.stage.addChild(sh2);
            this.stage.addChild(sh);
            this.stage.update();

            console.log(this.btnPrint.text());
        };

        ImageToArray.prototype.onConvert = function (evt) {
            var _this = this;
            if (!this.image)
                return;
            this.btnConvert.prop('disabled', true);
            var canvas = document.createElement("canvas");
            this.stage = new c.Stage(canvas);

            var stage = new c.Stage(canvas);
            var img = this.image;
            canvas.width = img.width;
            canvas.height = img.height;
            this.implWidth = img.width;
            var d2 = this.stage.canvas.getContext('2d');
            d2.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, 0, 0, img.width, img.height);

            this.btnBrowse.prop('disabled', true);

            this.canvas = canvas;
            img = new Image();
            img.width = 30;
            img.height = 30;
            img.src = '/css/img/wait.jpg';
            this.content.append(img);

            setTimeout(function () {
                return _this.startScan();
            }, 1000);
        };

        ImageToArray.prototype.onFileLoadedJSON = function (evt) {
            var ar = JSON.parse(evt.currentTarget.result);
            if (ar) {
                var canvas = document.createElement("canvas");
                canvas.width = ar.length;
                canvas.height = 256;
                this.canvas = canvas;
                this.stage = new c.Stage(canvas);

                this.arResult = ar;
                this.drawResult();
            }
        };

        ImageToArray.prototype.onFileLoaded = function (evt) {
            var _this = this;
            //console.log(evt);
            var img = new Image();
            img.src = evt.currentTarget.result;
            img.onload = function (evt2) {
                return _this.onImageLoaded(evt2);
            };
            img.height = 256;
            this.content.html('');
            this.content.append(img);
            this.image = img;

            this.btnConvert.prop('disabled', false);
            this.btnPrint.prop('disabled', true);
        };

        ImageToArray.prototype.onImageLoaded = function (evt) {
            var img = evt.currentTarget;
            if (img.naturalHeight != 256)
                alert('Image resized to 256 px height');
            // console.log(img.naturalHeight);
        };

        ImageToArray.prototype.onBrowseSelect = function (evt) {
            var _this = this;
            var file = evt.currentTarget.files[0];
            console.log(file.name);
            var reader = new FileReader();
            if (file.name.substr(-4) == 'json' || file.name.substr(-4) == '.txt') {
                reader.readAsText(file);
                reader.onload = function (evt2) {
                    return _this.onFileLoadedJSON(evt2);
                };
            } else {
                reader.readAsDataURL(file);
                reader.onload = function (evt2) {
                    return _this.onFileLoaded(evt2);
                };
            }
            // var img: HTMLImageElement = <HTMLImageElement> document.createElement('image');
            //  img.dataSrc = r
        };

        ImageToArray.prototype.createBrowse = function () {
            var view = $('<div></div>');
            $('<input type="file" />');
            return view;
        };
        return ImageToArray;
    })();
    upl.ImageToArray = ImageToArray;

    /////////////////////////////////////////////////////////////////////////////////////
    var CustomWave = (function () {
        function CustomWave(container) {
            var _this = this;
            var canvas = document.createElement("canvas");
            container.appendChild(canvas);
            this.d2 = canvas.getContext('2d');
            var stage = new c.Stage(canvas);
            this.stage = stage;
            this.stage.addEventListener('mousedown', function (evt) {
                return _this.mouseDown(evt);
            });
            this.stage.addEventListener('mouseup', function (evt) {
                return _this.mouseUp(evt);
            });
            this.stage.addEventListener('mousemove', function (evt) {
                return _this.mouseMove(evt);
            });
        }
        CustomWave.prototype.mouseDown = function (evt) {
        };
        CustomWave.prototype.mouseUp = function (evt) {
        };

        CustomWave.prototype.mouseMove = function (evt) {
        };
        return CustomWave;
    })();
    upl.CustomWave = CustomWave;

    var Dot = (function (_super) {
        __extends(Dot, _super);
        function Dot(dot) {
            var _this = this;
            _super.call(this);
            this.d = 3;
            this.color = '#000000';
            this.name = dot.id.toString();
            this.x = dot.x;
            this.y = dot.y;

            this.model = dot;

            var sh = new c.Shape();

            sh.graphics.beginFill(this.color);
            sh.graphics.drawCircle(0, 0, this.d);
            sh.graphics.endFill();
            this.addChild(sh);
            this.addEventListener('mouseover', function (evt) {
                return _this.onMouseOver(evt);
            });
            this.addEventListener('mouseout', function (evt) {
                return _this.onMouseOut(evt);
            });
        }
        Dot.prototype.onMouseOver = function (evt) {
        };

        Dot.prototype.onMouseOut = function (evt) {
        };
        return Dot;
    })(c.Container);
    var VODot = (function () {
        function VODot(id, x, y, joins) {
            if (typeof joins === "undefined") { joins = null; }
            this.id = id;
            this.x = x;
            this.y = y;
            this.joins = joins;
        }
        return VODot;
    })();
    upl.VODot = VODot;
})(upl || (upl = {}));
