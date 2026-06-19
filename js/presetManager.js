export class PresetManager {
  constructor() {
    this.customPresets = this.loadCustomPresets();
  }
  // Load presets from localStorage
  loadCustomPresets() {
    const stored = localStorage.getItem('ambientMixerPresets');
    return stored ? JSON.parse(stored) : {};
  }

  // Load custom preset by ID
  loadPreset(presetID) {
    return this.customPresets[presetID] || null;
  }

  // Save custom presets to localStorage
  saveCustomPresets() {
    localStorage.setItem(
      'ambientMixerPresets',
      JSON.stringify(this.customPresets),
    );
  }

  // Save current mix as preset
  savePreset(name, soundStates) {
    const presetId = `custom-${Date.now()}`;

    // Create preset object with only active sounds
    const preset = {
      name,
      sounds: {},
    };

    for (const [soundId, volume] of Object.entries(soundStates)) {
      if (volume > 0) {
        preset.sounds[soundId] = volume;
      }
    }

    this.customPresets[presetId] = preset;
    this.saveCustomPresets();

    return presetId;
  }

  // Check if preset name already exists
  presetNameExists(name) {
    return Object.values(this.customPresets).some(
      (preset) => preset.name === name,
    );
  }

  // Delete custom preset
  deletePreset(presetId) {
    if (this.customPresets[presetId]) {
      delete this.customPresets[presetId];
      this.saveCustomPresets();
      return true;
    }
    return false;
  }
}
