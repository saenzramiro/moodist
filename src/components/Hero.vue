<template>
  <div class="hero">
    <Container>
      <div class="wrapper">
        <div class="pattern"></div>
        <div class="logo-wrapper">
          <img
            alt="Faded Moodist Logo"
            aria-hidden="true"
            class="logo"
            height="48"
            src="/logo.svg"
            width="48"
          />
        </div>

        <h1 class="title">
          Ambient Sounds<span class="line">For Focus and Calm</span>
        </h1>
        <h2 class="desc">Free and Open-Source.</h2>

        <p class="sounds">
          <span>{{ count }} Sounds</span>
        </p>
      </div>
    </Container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Container from '@/components/Container.vue';
import { count } from '@/lib/sounds';

export default defineComponent({
  name: 'Hero',
  components: { Container },
  setup() {
    return { count: count() };
  },
});
</script>

<style scoped>
.hero {
  text-align: center;
}
.hero .wrapper {
  position: relative;
  padding: 120px 0 80px;
}
.hero .wrapper .pattern {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(var(--color-neutral-500) 5%, transparent 5%);
  background-position: top center;
  background-size: 21px 21px;
  opacity: 0.8;
  mask-image: linear-gradient(#fff, transparent, transparent);
}
.hero .wrapper .pattern::before {
  position: absolute;
  top: 0;
  left: 50%;
  width: 300px;
  height: 100px;
  content: '';
  background: var(--color-neutral-200);
  filter: blur(50px);
  border-radius: 100%;
  opacity: 0.8;
  transform: translate(-50%, -50%);
}
.hero .logo-wrapper {
  mask-image: linear-gradient(#000, rgb(0 0 0 / 40%), rgb(0 0 0 / 5%));
}
.hero .logo-wrapper .logo {
  display: block;
  width: 48px;
  margin: 0 auto 20px;
  opacity: 1;
  animation-name: logo;
  animation-duration: 60s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}
.hero .title {
  font-family: var(--font-display);
  font-size: var(--font-xlg);
  font-weight: 600;
  line-height: 1;
}
.hero .title .line {
  display: block;
  margin-top: 2px;
  background: linear-gradient(var(--color-foreground-subtler), var(--color-foreground-subtle));
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.hero .desc {
  margin-top: 12px;
  line-height: 1.6;
  color: var(--color-foreground-subtle);
}
.hero .sounds {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: max-content;
  height: 28px;
  padding: 0 12px;
  margin: 20px auto 0;
  font-size: var(--font-xsm);
  color: var(--color-foreground-subtle);
  background: linear-gradient(var(--color-neutral-100), transparent);
  border: 1px solid var(--color-neutral-200);
  border-radius: 100px;
}
.hero .sounds::before {
  position: absolute;
  top: -1px;
  left: 50%;
  width: 70%;
  height: 1px;
  content: '';
  background: linear-gradient(90deg, transparent, var(--color-neutral-400), transparent);
  transform: translateX(-50%);
}
@keyframes logo {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
