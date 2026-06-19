"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UI = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UI =
/*#__PURE__*/
function () {
  function UI() {
    _classCallCheck(this, UI);

    this.soundCardContainer = null;
    this.masterVolumeSlider = null;
    this.masterVolumeValue = null;
    this.playPauseButton = null;
    this.resetButton = null;
    this.modal = null;
    this.customPresetsContainer = null;
    this.timerDisplay = null;
    this.timerSelect = null;
    this.themeToggle = null;
  }

  _createClass(UI, [{
    key: "init",
    value: function init() {
      this.soundCardsContainer = document.querySelector('.grid');
      this.masterVolumeSlider = document.getElementById('masterVolume');
      this.masterVolumeValue = document.getElementById('masterVolumeValue');
      this.playPauseButton = document.getElementById('playPauseAll');
      this.resetButton = document.getElementById('resetAll');
      this.modal = document.getElementById('savePresetModal');
      this.customPresetsContainer = document.getElementById('customPresets');
      this.timerDisplay = document.getElementById('timerDisplay');
      this.timerSelect = document.getElementById('timerSelect');
      this.themeToggle = document.getElementById('themeToggle');
    } // Create sound card HTML

  }, {
    key: "createSoundCard",
    value: function createSoundCard(sound) {
      var card = document.createElement('div');
      card.className = 'sound-card bg-white/10 backdrop-blur-md rounded-2xl p-6 relative overflow-hidden transition-all duration-300';
      card.dataset.sound = sound.id;
      card.innerHTML = " <div class=\"flex flex-col h-full\">\n      <!-- Sound Icon and Name -->\n      <div class=\"flex items-center justify-between mb-4\">\n        <div class=\"flex items-center space-x-3\">\n          <div class=\"sound-icon-wrapper w-12 h-12 rounded-full bg-gradient-to-br ".concat(sound.color, " flex items-center justify-center\">\n            <i class=\"fas ").concat(sound.icon, " text-white text-xl\"></i>\n          </div>\n          <div>\n            <h3 class=\"font-semibold text-lg\">").concat(sound.name, "</h3>\n            <p class=\"text-xs opacity-70\">").concat(sound.description, "</p>\n          </div>\n        </div>\n        <button type=\"button\" class=\"play-btn w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 flex items-center justify-center\" data-sound=\"").concat(sound.id, "\">\n          <i class=\"fas fa-play text-sm\"></i>\n        </button>\n      </div>\n\n      <!-- Volume Control -->\n      <div class=\"flex-1 flex flex-col justify-center\">\n        <div class=\"flex items-center space-x-3\">\n          <i class=\"fas fa-volume-low opacity-50\"></i>\n          <input type=\"range\" class=\"volume-slider flex-1\" min=\"0\" max=\"100\" value=\"0\" data-sound=\"").concat(sound.id, "\">\n          <span class=\"volume-value text-sm w-8 text-right\">0</span>\n        </div>\n\n        <!-- Volume Bar Visualization -->\n        <div class=\"volume-bar mt-3\">\n          <div class=\"volume-bar-fill\" style=\"width: 0%\"></div>\n        </div>\n      </div>\n    </div>");
      return card;
    } // Create custom preset button

  }, {
    key: "createCustomPresetButton",
    value: function createCustomPresetButton(name, presetId) {
      var button = document.createElement('button');
      button.className = 'custom-preset-btn bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-all duration-300 relative group';
      button.dataset.preset = presetId;
      button.innerHTML = "  <i class=\"fas fa-star mr-2 text-yellow-400\"></i>\n    ".concat(name, "\n    <button type=\"button\" class=\"delete-preset absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300\" data-preset=\"").concat(presetId, "\">\n      <i class=\"fas fa-times text-xs text-white\"></i>\n    </button>");
      return button;
    } // Render all sound cards

  }, {
    key: "renderSoundCards",
    value: function renderSoundCards(sounds) {
      var _this = this;

      this.soundCardsContainer.innerHTML = '';
      sounds.forEach(function (sound) {
        var card = _this.createSoundCard(sound);

        _this.soundCardsContainer.appendChild(card);
      });
    } // Update play/pause for individual sound

  }, {
    key: "updateSoundPlayButton",
    value: function updateSoundPlayButton(soundId, isPlaying) {
      var card = document.querySelector("[data-sound=\"".concat(soundId, "\"]"));

      if (card) {
        var playBtn = card.querySelector('.play-btn');
        var icon = playBtn.querySelector('i');

        if (isPlaying) {
          icon.classList.remove('fa-play');
          icon.classList.add('fa-pause');
          card.classList.add('playing');
        } else {
          icon.classList.remove('fa-pause');
          icon.classList.add('fa-play');
          card.classList.remove('playing');
        }
      }
    } // Update volume display for a sound

  }, {
    key: "updateVolumeDisplay",
    value: function updateVolumeDisplay(soundId, volume) {
      var card = document.querySelector("[data-sound=\"".concat(soundId, "\"]"));

      if (card) {
        // Update number display
        var volumeValue = card.querySelector('.volume-value');

        if (volumeValue) {
          volumeValue.textContent = volume;
        } // Update volume bar visual


        var volumeBarFill = card.querySelector('.volume-bar-fill');

        if (volumeBarFill) {
          volumeBarFill.style.width = "".concat(volume, "%");
        } // Update slider position


        var slider = card.querySelector('.volume-slider');

        if (slider) {
          slider.value = volume;
        }
      }
    } // Update main play/pause button

  }, {
    key: "updateMainPlayButton",
    value: function updateMainPlayButton(isPlaying) {
      var icon = this.playPauseButton.querySelector('i');

      if (isPlaying) {
        icon.classList.remove('fa-play');
        icon.classList.add('fa-pause');
      } else {
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
      }
    } // Reset all UI elements to default state

  }, {
    key: "resetUI",
    value: function resetUI() {
      var _this2 = this;

      var sliders = document.querySelectorAll('.volume-slider');
      sliders.forEach(function (slider) {
        slider.value = 0;
        var soundId = slider.dataset.sound;

        _this2.updateVolumeDisplay(soundId, 0);
      }); // Reset all play buttons to play state

      var playButtons = document.querySelectorAll('.play-btn');
      playButtons.forEach(function (btn) {
        var icon = btn.querySelector('i');
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
      }); // Remove playing class from cards

      var cards = document.querySelectorAll('.sound-card');
      cards.forEach(function (card) {
        card.classList.remove('fa-playing');
      }); // Reset main play/pause button

      this.updateMainPlayButton(false); // Reset master volume to 100%

      this.masterVolumeSlider.value = 100;
      this.masterVolumeValue.textContent = '100%';
    } // Show save preset modal

  }, {
    key: "showModal",
    value: function showModal() {
      this.modal.classList.remove('hidden');
      this.modal.classList.add('flex');
      document.getElementById('presetName').focus();
    } // Hide save preset modal

  }, {
    key: "hideModal",
    value: function hideModal() {
      this.modal.classList.add('hidden');
      this.modal.classList.remove('flex');
      document.getElementById('presetName').value = '';
    } // ِAdd custom preset to UI

  }, {
    key: "addCustomPreset",
    value: function addCustomPreset(name, presetId) {
      var button = this.createCustomPresetButton(name, presetId);
      this.customPresetsContainer.appendChild(button);
    } // Highlight active preset

  }, {
    key: "setActivePreset",
    value: function setActivePreset(presetKey) {
      // Remove active class from all buttons
      document.querySelectorAll('.preset-btn, .custom-preset-btn').forEach(function (btn) {
        btn.classList.remove('preset-active');
      }); // Add active class to selected presets

      var activeButton = document.querySelector(".preset-btn[data-preset=\"".concat(presetKey, "\"], .custom-preset-btn[data-preset=\"").concat(presetKey, "\"]"));

      if (activeButton) {
        activeButton.classList.add('preset-active');
      }
    } // Remove custom preset

  }, {
    key: "removeCustomPreset",
    value: function removeCustomPreset(presetId) {
      var button = document.querySelector(".custom-preset-btn[data-preset=\"".concat(presetId, "\"]"));

      if (button) {
        button.remove();
      }
    } // Update Timer display

  }, {
    key: "updateTimerDisplay",
    value: function updateTimerDisplay(minutes, seconds) {
      if (this.timerDisplay) {
        if (minutes > 0 || seconds > 0) {
          var formattedTime = "".concat(minutes.toString().padStart(2, '0'), ":").concat(seconds.toString().padStart(2, '0'));
          this.timerDisplay.textContent = formattedTime;
          this.timerDisplay.classList.remove('hidden');
        } else {
          this.timerDisplay.classList.add('hidden');
        }
      }
    } // Toggle theme

  }, {
    key: "toggleTheme",
    value: function toggleTheme() {
      var body = document.body;
      var icon = this.themeToggle.querySelector('i');

      if (body.classList.contains('light-theme')) {
        body.classList.remove('light-theme');
        icon.classList.replace('fa-moon', 'fa-sun');
      } else {
        body.classList.add('light-theme');
        icon.classList.replace('fa-sun', 'fa-moon');
      }
    }
  }]);

  return UI;
}();

exports.UI = UI;