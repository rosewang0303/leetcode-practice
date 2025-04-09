<template>
  <div class="block">
    <div class="block__title"><slot name="title"></slot></div>
    <div class="block__content"><slot name="content"></slot></div>
  </div>
</template>
<script setup lang="ts">
// const props = defineProps<{
//   title?: string;
// }>();
</script>
<style lang="scss" scoped>
.block {
  width: 100%;
  background-color: $black;
  border: 1px solid $light-gray;
  border-radius: 8px;
  overflow: hidden;

  &__title {
    padding: 12px 20px;
    background-color: $dark-gray;
  }
  &__content {
    padding: 20px 20px;
  }
}
</style>
