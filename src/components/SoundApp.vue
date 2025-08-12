<template>
  <div id="app" class="sound-app">
    <div v-for="category in categories" :key="category.id" class="category">
      <h3>{{ category.title }}</h3>
      <a-list :grid="grid" :data-source="category.sounds">
        <template #renderItem="{ item }">
          <a-list-item>
            <SoundItem :sound="item" />
          </a-list-item>
        </template>
      </a-list>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SoundItem from './SoundItem.vue';
import { List } from 'ant-design-vue';
import { sounds } from '@/data/sounds';

export default defineComponent({
  name: 'SoundApp',
  components: { SoundItem, AList: List, AListItem: List.Item },
  data() {
    return {
      categories: sounds.categories,
      grid: { gutter: 16, xs: 1, sm: 2, md: 3, lg: 4 },
    };
  },
});
</script>

<style scoped>
.category {
  margin-bottom: 24px;
}
</style>
