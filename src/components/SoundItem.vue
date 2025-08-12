<template>
  <a-card class="sound-card" :class="{ active }" hoverable @click="toggleActive">
    <a-button class="favorite-btn" type="text" @click.stop="toggleFavorite">
      {{ isFavorite ? '♥' : '♡' }}
    </a-button>
    <div class="sound-icon">
      <component v-if="sound.icon" :is="sound.icon" />
      <span v-else>🔊</span>
    </div>
    <div class="label">{{ sound.label }}</div>
    <a-slider v-model:value="volume" :disabled="!active" @click.stop />
  </a-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { Sound } from '@/data/types';
import { Card, Slider, Button } from 'ant-design-vue';
import { useFavoriteStore } from '@/stores/favorites';
import { usePlaybackStore } from '@/stores/playback';

export default defineComponent({
  name: 'SoundItem',
  components: { ACard: Card, ASlider: Slider, AButton: Button },
  props: {
    sound: {
      type: Object as () => Sound,
      required: true,
    },
  },
  data() {
    return {
      favorites: useFavoriteStore(),
      playback: usePlaybackStore(),
    };
  },
  computed: {
    isFavorite(): boolean {
      return this.favorites.isFavorite(this.sound.id);
    },
    active(): boolean {
      return this.playback.isActive(this.sound.id);
    },
    volume: {
      get(): number {
        return this.playback.getVolume(this.sound.id) * 100;
      },
      set(val: number) {
        this.playback.setVolume(this.sound.id, val / 100);
      },
    },
  },
  methods: {
    toggleFavorite() {
      this.favorites.toggle(this.sound);
    },
    toggleActive() {
      this.playback.toggleSound(this.sound);
    },
  },
});
</script>

<style scoped>
.sound-card {
  text-align: center;
  position: relative;
}

.sound-card.active {
  border: 2px solid #1890ff;
}

.favorite-btn {
  position: absolute;
  top: 4px;
  right: 4px;
}

.sound-icon {
  font-size: 24px;
  margin-bottom: 8px;
}

.label {
  margin-bottom: 8px;
}
</style>
