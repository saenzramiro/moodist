<template>
  <a-modal
    v-model:visible="visible"
    :title="title"
    @cancel="handleCancel"
    :footer="null"
  >
    <a-form layout="vertical">
      <a-form-item label="Preset">
        <a-select v-model:value="presetKey" @change="applyPreset">
          <a-select-option v-for="p in presets" :key="p.label" :value="p.label">
            {{ p.label }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="Base frequency">
        <a-input-number v-model:value="base" :min="100" :max="1000" />
      </a-form-item>
      <a-form-item label="Beat frequency">
        <a-input-number v-model:value="beat" :min="1" :max="40" />
      </a-form-item>
      <a-form-item label="Volume">
        <a-slider v-model:value="volume" :min="0" :max="100" />
      </a-form-item>
      <div style="text-align: center;">
        <a-button type="primary" @click="toggle">
          {{ playing ? 'Stop' : 'Play' }}
        </a-button>
      </div>
    </a-form>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Modal, Select, InputNumber, Slider, Button, Form } from 'ant-design-vue';

interface Preset {
  label: string;
  base: number;
  beat: number;
}

const presetList: Preset[] = [
  { label: 'Delta (3 Hz)', base: 200, beat: 3 },
  { label: 'Theta (6 Hz)', base: 200, beat: 6 },
  { label: 'Alpha (10 Hz)', base: 200, beat: 10 },
  { label: 'Beta (20 Hz)', base: 200, beat: 20 },
  { label: 'Gamma (40 Hz)', base: 200, beat: 40 },
];

export default defineComponent({
  name: 'FrequencyModal',
  components: {
    AModal: Modal,
    ASelect: Select,
    ASelectOption: Select.Option,
    AInputNumber: InputNumber,
    ASlider: Slider,
    AButton: Button,
    AForm: Form,
    AFormItem: Form.Item,
  },
  props: {
    modelValue: { type: Boolean, required: true },
    mode: { type: String as PropType<'binaural' | 'isochronic'>, required: true },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      visible: this.modelValue,
      presetKey: presetList[0].label,
      base: presetList[0].base,
      beat: presetList[0].beat,
      volume: 50,
      ctx: null as AudioContext | null,
      oscL: null as OscillatorNode | null,
      oscR: null as OscillatorNode | null,
      osc: null as OscillatorNode | null,
      mod: null as OscillatorNode | null,
      gain: null as GainNode | null,
      playing: false,
    };
  },
  computed: {
    title(): string {
      return this.mode === 'binaural' ? 'Binaural Beats' : 'Isochronic Tones';
    },
    presets(): Preset[] {
      return presetList;
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
    base(val: number) {
      if (this.mode === 'binaural') {
        if (this.oscL && this.oscR) {
          this.oscL.frequency.value = val - this.beat / 2;
          this.oscR.frequency.value = val + this.beat / 2;
        }
      } else if (this.osc) {
        this.osc.frequency.value = val;
      }
    },
    beat(val: number) {
      if (this.mode === 'binaural') {
        if (this.oscL && this.oscR) {
          this.oscL.frequency.value = this.base - val / 2;
          this.oscR.frequency.value = this.base + val / 2;
        }
      } else if (this.mod) {
        this.mod.frequency.value = val;
      }
    },
    volume(val: number) {
      if (this.gain) {
        this.gain.gain.value = val / 100;
      }
    },
  },
  methods: {
    applyPreset(label: string) {
      const preset = presetList.find(p => p.label === label);
      if (preset) {
        this.base = preset.base;
        this.beat = preset.beat;
      }
    },
    start() {
      this.ctx = new AudioContext();
      this.gain = this.ctx.createGain();
      this.gain.gain.value = this.volume / 100;
      if (this.mode === 'binaural') {
        const merger = this.ctx.createChannelMerger(2);
        this.oscL = this.ctx.createOscillator();
        this.oscR = this.ctx.createOscillator();
        this.oscL.frequency.value = this.base - this.beat / 2;
        this.oscR.frequency.value = this.base + this.beat / 2;
        this.oscL.connect(merger, 0, 0);
        this.oscR.connect(merger, 0, 1);
        merger.connect(this.gain).connect(this.ctx.destination);
        this.oscL.start();
        this.oscR.start();
      } else {
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
      }
      this.playing = true;
    },
    stop() {
      if (this.mode === 'binaural') {
        this.oscL?.stop();
        this.oscR?.stop();
      } else {
        this.osc?.stop();
        this.mod?.stop();
      }
      this.ctx?.close();
      this.oscL = this.oscR = this.osc = this.mod = null;
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

