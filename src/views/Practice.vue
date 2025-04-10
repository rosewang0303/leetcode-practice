<template>
  <BasicLayout>
    <template v-if="isIdValid">
      <!-- <component :is="dynamicComponent"></component> -->
      <div class="practice">
        <div class="practice__wrap">
          <!-- question -->
          <Block class="question">
            <template v-slot:title
              ><div>{{ route.params.id }}. {{ question.title }}</div></template
            >
            <template v-slot:content>
              <div class="question__content" v-html="question.question"></div>
            </template>
          </Block>
          <div class="block__wrap">
            <!-- code -->
            <Block class="code">
              <template v-slot:title
                ><div class="code__title">
                  <div>Code</div>
                  <div>
                    <button @click="runCode">Run</button>
                    <button @click="saveCode">Save</button>
                    <button @click="resetCode">Reset</button>
                  </div>
                </div></template
              >
              <template v-slot:content
                ><div class="code__content">
                  <CodeEditor
                    v-if="question"
                    @onChange="codeChangeHandler"
                    :defaultVal="codeDefaultVal"
                  /></div
              ></template>
            </Block>
            <!-- result -->
            <Block class="output">
              <template v-slot:title><div>Output</div></template>
              <template v-slot:content
                ><div class="output__content">
                  <p
                    v-for="(line, idx) in output"
                    :key="idx"
                    :class="line.type"
                  >
                    {{ line.text }}
                  </p>
                </div>
              </template>
            </Block>
          </div>
        </div>
      </div>
    </template>
    <template v-else><div>Not Found</div></template>
  </BasicLayout>
</template>
<script lang="ts" setup>
import * as Babel from "@babel/standalone";
import { useRoute } from "vue-router";
import { questionList } from "@/questions";

import { ref, defineAsyncComponent, computed, onMounted } from "vue";
import BasicLayout from "@/components/layouts/Basic.vue";
import CodeEditor from "@/components/practice/CodeEditor.vue";
import Block from "@/components/practice/Block.vue";

const route = useRoute();

const codeStr = ref("");
const codeDefaultVal = ref("");
const output = ref([]);

const isIdValid = computed(() => questionList.hasOwnProperty(route.params.id));
const question = computed(() => {
  if (isIdValid.value) return questionList[route.params.id];
  else null;
});

// const dynamicComponent = defineAsyncComponent(() => {
//   if (!isIdValid.value) return;
//   return import(`@/components/practice/${route.params.id}.vue`);
// });

onMounted(() => {
  codeDefaultVal.value =
    question.value.answer.length > 0 && question.value
      ? question.value.answer
      : question.value.default;
});

const codeChangeHandler = (code: string) => {
  codeStr.value = code;
};

const runCode = () => {
  output.value = []; // reset

  const fakeConsole = {
    log: (...args) => {
      output.value.push({ type: "log", text: args.join(" ") });
    },
    warn: (...args) => {
      output.value.push({ type: "warn", text: args.join(" ") });
    },
    error: (...args) => {
      output.value.push({ type: "error", text: args.join(" ") });
    },
    clear: () => {
      output.value = [];
    },
  };

  try {
    const transpiledCode = Babel.transform(codeStr.value, {
      presets: ["typescript"],
      filename: "file.ts",
    }).code;

    const fn = new Function("console", transpiledCode);
    fn(fakeConsole);
  } catch (error) {
    output.value.push({ type: "error", text: `ERROR: ${error.message}` });
  }
};

const saveCode = () => {
  // TODO
};

const resetCode = () => {
  console.error(codeStr.value);
  codeDefaultVal.value = question.value.default;
  // codeStr.value = question.value.default;
};
</script>
<style lang="scss" scoped>
.practice {
  height: 100%;

  &__wrap {
    height: 100%;
    display: flex;
    flex-direction: row;
    gap: 30px;
  }

  .question {
    width: 40%;
    max-height: 100%;

    &__content {
      overflow: auto;
    }
  }
  .block__wrap {
    width: 60%;
  }
  .code {
    width: 100%;
    height: 70%;
    margin-bottom: 30px;

    &__title {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    button {
      margin: 0 2px;
    }
    &__content {
      overflow: auto;
    }
  }

  .output {
    width: 100%;
    height: calc(30% - 30px);

    .log {
      color: #ddd;
      color: $code-output-log;
    }
    .warn {
      color: $code-output-warn;
    }
    .error {
      color: $code-output-error;
    }
  }
}
</style>
