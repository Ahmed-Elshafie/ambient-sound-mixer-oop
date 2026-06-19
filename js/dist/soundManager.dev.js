"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SoundManager = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SoundManager =
/*#__PURE__*/
function () {
  function SoundManager() {
    _classCallCheck(this, SoundManager);

    this.audioElements = new Map();
    this.isPlaying = false;
  } // Load a sound file


  _createClass(SoundManager, [{
    key: "loadSound",
    value: function loadSound(soundId, filePath) {
      try {
        var audio = new Audio();
        audio.src = filePath;
        audio.loop = true;
        audio.preload = 'metadata'; // Add sound to audio elements map

        this.audioElements.set(soundId, audio);
        return true;
      } catch (error) {
        console.error("Failed to load sound ".concat(soundId));
        return false;
      }
    } // Play a specific sound

  }, {
    key: "playSound",
    value: function playSound(soundId) {
      var audio;
      return regeneratorRuntime.async(function playSound$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              audio = this.audioElements.get(soundId);

              if (!audio) {
                _context.next = 12;
                break;
              }

              _context.prev = 2;
              _context.next = 5;
              return regeneratorRuntime.awrap(audio.play());

            case 5:
              return _context.abrupt("return", true);

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](2);
              console.error("Failed to play ".concat(soundId), _context.t0);
              return _context.abrupt("return", false);

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, null, this, [[2, 8]]);
    } // Pause a specific sound

  }, {
    key: "pauseSound",
    value: function pauseSound(soundId) {
      var audio = this.audioElements.get(soundId);

      if (audio && !audio.paused) {
        audio.pause();
      }
    } // Set volume for a specific sound(0-100)

  }, {
    key: "setVolume",
    value: function setVolume(soundId, volume) {
      var audio = this.audioElements.get(soundId);

      if (!audio) {
        console.error("Sound ".concat(soundId, " not found"));
        return false;
      } // Convert 0-100. to 0-1


      audio.volume = volume / 100;
      return true;
    } // Paly all sounds

  }, {
    key: "playAll",
    value: function playAll() {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.audioElements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _step$value = _slicedToArray(_step.value, 2),
              soundId = _step$value[0],
              audio = _step$value[1];

          if (audio.paused) {
            audio.play();
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      this.isPlaying = true;
    } // Pause all sounds

  }, {
    key: "pauseAll",
    value: function pauseAll() {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.audioElements[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _step2$value = _slicedToArray(_step2.value, 2),
              soundId = _step2$value[0],
              audio = _step2$value[1];

          if (!audio.paused) {
            audio.pause();
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      this.isPlaying = false;
    } // Stop all sounds

  }, {
    key: "stopAll",
    value: function stopAll() {
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this.audioElements[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var _step3$value = _slicedToArray(_step3.value, 2),
              soundId = _step3$value[0],
              audio = _step3$value[1];

          if (!audio.paused) {
            audio.pause();
          }

          audio.currentTime = 0; //Reset to beginning
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
            _iterator3["return"]();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      this.isPlaying = false;
    }
  }]);

  return SoundManager;
}();

exports.SoundManager = SoundManager;