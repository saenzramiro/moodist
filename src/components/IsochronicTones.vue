<template>
  <div class="tool">
    <a-button @click="open = true">Isochronic Tones</a-button>
    <IsochronicModal v-model:modelValue="open" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Button } from 'ant-design-vue';
import IsochronicModal from './IsochronicModal.vue';

export default defineComponent({
  name: 'IsochronicTones',
  components: { AButton: Button, IsochronicModal },
  data() {
    return { open: false };
  },
});
</script>

<style scoped>
.tool {
  margin: 16px 0;
}
</style>
