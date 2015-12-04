var upl;
(function (upl) {
    var Oscillator = (function () {
        function Oscillator(prefix) {
            var _this = this;
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
            this.view.find('[data-id=onoff]').on('click', null, function (evt) {
                return _this.onOnOffClick(evt);
            });

            this.volume = this.view.find('[data-id=volume]').on('input', null, function (evt) {
                return _this.onVolume(evt);
            });
            this.volumeInd = this.view.find('[data-id=volumeind]').text(this.volume.val());
        }
        Oscillator.prototype.onVolume = function (evt) {
            var val = this.volume.val();
            if (this.gain)
                this.gain.gain.value = val;
            this.volumeInd.text(val);
        };
        Oscillator.prototype.createOscillator = function () {
            this.oscillator = this.audioContext.createOscillator();
            this.gain = this.audioContext.createGain();
            this.gain.gain.value = this.volume.val();
            this.onRangeChanged();

            this.gain.connect(this.audioContext.destination);
            this.oscillator.connect(this.gain);
            this.oscillator.start(0);
        };
        Oscillator.prototype.onOnOffClick = function (evt) {
            if ($(evt.currentTarget).is(':checked'))
                this.createOscillator();
            else
                this.oscillator.stop(0);
        };

        Oscillator.prototype.onWavesClick = function (evt) {
            if (!$(evt.currentTarget).is(':checked'))
                return;

            switch ($(evt.currentTarget).data('id')) {
                case 'sin':
                    this.oscillator.type = 'sine';
                    break;
                case 'square':
                    this.oscillator.type = 'square';
                    break;
                case 'triangle':
                    this.oscillator.type = 'triangle';
                    break;
                case 'sawtooth':
                    this.oscillator.type = 'sawtooth';
                    break;
            }
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
})(upl || (upl = {}));
