<template>
  <Layout title="Moodist: Ambient Sounds for Focus and Calm">
    <Donate />
    <Hero />
    <SoundApp />
    <About />
    <Source />
    <Footer />
  </Layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Layout from '@/layouts/Layout.vue';
import Donate from '@/components/Donate.vue';
import Hero from '@/components/Hero.vue';
import SoundApp from '@/components/SoundApp.vue';
import About from '@/components/About.vue';
import Source from '@/components/Source.vue';
import Footer from '@/components/Footer.vue';

export default defineComponent({
  name: 'HomePage',
  components: {
    Layout,
    Donate,
    Hero,
    SoundApp,
    About,
    Source,
    Footer,
  },
});
</script>
