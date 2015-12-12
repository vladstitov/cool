/// <reference path="../libs/typings/jquery.d.ts" />
/// <reference path="../libs/typings/tweenjs.d.ts" />
/// <reference path="../libs/typings/easeljs.d.ts" />
/// <reference path="Camera.ts" />
/// <reference path="ImageHolder.ts" />
/// <reference path="Puzzles.ts" />
var uplight;
(function (uplight) {
    var c = createjs;
    var Puzzle = (function () {
        // private stage: createjs.Stage;
        function Puzzle($view) {
            this.$view = $view;
            this.Ws = 640;
            this.Hs = 480;
            this.D = this.Hs / this.Ws;
            this.view = $view.get(0);
            if (this.view)
                this.init();
        }
        Puzzle.prototype.catImage = function () {
            // this.ctx.drawImage(this.canvas, 0, 0, 300, 300);
        };
        Puzzle.prototype.createButton = function (label) {
            var btn = document.createElement('button');
            btn.value = label;
            btn.innerText = label;
            return btn;
        };
        Puzzle.prototype.onCameraReady = function (video) {
            //console.log('onCameraReady '+video.videoWidth+'  '+video.videoHeight);
            this.imageHolder.createVideo(this.camera.video);
            c.Ticker.addEventListener('tick', this.stage);
        };
        Puzzle.prototype.initTools = function () {
            var _this = this;
            this.$btnStart = this.$view.find('[data-id=btnStart]:first').click(function () {
                _this.engine = new uplight.Puzzles(_this.stage, _this.imageHolder.bmp, _this.$selRes.val());
                _this.imageHolder.removeImage();
                _this.engine.onGameOver = function () { return _this.gameOver(); };
                if (!_this.imageHolder.bmp) {
                    alert("Please use Camera or select Image");
                    return;
                }
                _this.isOver = false;
                _this.imageHolder.removeImage();
                _this.strtTime = new Date().getTime();
                c.Ticker.addEventListener('tick', _this.stage);
            });
            $(window).on("orientationchange", function (event) {
                console.log(' orientationchange ' + window.orientation);
                if (_this.camera)
                    _this.camera.onDemChanged();
            });
            this.$btnUseCamera = this.$view.find('[data-id=btnUseCamera]:first').click(function () {
                if (_this.engine)
                    _this.engine.destroy();
                if (!_this.camera) {
                    _this.camera = new uplight.Camera(_this.W, _this.H);
                    _this.camera.onCameraReady = function (video) { return _this.onCameraReady(video); };
                }
                else
                    _this.imageHolder.createVideo(_this.camera.video);
            });
            this.$selRes = this.$view.find('[data-id=setResolution]:first').change(function () {
            });
            this.$images = this.$view.find('.list:first');
            var ar = Array('4x4', '5x5', '6x6', '7x7', '8x8', '10x10');
            var out = '';
            for (var i = 0, n = ar.length; i < n; i++)
                out += '<option>' + ar[i] + '</option>';
            this.$selRes.html(out);
            $.get('rem/index.php', { a: 'getexamples' }, 'json').done(function (resp) {
                var res = JSON.parse(resp);
                var out = '';
                var ar = res.result;
                for (var i = 0, n = ar.length; i < n; i++)
                    out += '<img src="' + ar[i] + '" />';
                _this.$images.html(out);
                _this.$images.on(CLICK, 'img', function (evt) {
                    if (_this.engine)
                        _this.engine.destroy();
                    var el = $(evt.currentTarget);
                    var url = el.attr('src');
                    _this.imageHolder.createImage(url);
                    console.log(url);
                    // this.imageHolder.createImage()
                });
            });
        };
        Puzzle.prototype.setDemetions = function () {
            this.canvas.height = this.H;
            this.canvas.width = this.W;
            this.stage.setBounds(0, 0, this.W, this.H);
        };
        /////////////////////////////////////////////////////////////////
        Puzzle.prototype.init = function () {
            var _this = this;
            var w = screen.width - 30;
            var h = screen.height - 30;
            if (w < this.Ws)
                this.W = w;
            else
                this.W = this.Ws;
            if (h < this.Hs)
                this.H = h;
            else
                this.H = this.Hs;
            /*
            console.log(w+'   '+h);
                        if(w<this.Ws){
                            if(typeof window.orientation !== 'undefined'){
                                if(w>h){
                                    this.H = h-30;
                                    this.W = Math.round(this.H/this.D);
            
                                }else{
                                    this.W = w -30;
                                    this.H = Math.round(this.W/this.D);
                                }
                            }else{
                                console.log(' window.orientation  '+ window.orientation);
                            }
            
            
                        }else {
                            this.W = this.Ws;
                            this.H = this.Hs;
                        }
            */
            console.log(' after all  ' + this.W + '   ' + this.H);
            this.canvas = document.getElementById('PuzzleCanvas');
            this.stage = new c.Stage(this.canvas);
            this.ctx = this.canvas.getContext('2d');
            this.setDemetions();
            this.imageHolder = new uplight.ImageHolder(this.stage);
            this.initTools();
            this.$puzzleOver = $('#puzzleOver');
            this.$puzzleOver.find('[data-id=btnClose]').click(function () {
                _this.$puzzleOver.fadeOut();
            });
        };
        Puzzle.prototype.gameOver = function () {
            if (this.isOver)
                return;
            this.isOver = true;
            this.$puzzleOver.find('[data-id=gameMessage]:first').text("game Over in: " + Math.round(((new Date()).getTime() - this.strtTime) / 1000) + ' sec');
            this.$puzzleOver.fadeIn();
            c.Ticker.removeEventListener('tick', this.stage.update);
            this.engine = null;
        };
        return Puzzle;
    })();
    uplight.Puzzle = Puzzle;
})(uplight || (uplight = {}));
//# sourceMappingURL=myPuzzle.js.map