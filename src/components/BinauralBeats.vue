<template>
  <div class="tool">
    <a-button @click="open = true">Binaural Beats</a-button>
    <FrequencyModal v-model:modelValue="open" mode="binaural" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Button } from 'ant-design-vue';
import FrequencyModal from './FrequencyModal.vue';

export default defineComponent({
  name: 'BinauralBeats',
  components: { AButton: Button, FrequencyModal },
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
