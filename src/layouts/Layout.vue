<template>
  <div>
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue';

export default defineComponent({
  name: 'Layout',
  props: {
    title: {
      type: String,
      default: 'Moodist: Ambient Sounds for Focus and Calm',
    },
    description: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    watch(
      () => props.title,
      t => {
        if (t) document.title = t;
      },
      { immediate: true },
    );
    return {};
  },
});
</script>
