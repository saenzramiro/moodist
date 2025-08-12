<template>
  <span>{{ binary }}</span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { generateRandomBinaryString } from '@/helpers/binary';

export default defineComponent({
  name: 'Binary',
  data() {
    return { binary: generateRandomBinaryString(1000) };
  },
});
</script>
