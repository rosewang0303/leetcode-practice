<template>
  <codemirror
    class="code-editor"
    v-model="code"
    :autofocus="true"
    :indent-with-tab="true"
    :tab-size="4"
    :extensions="extensions"
  ></codemirror>
</template>
<script setup lang="ts">
import { Codemirror } from "vue-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import { ref, watch } from "vue";

const emit = defineEmits<{
  (e: "onChange", code: string): void;
}>();

const props = defineProps<{
  defaultVal: sting;
}>();

const extensions = [javascript(), oneDark];

const code = ref("");

watch(
  () => props.defaultVal,
  () => {
    code.value = props.defaultVal;
  },
  { immediate: true, deep: true }
);

watch(
  () => code.value,
  () => {
    emit("onChange", code.value);
  },
  { deep: true }
);
</script>
<style scoped lang="scss">
.code-editor {
  text-align: left;
}
</style>
