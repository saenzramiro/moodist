<template>
  <a-modal
    v-model:visible="visible"
    title="Isochronic Tones"
    @cancel="handleCancel"
    :footer="null"
  >
    <a-form layout="vertical">
      <a-form-item label="Preset">
        <a-select v-model:value="presetKey" @change="applyPreset">
          <a-select-option v-for="p in presets" :key="p.name" :value="p.name">
            {{ p.name }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="Volume">
        <a-slider v-model:value="volume" :min="0" :max="100" />
      </a-form-item>
      <div style="text-align: center;">
        <a-button type="primary" @click="toggle">
          {{ playing ? 'Stop' : 'Start' }}
        </a-button>
      </div>
    </a-form>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Modal, Select, Slider, Button, Form } from 'ant-design-vue';

interface Preset {
  name: string;
  baseFrequency: number;
  beatFrequency: number;
}

const presets: Preset[] = [
  { baseFrequency: 100, beatFrequency: 2, name: 'Delta (Deep Sleep) 2 Hz' },
  { baseFrequency: 100, beatFrequency: 5, name: 'Theta (Meditation) 5 Hz' },
  { baseFrequency: 100, beatFrequency: 10, name: 'Alpha (Relaxation) 10 Hz' },
  { baseFrequency: 100, beatFrequency: 20, name: 'Beta (Focus) 20 Hz' },
  { baseFrequency: 100, beatFrequency: 40, name: 'Gamma (Cognition) 40 Hz' },
];

export default defineComponent({
  name: 'IsochronicModal',
  components: {
    AModal: Modal,
    ASelect: Select,
    ASelectOption: Select.Option,
    ASlider: Slider,
    AButton: Button,
    AForm: Form,
    AFormItem: Form.Item,
  },
  props: {
    modelValue: { type: Boolean, required: true },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      visible: this.modelValue,
      presetKey: presets[0].name,
      base: presets[0].baseFrequency,
      beat: presets[0].beatFrequency,
      volume: 50,
      ctx: null as AudioContext | null,
      osc: null as OscillatorNode | null,
      mod: null as OscillatorNode | null,
      gain: null as GainNode | null,
      playing: false,
    };
  },
  computed: {
    presets(): Preset[] {
      return presets;
    },
  },
  watch: {
    modelValue(val: boolean) {
      this.visible = val;
    },
    visible(val: boolean) {
      this.$emit('update:modelValue', val);
      if (!val) this.stop();
    },
    volume(val: number) {
      if (this.gain) this.gain.gain.value = val / 100;
    },
    base(val: number) {
      if (this.osc) this.osc.frequency.value = val;
    },
    beat(val: number) {
      if (this.mod) this.mod.frequency.value = val;
    },
  },
  methods: {
    applyPreset(name: string) {
      const preset = presets.find(p => p.name === name);
      if (preset) {
        this.base = preset.baseFrequency;
        this.beat = preset.beatFrequency;
      }
    },
    start() {
      this.ctx = new AudioContext();
      this.gain = this.ctx.createGain();
      this.gain.gain.value = this.volume / 100;
      this.osc = this.ctx.createOscillator();
      this.osc.frequency.value = this.base;
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
    handleCancel() {
      this.visible = false;
    },
  },
});
</script>

