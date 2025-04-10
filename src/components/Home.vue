<template>
  <BasicLayout>
    <div class="home">
      <div>
        <RouterLink
          class="home__link"
          v-for="(question, idx) in questionList"
          :key="idx"
          :to="`practice/${idx}`"
          >{{ idx }}.{{ question.title }}</RouterLink
        >
      </div>
    </div>
  </BasicLayout>
</template>
<script setup lang="ts">
import { RouterLink } from "vue-router";
import BasicLayout from "@/components/layouts/Basic.vue";

import { questionList } from "@/questions";
</script>
<style scoped lang="scss">
.home {
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  &__link {
    display: block;
  }
}
</style>
