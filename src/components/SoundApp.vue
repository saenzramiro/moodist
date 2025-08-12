<template>
  <div id="app" class="sound-app">
    <div class="controls">
      <a-button @click="togglePlay">{{ playing ? 'Pause' : 'Play' }}</a-button>
      <a-button @click="shuffle" type="text">🔀</a-button>
      <a-button @click="clear" type="text">🗑️</a-button>
      <a-slider v-model:value="globalVolume" class="global-slider" @click.stop />
    </div>
    <Presets />
    <div v-if="favoriteSounds.length" class="category">
      <h3>Favorites</h3>
      <a-list :grid="grid" :data-source="favoriteSounds">
        <template #renderItem="{ item }">
          <a-list-item>
            <SoundItem :sound="item" />
          </a-list-item>
        </template>
      </a-list>
    </div>
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
import Presets from './Presets.vue';
import { List, Button, Slider } from 'ant-design-vue';
import { sounds } from '@/data/sounds';
import { useFavoriteStore } from '@/stores/favorites';
import { usePlaybackStore } from '@/stores/playback';

export default defineComponent({
  name: 'SoundApp',
  components: {
    SoundItem,
    Presets,
    AList: List,
    AListItem: List.Item,
    AButton: Button,
    ASlider: Slider,
  },
  data() {
    const favorites = useFavoriteStore();
    const playback = usePlaybackStore();
    return {
      categories: sounds.categories,
      grid: { gutter: 16, xs: 1, sm: 2, md: 3, lg: 4 },
      favorites,
      playback,
    };
  },
  computed: {
    favoriteSounds(): Array<any> {
      return this.favorites.favorites;
    },
    playing(): boolean {
      return this.playback.playing;
    },
    globalVolume: {
      get(): number {
        return this.playback.globalVolume * 100;
      },
      set(val: number) {
        this.playback.setGlobalVolume(val / 100);
      },
    },
  },
  methods: {
    togglePlay() {
      if (this.playing) this.playback.pauseAll();
      else this.playback.playAll();
    },
    clear() {
      this.playback.clear();
    },
    shuffle() {
      const all = this.categories.flatMap((c: any) => c.sounds);
      const favIds = new Set(this.favorites.favorites.map((f: any) => f.id));
      const available = all.filter((s: any) => !favIds.has(s.id));
      this.playback.clear();
      const chosen: any[] = [];
      for (let i = 0; i < 4 && available.length; i++) {
        const idx = Math.floor(Math.random() * available.length);
        chosen.push(available.splice(idx, 1)[0]);
      }
      chosen.forEach(s => this.playback.toggleSound(s));
      this.playback.playAll();
    },
  },
});
</script>

<style scoped>
.category {
  margin-bottom: 24px;
}

.controls {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.global-slider {
  width: 120px;
}
</style>
