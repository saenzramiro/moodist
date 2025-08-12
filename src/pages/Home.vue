<template>
  <Layout title="Moodist: Ambient Sounds for Focus and Calm">
    <SoundApp />
    <PomodoroTimer />
    <BreathingExercise />
  </Layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Layout from '@/layouts/Layout.vue';
import SoundApp from '@/components/SoundApp.vue';
import PomodoroTimer from '@/components/PomodoroTimer.vue';
import BreathingExercise from '@/components/BreathingExercise.vue';

export default defineComponent({
  name: 'HomePage',
  components: {
    Layout,
    SoundApp,
    PomodoroTimer,
    BreathingExercise,
  },
});
</script>
