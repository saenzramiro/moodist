<template>
  <div class="presets">
    <h3>Presets</h3>
    <a-list :data-source="presetStore.presets">
      <template #renderItem="{ item }">
        <a-list-item>
          <span>{{ item.name }}</span>
          <a-button type="link" @click="apply(item)">Apply</a-button>
        </a-list-item>
      </template>
    </a-list>
    <div class="save">
      <a-input v-model:value="name" placeholder="Preset name" class="input" />
      <a-button @click="save" :disabled="!name">Save</a-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { List, Button, Input } from 'ant-design-vue';
import { usePresetStore } from '@/stores/presets';
import { usePlaybackStore } from '@/stores/playback';
import { sounds } from '@/data/sounds';

export default defineComponent({
  name: 'Presets',
  components: { AList: List, AButton: Button, AInput: Input, AListItem: List.Item },
  data() {
    return {
      name: '',
      presetStore: usePresetStore(),
      playback: usePlaybackStore(),
    };
  },
  methods: {
    findSound(id: string) {
      for (const cat of sounds.categories) {
        const sound = cat.sounds.find(s => s.id === id);
        if (sound) return sound;
      }
      return null;
    },
    apply(preset: { name: string; sounds: string[] }) {
      this.playback.clear();
      preset.sounds.forEach(id => {
        const sound = this.findSound(id);
        if (sound) this.playback.toggleSound(sound);
      });
      this.playback.playAll();
    },
    save() {
      const ids = Object.keys(this.playback.active);
      if (ids.length && this.name) {
        this.presetStore.savePreset(this.name, ids);
        this.name = '';
      }
    },
  },
});
</script>

<style scoped>
.presets {
  margin-bottom: 24px;
}
.save {
  display: flex;
  gap: 8px;
  margin-top: 8px;
}
.input {
  max-width: 200px;
}
</style>
