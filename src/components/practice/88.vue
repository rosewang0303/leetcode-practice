<template v-if="isIdValid">
  <div>{{ route.params.id }}</div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { questionList } from "@/data";
import { useRoute } from "vue-router";

const route = useRoute();

const isIdValid = computed(() => questionList.hasOwnProperty(route.params.id));
</script>
<style scoped lang="scss"></style>
