<template>
  <div :class="classes">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'Container',
  props: {
    tight: {
      type: Boolean,
      default: false,
    },
    wide: {
      type: Boolean,
      default: false,
    },
    className: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const classes = computed(() => [
      'container',
      props.className,
      { tight: props.tight, wide: props.wide },
    ]);

    return { classes };
  },
});
</script>

<style scoped>
.container {
  width: 90%;
  max-width: 600px;
  margin: 0 auto;
}
.container.tight {
  max-width: 450px;
}
.container.wide {
  max-width: 760px;
}
</style>
