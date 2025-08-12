<template>
  <div class="source">
    <Container>
      <div class="wrapper">
        <div class="iconContainer">
          <div class="tail"></div>
          <div class="icon">GH</div>
        </div>

        <h2 class="title"><span>Open Source</span></h2>
        <p class="desc">Moodist is free and open-source!</p>

        <div class="button">
          <a href="https://github.com/remvze/moodist" target="_blank" rel="noreferrer" class="special">Source Code</a>
        </div>

        <div class="binary"><Binary /></div>
      </div>
    </Container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Container from '@/components/Container.vue';
import Binary from '@/components/Binary.vue';

export default defineComponent({
  name: 'Source',
  components: { Container, Binary },
});
</script>

<style scoped>
.source {
  margin-top: 40px;
}
.source .wrapper {
  position: relative;
  padding: 0 20px 40px;
  overflow: hidden;
  background: linear-gradient(transparent, rgb(24 24 27 / 70%));
  border-radius: 0 0 20px 20px;
}
.source .wrapper .binary {
  position: absolute;
  bottom: -2.1rem;
  left: 50%;
  width: calc(100% + 10px);
  height: 200px;
  overflow: hidden;
  font-family: 'Nimbus Mono PS', 'Courier New', monospace;
  color: var(--color-foreground-subtler);
  word-break: break-all;
  pointer-events: none;
  cursor: default;
  user-select: none;
  opacity: 0.35;
  mask-image: linear-gradient(transparent, #000);
  transform: translateX(-50%);
}
.source .wrapper::after {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 70%;
  height: 1px;
  content: '';
  background: linear-gradient(90deg, transparent, var(--color-neutral-400), transparent);
  transform: translateX(-50%);
}
.source .iconContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 15px;
}
.source .iconContainer .tail {
  width: 1px;
  height: 75px;
  background: linear-gradient(transparent, var(--color-neutral-300));
}
.source .iconContainer .icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  font-size: var(--font-md);
  background: linear-gradient(var(--color-neutral-50), var(--color-neutral-100));
  border: 1px solid var(--color-neutral-300);
  border-radius: 50%;
}
.source .title {
  font-family: var(--font-display);
  font-size: var(--font-lg);
  font-weight: 600;
  text-align: center;
}
.source .title span {
  background: linear-gradient(135deg, var(--color-foreground), var(--color-foreground-subtle));
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.source .desc {
  margin-top: 8px;
  color: var(--color-foreground-subtle);
  text-align: center;
}
.source .button {
  display: flex;
  justify-content: center;
  margin: 16px auto 0;
}
.source .button .special {
  padding: 6px 12px;
  border: 1px solid var(--color-neutral-300);
  border-radius: 6px;
  text-decoration: none;
  color: var(--color-foreground);
}
</style>
