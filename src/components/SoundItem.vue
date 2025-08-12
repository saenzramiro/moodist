<template>
  <a-card class="sound-card" hoverable>
    <div class="sound-icon">
      <component v-if="sound.icon" :is="sound.icon" />
      <span v-else>🔊</span>
    </div>
    <div class="label">{{ sound.label }}</div>
    <a-slider v-model:value="volume" @change="handleVolume" />
  </a-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Howl } from 'howler';
import type { Sound } from '@/data/types';
import { Card, Slider } from 'ant-design-vue';

export default defineComponent({
  name: 'SoundItem',
  components: { ACard: Card, ASlider: Slider },
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
    };
  },
  mounted() {
    this.howl = new Howl({ src: [this.sound.src], loop: true, volume: 0 });
  },
  beforeUnmount() {
    this.howl?.unload();
  },
  methods: {
    handleVolume(value: number) {
      if (!this.howl) return;
      this.volume = value;
      if (value === 0) {
        this.howl.stop();
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
}

.sound-icon {
  font-size: 24px;
  margin-bottom: 8px;
}

.label {
  margin-bottom: 8px;
}
</style>
