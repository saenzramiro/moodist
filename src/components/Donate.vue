<template>
  <Container>
    <section class="wrapper">
      <p class="text">
        Enjoy Moodist?
        <a href="https://buymeacoffee.com/remvze" target="_blank" rel="noreferrer">
          Support with a donation!
        </a>
      </p>
    </section>
  </Container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Container from '@/components/Container.vue';

export default defineComponent({
  name: 'Donate',
  components: { Container },
});
</script>

<style scoped>
.wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 16px;
  font-size: var(--font-xsm);
  color: var(--color-foreground-subtle);
}
.wrapper::after {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 80%;
  height: 1px;
  content: '';
  background: linear-gradient(90deg, transparent, var(--color-neutral-400), transparent);
  transform: translateX(-50%);
}
.wrapper .text {
  text-align: center;
}
.wrapper .text a {
  font-weight: 500;
  color: var(--color-foreground);
  text-decoration: none;
}
</style>
