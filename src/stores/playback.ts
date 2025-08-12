import { defineStore } from 'pinia';
import { Howl, Howler } from 'howler';
import type { Sound } from '@/data/types';

interface ActiveSound {
  howl: Howl;
  volume: number; // 0-1
}

export const usePlaybackStore = defineStore('playback', {
  actions: {
    clear() {
      Object.values(this.active).forEach(e => e.howl.stop());
      this.active = {};
      this.playing = false;
    },
    getVolume(id: string) {
      return this.active[id]?.volume ?? 0;
    },
    isActive(id: string) {
      return id in this.active;
    },
    pauseAll() {
      this.playing = false;
      Object.values(this.active).forEach(e => e.howl.pause());
    },
    playAll() {
      this.playing = true;
      Object.values(this.active).forEach(e => {
        if (!e.howl.playing()) e.howl.play();
        e.howl.volume(e.volume * this.globalVolume);
      });
    },
    setGlobalVolume(value: number) {
      this.globalVolume = value;
      Howler.volume(value);
      Object.values(this.active).forEach(e => {
        e.howl.volume(e.volume * this.globalVolume);
      });
    },
    setVolume(id: string, value: number) {
      const entry = this.active[id];
      if (!entry) return;
      if (value === 0) {
        entry.howl.stop();
        delete this.active[id];
        if (Object.keys(this.active).length === 0) this.playing = false;
        return;
      }
      entry.volume = value;
      entry.howl.volume(value * this.globalVolume);
      if (this.playing && !entry.howl.playing()) entry.howl.play();
    },
    toggleSound(sound: Sound) {
      const entry = this.active[sound.id];
      if (entry) {
        entry.howl.stop();
        delete this.active[sound.id];
        if (Object.keys(this.active).length === 0) this.playing = false;
        return;
      }
      const hadActive = Object.keys(this.active).length > 0;
      const howl = new Howl({
        loop: true,
        src: [sound.src],
        volume: 0.5 * this.globalVolume,
      });
      this.active[sound.id] = { howl, volume: 0.5 };
      if (this.playing || !hadActive) {
        this.playing = true;
        howl.play();
      }
    },
  },
  state: () => ({
    active: {} as Record<string, ActiveSound>,
    globalVolume: 1,
    playing: false,
  }),
});
