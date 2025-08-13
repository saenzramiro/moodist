<template>
  <div class="tool">
    <a-button @click="open = true">Binaural Beats</a-button>
    <BinauralModal v-model:modelValue="open" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Button } from 'ant-design-vue';
import BinauralModal from './BinauralModal.vue';

export default defineComponent({
  name: 'BinauralBeats',
  components: { AButton: Button, BinauralModal },
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
