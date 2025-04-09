<template>
  <template v-if="isIdValid">
    <!-- <component :is="dynamicComponent"></component> -->
    <div class="practice">
      <div class="practice__wrap">
        <Block class="question">
          <template v-slot:title
            ><div>
              {{ route.params.id }}. {{ questionList[route.params.id].title }}
            </div></template
          >
          <template v-slot:content>
            <div
              class="question__content"
              v-html="questionList[route.params.id].question"
            ></div>
          </template>
        </Block>

        <Block class="code">
          <template v-slot:title
            ><div class="code__title">
              <div>Code</div>
              <div><button>Run</button> <button>Save</button></div>
            </div></template
          >
          <template v-slot:content
            ><div class="code__content"><CodeEditor /></div
          ></template>
        </Block>
      </div>
    </div>
  </template>
  <template v-else><div>Not Found</div></template>
</template>
<script lang="ts" setup>
import { ref, defineAsyncComponent, computed } from "vue";
import { useRoute } from "vue-router";
import { questionList } from "@/data";
import CodeEditor from "@/components/practice/CodeEditor.vue";
import Block from "@/components/practice/Block.vue";

const route = useRoute();

const isIdValid = computed(() => questionList.hasOwnProperty(route.params.id));

const dynamicComponent = defineAsyncComponent(() => {
  if (!isIdValid) return;
  return import(`@/components/practice/${route.params.id}.vue`);
});
</script>
<style lang="scss" scoped>
.practice {
  padding: 20px;

  &__wrap {
    display: flex;
    flex-direction: row;
    gap: 30px;
  }

  .question {
    width: 40%;

    &__content {
      max-height: 80vh;
      overflow: auto;
    }
  }
  .code {
    width: 60%;

    &__title {
      display: flex;
      justify-content: space-between;
    }
    button {
      margin: 0 2px;
    }
    &__content {
      overflow: auto;
    }
  }
}
</style>
