<template>
  <a-card class="breathing">
    <div class="exercise">
      <div class="timer">{{ minutes }}:{{ seconds }}</div>
      <div class="circle" :class="currentPhase">{{ phaseLabel }}</div>
    </div>
    <div class="select">
      <select v-model="selectedExercise">
        <option v-for="(value, key) in exerciseOptions" :key="key">{{ key }}</option>
      </select>
    </div>
    <div class="controls">
      <a-button @click="toggle">{{ running ? 'Stop' : 'Start' }}</a-button>
    </div>
  </a-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Card, Button } from 'ant-design-vue';

const EXERCISE_PHASES = {
  '4-7-8 Breathing': ['inhale', 'holdInhale', 'exhale'],
  'Box Breathing': ['inhale', 'holdInhale', 'exhale', 'holdExhale'],
  'Resonant Breathing': ['inhale', 'exhale'],
} as Record<string, string[]>;

const EXERCISE_DURATIONS = {
  '4-7-8 Breathing': { inhale: 4, holdInhale: 7, exhale: 8 },
  'Box Breathing': { inhale: 4, holdInhale: 4, exhale: 4, holdExhale: 4 },
  'Resonant Breathing': { inhale: 5, exhale: 5 },
} as Record<string, Record<string, number>>;

const PHASE_LABELS: Record<string, string> = {
  inhale: 'Inhale',
  exhale: 'Exhale',
  holdInhale: 'Hold',
  holdExhale: 'Hold',
};

export default defineComponent({
  name: 'BreathingExercise',
  components: { ACard: Card, AButton: Button },
  data() {
    return {
      selectedExercise: '4-7-8 Breathing',
      phaseIndex: 0,
      timer: 0,
      phaseTimeout: null as number | null,
      timerInterval: null as number | null,
      running: false,
    };
  },
  computed: {
    exerciseOptions() {
      return EXERCISE_PHASES;
    },
    phases(): string[] {
      return EXERCISE_PHASES[this.selectedExercise];
    },
    durations(): Record<string, number> {
      return EXERCISE_DURATIONS[this.selectedExercise];
    },
    currentPhase(): string {
      return this.phases[this.phaseIndex];
    },
    phaseLabel(): string {
      return PHASE_LABELS[this.currentPhase];
    },
    minutes(): string {
      return String(Math.floor(this.timer / 60)).padStart(2, '0');
    },
    seconds(): string {
      return String(this.timer % 60).padStart(2, '0');
    },
  },
  watch: {
    selectedExercise() {
      this.phaseIndex = 0;
      if (this.running) this.schedulePhase();
    },
  },
  beforeUnmount() {
    if (this.phaseTimeout) clearTimeout(this.phaseTimeout);
    if (this.timerInterval) clearInterval(this.timerInterval);
  },
  methods: {
    schedulePhase() {
      if (this.phaseTimeout) clearTimeout(this.phaseTimeout);
      const duration = (this.durations[this.currentPhase] || 4) * 1000;
      this.phaseTimeout = setTimeout(() => {
        this.phaseIndex = (this.phaseIndex + 1) % this.phases.length;
        this.schedulePhase();
      }, duration) as unknown as number;
    },
    start() {
      this.running = true;
      this.timer = 0;
      this.phaseIndex = 0;
      this.schedulePhase();
      this.timerInterval = setInterval(() => {
        this.timer += 1;
      }, 1000) as unknown as number;
    },
    stop() {
      this.running = false;
      if (this.phaseTimeout) clearTimeout(this.phaseTimeout);
      if (this.timerInterval) clearInterval(this.timerInterval);
      this.phaseTimeout = null;
      this.timerInterval = null;
      this.timer = 0;
      this.phaseIndex = 0;
    },
    toggle() {
      if (this.running) this.stop();
      else this.start();
    },
  },
});
</script>

<style scoped>
.breathing {
  max-width: 300px;
  margin: 16px auto;
  text-align: center;
}
.circle {
  width: 120px;
  height: 120px;
  margin: 16px auto;
  border-radius: 50%;
  background: #1890ff;
  transform: scale(1);
  transition: transform 1s linear;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 16px;
}
.circle.inhale,
.circle.holdInhale {
  transform: scale(1.5);
}
.circle.exhale,
.circle.holdExhale {
  transform: scale(1);
}
.timer {
  font-size: 24px;
  margin-bottom: 8px;
}
.select {
  margin-top: 16px;
}
.controls {
  margin-top: 16px;
}
</style>
