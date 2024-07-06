<template>
  <div class="content -mt-3 overflow-y-scroll scrollbar-hide">
    <img :src="quiz.image" class="image"/>
    <div class="w-full flex justify-beetwen place-items-center">
        <p class="text-[22px] font-semibold w-full mt-[-4px]">{{ quiz.title }}</p>
      <div class="send-link" @click="copyLink(quiz?.id)">
        <div class="tooltip" v-if="tooltip">
          <span ref="tooltip" class="tooltiptext family"> Skopiowano link </span>
        </div>
        <Icon name="mdi:link-variant" size="26" color="#618cfb" class="copy" />
      </div>
    </div>
    <div class="mt-4 mb-7 gap-[5px] flex flex-col">
      <div class="flex flex-row">
        <p class="text-base text-[#a7a2a2] font-thin">Kategoria:</p>
        <p class="text-base primary-color font-medium ml-[4px]">{{ categoryMapping(categories, quiz) }}</p> 
      </div>
      <div class="flex flex-row">
        <p class="text-base text-[#a7a2a2] font-thin">Liczba pytań:</p>
      <p class="text-base primary-color font-medium ml-[4px]">{{ quiz.questions_count }}</p> 
    </div>
    <div class="flex flex-row">
      <p class="text-base text-[#a7a2a2] font-thin">Poziom trudności:</p>
      <p class="text-base primary-color font-medium ml-[4px]">{{ changeDifficult(quiz.difficulty) }}</p> 
    </div>
    <div class="flex flex-row">
      <p class="text-base text-[#a7a2a2] font-thin">Szacunkowy czas trwania:</p>
      <p class="text-base primary-color font-medium ml-[4px]">{{ quiz.time }}</p> 
    </div>
  </div>
    <div v-if="quiz.description">
      <p class="text-lg font-semibold">Opis quizu</p>
      <p class="text mt-2 pr-6">{{ quiz.description }}</p>
    </div>
    <div class="w-full flex mt-10 mb-7">
      <NuxtLink
      :to="`/panel/quiz/${quiz?.id}`"
      class="button-primary w-full"
      >
      <p class="text-center">Zagraj w quiz</p>
    </NuxtLink>
  </div>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useQuiz } from "@/store/useQuiz";
// import { Quiz } from "@/types";

const props = defineProps<{ quiz: Object}>();
const {categories } = storeToRefs(useQuiz());

const emit = defineEmits<{
  (e: "close", value: any): void;
}>();

// TODO: Dodać domene do linku
const tooltip = ref<boolean>();
const copyLink = (quizId: any) => {
  let token: any = `/panel/quiz/${quizId}`;
  navigator.clipboard.writeText(token);
  tooltip.value = !tooltip.value;
  setTimeout(() => (tooltip.value = false), 1700);
};

const question = useCookie("question");
const submissionQuiz = useCookie("submissionQuiz");
const countCorrect = useCookie("countCorrect") as any;
const countInCorrect = useCookie("countInCorrect") as any;
const countQuestion = useCookie("countQuestion") as any;
const isNextQuestion = useCookie("isNextQuestion") as any;
const cookie = useCookie('bar') as any
const quizState = useQuiz();
const {startQuiz } = storeToRefs(quizState);
await quizState.startingQuiz(props.quiz.id);

question.value = startQuiz.value;
submissionQuiz.value = startQuiz.value.data.submission_id;
countCorrect.value = 0;
countInCorrect.value = 0;
countQuestion.value = 1;
isNextQuestion.value = true;
cookie.value = '0'

</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";

.close {
  color: rgb(134, 134, 134);
  position: absolute;
  background-color: rgba(0, 0, 0, 0.521);
}

.send-link {
  background-color: #618dfb49;
  border-radius: 8px;
  height: 38px;
  width: 38px;
}

.tooltip {
  position: absolute;
  display: inline-block;
}
.tooltip .tooltiptext {
  visibility: hidden;
  width: 165px;
  background-color: #433d3d;
  color: #fff;
  font-size: 14px;
  font-weight: 300;
  text-align: center;
  border-radius: 8px;
  padding-top: 8px;
  padding-bottom: 10px;
  position: absolute;
  z-index: 1;
  margin: 25px;
  bottom: -7px;
  right: -70px;

  opacity: 0;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
  transition: opacity 0.4s;
}
.tooltip .tooltiptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 80%;
  margin-left: 0px;
  border-width: 6px;
  border-style: solid;
  border-color: #433d3d transparent transparent transparent;
}
.tooltip .tooltiptext {
  visibility: visible;
  opacity: 1;
}

.copy {
  margin: 5px;
}
.content {
  height: 411px;
}
.image{
  border: 1px solid $border;
border-radius: 12px;
margin-bottom: 16px;
height: 240px;

}
</style>
