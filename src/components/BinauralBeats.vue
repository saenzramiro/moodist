<template>
  <div class="binaural">
    <h3>Binaural Beats</h3>
    <div class="controls">
      <span>Base: </span>
      <a-slider v-model:value="base" :min="100" :max="1000" />
      <span>Beat: </span>
      <a-slider v-model:value="beat" :min="1" :max="40" />
      <a-button @click="toggle">{{ playing ? 'Stop' : 'Play' }}</a-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue';
import { Slider, Button } from 'ant-design-vue';

export default defineComponent({
  name: 'BinauralBeats',
  components: { ASlider: Slider, AButton: Button },
  data() {
    return {
      base: 200,
      beat: 5,
      ctx: null as AudioContext | null,
      oscL: null as OscillatorNode | null,
      oscR: null as OscillatorNode | null,
      playing: false,
    };
  },
  methods: {
    start() {
      this.ctx = new AudioContext();
      const merger = this.ctx.createChannelMerger(2);
      this.oscL = this.ctx.createOscillator();
      this.oscR = this.ctx.createOscillator();
      this.oscL.frequency.value = this.base - this.beat / 2;
      this.oscR.frequency.value = this.base + this.beat / 2;
      this.oscL.connect(merger, 0, 0);
      this.oscR.connect(merger, 0, 1);
      merger.connect(this.ctx.destination);
      this.oscL.start();
      this.oscR.start();
      this.playing = true;
    },
    stop() {
      this.oscL?.stop();
      this.oscR?.stop();
      this.ctx?.close();
      this.oscL = this.oscR = null;
      this.ctx = null;
      this.playing = false;
    },
    toggle() {
      if (this.playing) this.stop();
      else this.start();
    },
  },
  watch: {
    base(val: number) {
      if (this.oscL && this.oscR) {
        this.oscL.frequency.value = val - this.beat / 2;
        this.oscR.frequency.value = val + this.beat / 2;
      }
    },
    beat(val: number) {
      if (this.oscL && this.oscR) {
        this.oscL.frequency.value = this.base - val / 2;
        this.oscR.frequency.value = this.base + val / 2;
      }
    },
  },
});
</script>

<style scoped>
.controls {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
