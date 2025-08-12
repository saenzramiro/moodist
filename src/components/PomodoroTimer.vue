<template>
  <a-card class="pomodoro">
    <div class="tabs">
      <a-radio-group v-model:value="selectedTab">
        <a-radio-button value="pomodoro">Pomodoro</a-radio-button>
        <a-radio-button value="short">Break</a-radio-button>
        <a-radio-button value="long">Long Break</a-radio-button>
      </a-radio-group>
    </div>
    <div class="timer">{{ minutes }}:{{ seconds }}</div>
    <div class="controls">
      <a-button @click="restart" type="text">↺</a-button>
      <a-button @click="toggle">{{ running ? 'Pause' : 'Start' }}</a-button>
    </div>
    <div class="info">
      <span>Sessions: {{ sessions }}</span>
      <a-button type="link" size="small" @click="showSettings = true">Change times</a-button>
    </div>
    <a-modal v-model:open="showSettings" title="Change times" @ok="applySettings">
      <div class="settings">
        <label>Pomodoro (min)</label>
        <a-input-number v-model:value="form.pomodoro" :min="1" />
        <label>Break (min)</label>
        <a-input-number v-model:value="form.short" :min="1" />
        <label>Long Break (min)</label>
        <a-input-number v-model:value="form.long" :min="1" />
      </div>
    </a-modal>
  </a-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Card, Button, Radio, Modal, InputNumber } from 'ant-design-vue';

export default defineComponent({
  name: 'PomodoroTimer',
  components: {
    ACard: Card,
    AButton: Button,
    ARadioGroup: Radio.Group,
    ARadioButton: Radio.Button,
    AModal: Modal,
    AInputNumber: InputNumber,
  },
  data() {
    return {
      running: false,
      selectedTab: 'pomodoro',
      times: {
        pomodoro: 25 * 60,
        short: 5 * 60,
        long: 15 * 60,
      } as Record<string, number>,
      timer: 25 * 60,
      interval: null as number | null,
      sessions: 0,
      showSettings: false,
      form: { pomodoro: 25, short: 5, long: 15 },
    };
  },
  computed: {
    minutes(): string {
      return String(Math.floor(this.timer / 60)).padStart(2, '0');
    },
    seconds(): string {
      return String(this.timer % 60).padStart(2, '0');
    },
  },
  watch: {
    selectedTab() {
      this.restart();
    },
  },
  methods: {
    tick() {
      this.timer -= 1;
      if (this.timer <= 0) {
        if (this.selectedTab === 'pomodoro') this.sessions += 1;
        this.running = false;
        if (this.interval) clearInterval(this.interval);
      }
    },
    toggle() {
      if (this.running) {
        this.running = false;
        if (this.interval) clearInterval(this.interval);
      } else {
        this.running = true;
        this.interval = setInterval(this.tick, 1000) as unknown as number;
      }
    },
    restart() {
      if (this.interval) clearInterval(this.interval);
      this.timer = this.times[this.selectedTab];
      this.running = false;
    },
    applySettings() {
      this.times.pomodoro = this.form.pomodoro * 60;
      this.times.short = this.form.short * 60;
      this.times.long = this.form.long * 60;
      this.showSettings = false;
      this.restart();
    },
  },
  beforeUnmount() {
    if (this.interval) clearInterval(this.interval);
  },
});
</script>

<style scoped>
.pomodoro {
  max-width: 300px;
  margin: 16px auto;
  text-align: center;
}
.tabs {
  margin-bottom: 8px;
}
.timer {
  font-size: 32px;
  margin: 16px 0;
}
.controls {
  display: flex;
  justify-content: center;
  gap: 8px;
}

.info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
}

.settings {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
