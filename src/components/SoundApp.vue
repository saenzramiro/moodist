<template>
  <div id="app" class="sound-app">
    <div v-for="category in categories" :key="category.id" class="category">
      <h3>{{ category.title }}</h3>
      <SoundItem v-for="sound in category.sounds" :key="sound.id" :sound="sound" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SoundItem from './SoundItem.vue';
import { sounds } from '@/data/sounds';

export default defineComponent({
  name: 'SoundApp',
  components: { SoundItem },
  data() {
    return {
      categories: sounds.categories,
    };
  },
});
</script>

<style scoped>
.category {
  margin-bottom: 24px;
}
</style>
