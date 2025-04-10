<template>
  <div class="basic-layout">
    <header>
      <button v-if="route.name !== 'home'" @click="router.back()">Back</button>
      <RouterLink class="logo" :to="'/'">LeetCode Practice</RouterLink>
      <a href="https://github.com/rosewang0303" target="_blank"
        >Rose's Github</a
      >
    </header>
    <main>
      <slot></slot>
    </main>
  </div>
</template>
<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
</script>
<style lang="scss" scoped>
.basic-layout {
  $header-height: 52px;

  header {
    height: $header-height;
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 12px $layout-padding;
  }
  .logo {
    text-decoration: unset;
  }
  main {
    height: calc(100vh - $header-height);
    padding: 0 $layout-padding $layout-padding;
  }
}
</style>
