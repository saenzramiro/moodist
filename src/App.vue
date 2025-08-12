<template>
  <div>
    <SoundApp />
    <PomodoroTimer />
    <BreathingExercise />
    <BinauralBeats />
    <IsochronicTones />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SoundApp from '@/components/SoundApp.vue';
import PomodoroTimer from '@/components/PomodoroTimer.vue';
import BreathingExercise from '@/components/BreathingExercise.vue';
import BinauralBeats from '@/components/BinauralBeats.vue';
import IsochronicTones from '@/components/IsochronicTones.vue';

export default defineComponent({
  name: 'App',
  components: {
    SoundApp,
    PomodoroTimer,
    BreathingExercise,
    BinauralBeats,
    IsochronicTones,
  },
  mounted() {
    document.title = 'Moodist: Ambient Sounds for Focus and Calm';
  },
});
</script>
