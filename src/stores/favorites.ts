import { defineStore } from 'pinia';
import type { Sound } from '@/data/types';

export const useFavoriteStore = defineStore('favorites', {
  actions: {
    isFavorite(id: string) {
      return this.favorites.some(s => s.id === id);
    },
    toggle(sound: Sound) {
      const index = this.favorites.findIndex(s => s.id === sound.id);
      if (index >= 0) {
        this.favorites.splice(index, 1);
      } else {
        this.favorites.push(sound);
      }
    },
  },
  state: () => ({
    favorites: [] as Sound[],
  }),
});
