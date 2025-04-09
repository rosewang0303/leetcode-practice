<template>
  <codemirror
    class="code-editor"
    v-model="code"
    :autofocus="true"
    :indent-with-tab="true"
    :tab-size="2"
    :extensions="extensions"
  ></codemirror>
</template>
<script setup lang="ts">
import { Codemirror } from "vue-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import { ref } from "vue";

const extensions = [javascript(), oneDark];

const code = ref(`/* console.log('Hello, world!') */

`);
</script>
<style scoped lang="scss">
.code-editor {
  text-align: left;
  //   border: 1px solid $white;
}
</style>
