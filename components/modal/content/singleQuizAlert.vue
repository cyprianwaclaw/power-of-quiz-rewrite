<!-- <template>
  <div class="grid grid-cols-2 grid-rows-1">
    <div class="start-cols-1">
      <img :src="quiz.image" class="hero-image-alert" />
    </div>
    <div class="start-cols-2 ml-[100px] min-h-full">
      <p class="text-[22px] font-semibold w-[300px]">{{ quiz.title }}</p>
      <div class="mt-4 mb-7 gap-[5px] flex flex-col">
        <div class="flex flex-row">
          <p>Kategoria:</p>
          <p class="text-base primary-color font-medium ml-[4px]">
            {{ categoryMapping(categories, quiz)?.name }}
          </p>
        </div>
        <div class="flex flex-row">
          <p>Liczba pytań:</p>
          <p class="text-base primary-color font-medium ml-[4px]">
            {{ quiz.questions_count }}
          </p>
        </div>
        <div class="flex flex-row">
          <p>Poziom trudności:</p>
          <p class="text-base primary-color font-medium ml-[4px]">
            {{ changeDifficult(quiz.difficulty) }}
          </p>
        </div>
        <div class="flex flex-row">
          <p>Szacunkowy czas trwania:</p>
          <p class="text-base primary-color font-medium ml-[4px]">{{ quiz.time }}</p>
        </div>
      </div>
      <p class="text-lg font-semibold mt-10 mb-3">Opis quizu</p>
      <div class="h-[120px] overflow-y-auto">
        <p class="text pr-6 mb-5">{{ quiz.description }}</p>
      </div>
      <NuxtLink
        :to="`/panel/quiz/${quiz?.id}`"
        class="button-primary absolute bottom-[52px] w-[300px]"
      >
        <p class="text-center">Zagraj w quiz</p>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Quiz } from "@/types";
import { useQuiz } from "@/store/useQuiz";
import { storeToRefs } from "pinia";
defineProps<{ quiz: Quiz }>();
const {categories } = storeToRefs(useQuiz());

</script>

<style scoped lang="scss">
@import "@/assets/style/_variables.scss";
.hero-image-alert {
  position: absolute;
  width: 500px;
  height: 550px;
  top: 0;
  left: 0;
  margin: -3px 0px 0px -3px;
  border: transparent;
  border-radius: 24px 0px 0px 24px;
  object-fit: cover;
}
</style> -->

<template>
  <div class="grid grid-cols-2 grid-rows-1">
    <div class="start-cols-1">
      <img :src="quiz.image" class="hero-image-alert" />
    </div>
    <div class="start-cols-2 ml-[100px] min-h-full">
      <p class="text-[22px] font-semibold w-[300px]">{{ quiz.title }}</p>
      <div class="mt-4 mb-7 gap-[5px] flex flex-col">
        <div class="flex flex-row">
          <p>Kategoria:</p>
          <p class="text-base primary-color font-medium ml-[4px]">
            {{ categoryMapping(categories, quiz) }}
          </p>
        </div>
        <div class="flex flex-row">
          <p>Liczba pytań:</p>
          <p class="text-base primary-color font-medium ml-[4px]">
            {{ quiz.questions_count }}
          </p>
        </div>
        <div class="flex flex-row">
          <p>Poziom trudności:</p>
          <p class="text-base primary-color font-medium ml-[4px]">
            {{ changeDifficult(quiz.difficulty) }}
          </p>
        </div>
        <div class="flex flex-row">
          <p>Szacunkowy czas trwania:</p>
          <p class="text-base primary-color font-medium ml-[4px]">{{ quiz.time }}</p>
        </div>
      </div>
      <p class="text-lg font-semibold mt-10 mb-3">Opis quizu</p>
      <div class="h-[120px] overflow-y-auto">
        <p class="text pr-6 mb-5">{{ quiz.description }}</p>
      </div>
      <!-- :to="{path:'/panel/quiz/${quiz?.id}', query:{submission}}" -->
      <!-- :to="{path:`/panel/quiz/${quiz?.id}-${submission}`, state:{firstQuestion: startQuiz?.data},}" -->
      <NuxtLink
        :to="`/panel/quiz/${quiz?.id}`"
        class="button-primary absolute bottom-[52px] w-[300px]"
      >
        <p class="text-center">Zagraj w quiz</p>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Quiz } from "@/types";
import { useQuiz } from "@/store/useQuiz";
import { storeToRefs } from "pinia";
const props = defineProps<{ quiz: Quiz }>();
const question = useCookie("question");
const submissionQuiz = useCookie("submissionQuiz");
const countCorrect = useCookie("countCorrect") as any;
const countInCorrect = useCookie("countInCorrect") as any;
const countQuestion = useCookie("countQuestion") as any;
const isNextQuestion = useCookie("isNextQuestion") as any;
const cookie = useCookie('bar') as any
const route = useRoute();
const quizState = useQuiz();
const { categories, singleQuiz, startQuiz } = storeToRefs(quizState);
await quizState.startingQuiz(props.quiz.id);
console.log(startQuiz.value);

question.value = startQuiz.value;
submissionQuiz.value = startQuiz.value.data.submission_id;
countCorrect.value = 0;
countInCorrect.value = 0;
countQuestion.value = 1;
isNextQuestion.value = true;
cookie.value = '0'
// await quizState.getNextQuestion(startQuiz.value.data.submission_id)
// console.log(getNextQuestion1.value)
// console.log(props.quiz.id)
// const submission = startQuiz.value.data.submission_id
</script>

<style scoped lang="scss">
@import "@/assets/style/_variables.scss";
.hero-image-alert {
  position: absolute;
  width: 500px;
  height: 550px;
  top: 0;
  left: 0;
  margin: -3px 0px 0px -3px;
  border: transparent;
  border-radius: 24px 0px 0px 24px;
  object-fit: cover;
}
</style>
