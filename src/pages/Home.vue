<template>
  <Layout title="Moodist: Ambient Sounds for Focus and Calm">
    <SoundApp />
    <PomodoroTimer />
    <BreathingExercise />
    <BinauralBeats />
    <IsochronicTones />
  </Layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Layout from '@/layouts/Layout.vue';
import SoundApp from '@/components/SoundApp.vue';
import PomodoroTimer from '@/components/PomodoroTimer.vue';
import BreathingExercise from '@/components/BreathingExercise.vue';
import BinauralBeats from '@/components/BinauralBeats.vue';
import IsochronicTones from '@/components/IsochronicTones.vue';

export default defineComponent({
  name: 'HomePage',
  components: {
    Layout,
    SoundApp,
    PomodoroTimer,
    BreathingExercise,
    BinauralBeats,
    IsochronicTones,
  },
});
</script>
