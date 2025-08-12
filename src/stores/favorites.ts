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
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('favorites', JSON.stringify(this.favorites));
      }
    },
  },
  state: () => ({
    favorites:
      typeof localStorage !== 'undefined'
        ? (JSON.parse(localStorage.getItem('favorites') || '[]') as Sound[])
        : ([] as Sound[]),
  }),
});
