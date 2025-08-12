<template>
  <footer class="footer">
    <Container>
      <p>
        Created by <a href="https://twitter.com/remvze">Maze ✦</a>
      </p>
    </Container>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Container from '@/components/Container.vue';

export default defineComponent({
  name: 'Footer',
  components: { Container },
});
</script>

<style scoped>
.footer {
  display: flex;
  align-items: center;
  height: 100px;
}
.footer p {
  font-size: var(--font-sm);
  color: var(--color-foreground-subtle);
  text-align: center;
}
.footer p a {
  font-weight: 500;
  color: var(--color-foreground);
  text-decoration: none;
}
</style>
