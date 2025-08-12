<template>
  <div class="sound-item">
    <span>{{ sound.label }}</span>
    <a-button type="primary" size="small" @click="toggle">
      {{ playing ? 'Pause' : 'Play' }}
    </a-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Howl } from 'howler';
import type { Sound } from '@/data/types';
import { Button } from 'ant-design-vue';

export default defineComponent({
  name: 'SoundItem',
  components: { AButton: Button },
  props: {
    sound: {
      type: Object as () => Sound,
      required: true,
    },
  },
  data() {
    return {
      playing: false as boolean,
      howl: null as Howl | null,
    };
  },
  mounted() {
    this.howl = new Howl({ src: [this.sound.src], loop: true });
  },
  beforeUnmount() {
    this.howl?.unload();
  },
  methods: {
    toggle() {
      if (!this.howl) return;
      if (this.playing) {
        this.howl.pause();
      } else {
        this.howl.play();
      }
      this.playing = !this.playing;
    },
  },
});
</script>

<style scoped>
.sound-item {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}
</style>
