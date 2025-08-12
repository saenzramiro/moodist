<template>
  <Layout title="Moodist: Ambient Sounds for Focus and Calm">
    <Hero />
    <SoundApp />
    <PomodoroTimer />
    <BreathingExercise />
    <About />
    <Source />
    <Footer />
  </Layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Layout from '@/layouts/Layout.vue';
import Hero from '@/components/Hero.vue';
import SoundApp from '@/components/SoundApp.vue';
import PomodoroTimer from '@/components/PomodoroTimer.vue';
import BreathingExercise from '@/components/BreathingExercise.vue';
import About from '@/components/About.vue';
import Source from '@/components/Source.vue';
import Footer from '@/components/Footer.vue';

export default defineComponent({
  name: 'HomePage',
  components: {
    Layout,
    Hero,
    SoundApp,
    PomodoroTimer,
    BreathingExercise,
    About,
    Source,
    Footer,
  },
});
</script>
