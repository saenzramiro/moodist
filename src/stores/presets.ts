import { defineStore } from 'pinia';

interface Preset {
  name: string;
  sounds: string[];
}

const defaultPresets: Preset[] = [
  {
    name: 'Productivity',
    sounds: ['brown-noise', 'keyboard', 'rain-on-window', 'cafe'],
  },
  {
    name: 'Relax',
    sounds: ['waves', 'wind-chimes', 'binaural-delta'],
  },
  {
    name: 'Motivation',
    sounds: ['fireworks', 'crowd', 'binaural-beta'],
  },
  {
    name: 'Creative Thinking',
    sounds: ['white-noise', 'rain-on-tent', 'binaural-theta'],
  },
  {
    name: 'Writing',
    sounds: ['typewriter', 'light-rain', 'binaural-alpha'],
  },
  {
    name: 'Beautiful Ambients',
    sounds: ['jungle', 'owl', 'whale', 'wind'],
  },
];

export const usePresetStore = defineStore('presets', {
  actions: {
    savePreset(name: string, sounds: string[]) {
      this.userPresets.push({ name, sounds });
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('presets', JSON.stringify(this.userPresets));
      }
    },
  },
  getters: {
    presets(state): Preset[] {
      return [...defaultPresets, ...state.userPresets];
    },
  },
  state: () => ({
    userPresets:
      typeof localStorage !== 'undefined'
        ? (JSON.parse(localStorage.getItem('presets') || '[]') as Preset[])
        : ([] as Preset[]),
  }),
});

export type { Preset };
export { defaultPresets };
