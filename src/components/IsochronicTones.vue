<template>
  <div class="isochronic">
    <h3>Isochronic Tones</h3>
    <div class="controls">
      <span>Carrier: </span>
      <a-slider v-model:value="carrier" :min="100" :max="1000" />
      <span>Beat: </span>
      <a-slider v-model:value="beat" :min="1" :max="40" />
      <a-button @click="toggle">{{ playing ? 'Stop' : 'Play' }}</a-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Slider, Button } from 'ant-design-vue';

export default defineComponent({
  name: 'IsochronicTones',
  components: { ASlider: Slider, AButton: Button },
  data() {
    return {
      carrier: 200,
      beat: 10,
      ctx: null as AudioContext | null,
      osc: null as OscillatorNode | null,
      mod: null as OscillatorNode | null,
      gain: null as GainNode | null,
      playing: false,
    };
  },
  methods: {
    start() {
      this.ctx = new AudioContext();
      this.osc = this.ctx.createOscillator();
      this.osc.frequency.value = this.carrier;
      this.gain = this.ctx.createGain();
      this.mod = this.ctx.createOscillator();
      this.mod.type = 'square';
      this.mod.frequency.value = this.beat;
      const modGain = this.ctx.createGain();
      modGain.gain.value = 0.5;
      this.mod.connect(modGain).connect(this.gain.gain);
      this.osc.connect(this.gain).connect(this.ctx.destination);
      this.osc.start();
      this.mod.start();
      this.playing = true;
    },
    stop() {
      this.osc?.stop();
      this.mod?.stop();
      this.ctx?.close();
      this.osc = this.mod = null;
      this.ctx = null;
      this.playing = false;
    },
    toggle() {
      if (this.playing) this.stop();
      else this.start();
    },
  },
  watch: {
    carrier(val: number) {
      if (this.osc) this.osc.frequency.value = val;
    },
    beat(val: number) {
      if (this.mod) this.mod.frequency.value = val;
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
