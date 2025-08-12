<template>
  <a-card class="sound-card" hoverable @click="toggleActive">
    <a-button class="favorite-btn" type="text" @click.stop="toggleFavorite">
      {{ isFavorite ? '♥' : '♡' }}
    </a-button>
    <div class="sound-icon">
      <component v-if="sound.icon" :is="sound.icon" />
      <span v-else>🔊</span>
    </div>
    <div class="label">{{ sound.label }}</div>
    <a-slider
      v-model:value="volume"
      @change="handleVolume"
      :disabled="!active"
      @click.stop
    />
  </a-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Howl } from 'howler';
import type { Sound } from '@/data/types';
import { Card, Slider, Button } from 'ant-design-vue';
import { useFavoriteStore } from '@/stores/favorites';

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
      volume: 0 as number,
      howl: null as Howl | null,
      active: false,
      favorites: useFavoriteStore(),
    };
  },
  computed: {
    isFavorite(): boolean {
      return this.favorites.isFavorite(this.sound.id);
    },
  },
  mounted() {
    this.howl = new Howl({ src: [this.sound.src], loop: true, volume: 0 });
  },
  beforeUnmount() {
    this.howl?.unload();
  },
  methods: {
    toggleFavorite() {
      this.favorites.toggle(this.sound);
    },
    toggleActive() {
      if (!this.howl) return;
      if (this.active) {
        this.howl.stop();
        this.active = false;
        this.volume = 0;
      } else {
        this.active = true;
        this.volume = 50;
        this.howl.volume(0.5);
        this.howl.play();
      }
    },
    handleVolume(value: number) {
      if (!this.howl) return;
      this.volume = value;
      if (value === 0) {
        this.howl.stop();
        this.active = false;
      } else {
        this.howl.volume(value / 100);
        if (!this.howl.playing()) this.howl.play();
      }
    },
  },
});
</script>

<style scoped>
.sound-card {
  text-align: center;
  position: relative;
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
