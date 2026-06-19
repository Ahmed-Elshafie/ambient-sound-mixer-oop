"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Timer = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Timer =
/*#__PURE__*/
function () {
  function Timer(onComplete, onTick) {
    _classCallCheck(this, Timer);

    this.duration = 0;
    this.remaining = 0;
    this.intervalId = null;
    this.onComplete = onComplete;
    this.onTick = onTick;
    this.isRunning = false;
  } // Start timer with duration in minutes


  _createClass(Timer, [{
    key: "start",
    value: function start(minutes) {
      var _this = this;

      if (minutes <= 0) {
        this.stop();
        return;
      }

      this.duration = minutes * 60; // Convert to seconds

      this.remaining = this.duration;
      this.isRunning = true; // Clear any existing interval

      if (this.intervalId) {
        clearInterval(this.intervalId);
      } // Update display


      this.updateDisplay(); // Start countdown

      this.intervalId = setInterval(function () {
        _this.remaining--;

        _this.updateDisplay();

        if (_this.remaining <= 0) {
          _this.complete();
        }
      }, 1000);
    } // Stop timer

  }, {
    key: "stop",
    value: function stop() {
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }

      this.duration = 0;
      this.remaining = 0;
      this.isRunning = false;
      this.updateDisplay();
    } // Timer completed

  }, {
    key: "complete",
    value: function complete() {
      this.stop();

      if (this.onComplete) {
        this.onComplete();
      }
    } // Update display

  }, {
    key: "updateDisplay",
    value: function updateDisplay() {
      var minutes = Math.floor(this.remaining / 60);
      var seconds = this.remaining % 60;

      if (this.onTick) {
        this.onTick(minutes, seconds);
      }
    }
  }]);

  return Timer;
}();

exports.Timer = Timer;