"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PresetManager = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PresetManager =
/*#__PURE__*/
function () {
  function PresetManager() {
    _classCallCheck(this, PresetManager);

    this.customPresets = this.loadCustomPresets();
  } // Load presets from localStorage


  _createClass(PresetManager, [{
    key: "loadCustomPresets",
    value: function loadCustomPresets() {
      var stored = localStorage.getItem('ambientMixerPresets');
      return stored ? JSON.parse(stored) : {};
    } // Load custom preset by ID

  }, {
    key: "loadPreset",
    value: function loadPreset(presetID) {
      return this.customPresets[presetID] || null;
    } // Save custom presets to localStorage

  }, {
    key: "saveCustomPresets",
    value: function saveCustomPresets() {
      localStorage.setItem('ambientMixerPresets', JSON.stringify(this.customPresets));
    } // Save current mix as preset

  }, {
    key: "savePreset",
    value: function savePreset(name, soundStates) {
      var presetId = "custom-".concat(Date.now()); // Create preset object with only active sounds

      var preset = {
        name: name,
        sounds: {}
      };

      for (var _i = 0, _Object$entries = Object.entries(soundStates); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
            soundId = _Object$entries$_i[0],
            volume = _Object$entries$_i[1];

        if (volume > 0) {
          preset.sounds[soundId] = volume;
        }
      }

      this.customPresets[presetId] = preset;
      this.saveCustomPresets();
      return presetId;
    } // Check if preset name already exists

  }, {
    key: "presetNameExists",
    value: function presetNameExists(name) {
      return Object.values(this.customPresets).some(function (preset) {
        return preset.name === name;
      });
    } // Delete custom preset

  }, {
    key: "deletePreset",
    value: function deletePreset(presetId) {
      if (this.customPresets[presetId]) {
        delete this.customPresets[presetId];
        this.saveCustomPresets();
        return true;
      }

      return false;
    }
  }]);

  return PresetManager;
}();

exports.PresetManager = PresetManager;