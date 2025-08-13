<template>
  <a-modal
    v-model:visible="visible"
    title="Binaural Beats"
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
import { defineComponent } from 'vue';
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
  name: 'BinauralModal',
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
      gain: null as GainNode | null,
      playing: false,
    };
  },
  computed: {
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
    handleCancel() {
      this.visible = false;
    },
  },
});
</script>

