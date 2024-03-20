<template>
  <div>
    <div class="flex flex-col justify-center w-full mb-10 lg:mb-16 mt-4 md:mt-5 lg:mt-8">
      <div class="flex flex-col md:flex-row items-place-center md:gap-4 gap-1 mb-12">
        <SectionUserAvatar :size="50" :avatar="user.avatar" @clicked="handleClick" />
        <h2 class="text-2xl md:text-3xl flex place-items-center font-medium">
          Dzień dobry {{ user.user_name }} !
        </h2>
      </div>
      <div class="grid md:grid-cols-2 grid-rows-1 gap-8">
        <SectionCardStatistic />
        <div class="hidden md:grid gap-8">
          <SectionCardInvite />
          <div class="bg-white py-5 px-8 rounded-3xl relative">
            <SectionCardPackage />
          </div>
        </div>
      </div>
      <h2 class="title-h2 mb-3 md:mt-20">Wybrane dla Ciebie</h2>
      <p class="text mb-8">Wybrane quizy na podstawie Twoich ostatnich wyborów</p>
      <!-- <pre>
        {{ quizPopular }}
</pre> -->
      <div
        class="-mr-8 lg:grid lg:static md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 lg:mx-0 lg:px-0 lg:gap-8 gap-8 flex flex-row overflow-auto overflow-x-scroll -mx-8 px-8 scrollbar-hide">
        <CardForYou v-for="(quiz, index) in quizForYou" :key="index" :quizes="quiz" :plan="hasPremium?.has_premium " />
      </div>
      <div class="mt-14">
        <h2 class="title-h2 mb-2">Quizy zyskujące popularność</h2>
        <p class="text mb-8">Zobacz jakie quizy są ostatnio na topie i zagraj w nie</p>
        <div
          class="-mr-8 lg:grid lg:static md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 lg:mx-0 lg:px-0 lg:gap-8 gap-8 flex flex-row overflow-auto overflow-x-scroll -mx-8 px-8 scrollbar-hide">
          <CardForYou v-for="(quiz, index) in quizPopular" :key="index" :quizes="quiz" :plan="hasPremium?.has_premium " />
        </div>
      </div>
      <PakietHero text="true" class="md:hidden mt-14" />
      <div class="mt-14">
        <h2 class="title-h2 mb-2">Najnowsze quizy</h2>
        <p class="text mb-8">Zobacz jakie quizy są ostatnio na topie i zagraj w nie</p>
        <div
          class="-mr-8 lg:grid lg:static md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 lg:mx-0 lg:px-0 lg:gap-8 gap-8 flex flex-row overflow-auto overflow-x-scroll -mx-8 px-8 scrollbar-hide">
          <CardForYou v-for="(quiz, index) in quizLatest" :key="index" :quizes="quiz" :plan="hasPremium?.has_premium " />
        </div>
      </div>
    </div>
    <pre>
      {{  quizLatest }}
    </pre>
    <!-- {{ quizForYou }} -->
  </div>
</template>

<script setup lang="ts">
import { useUser } from "@/stores/useUser";
const axiosInstance = useNuxtApp().$axiosInstance;

definePageMeta({
  middleware: "auth",
});

const userState = useUser();

const { user, hasPremium } = storeToRefs(userState);
await userState.login();


const handleClick = () => {
  console.log("clicked is working correct");
};

const quizForYou = ref();
const resForYou = await axiosInstance.get("/quizzes/for-you?per_page=23");
quizForYou.value = resForYou.data.data;


const quizPopular = ref();
const resPopular = await axiosInstance.get("/quizzes/popular?per_page=23");
quizPopular.value = resPopular.data.data;


const quizLatest = ref();
const resLatest = await axiosInstance.get("/quizzes/latest?per_page=23");
quizLatest.value = resLatest.data.data;

let queryString = "/user/hasPremium";
// let queryString = "/quizzes/all?per_page=23&category=Jedzenie&category=Zwierzęta&difficulty=Średni&difficulty=Łatwy";

// Tworzymy tablicę par zastąpień [szukane, zastępcze]
let replacements = [
  ["category", "category_[]"],
  ["difficulty", "difficulty[]"]
];

// Iterujemy przez tablicę par zastąpień i zamieniamy wszystkie wystąpienia
replacements.forEach(replacement => {
  let find = replacement[0];
  let replace = replacement[1];
  let regex = new RegExp(find, 'g');
  queryString = queryString.replace(regex, replace);
});

console.log(queryString);
const quizTest = ref()
const resTest = await axiosInstance.get(queryString
  // "/quizzes/test?per_page=23&category[]=Jedzenie&category[]=1&difficulty[]=Łatwy"
  // "/quizzes/test?per_page=23&category[]=Jedzenie&category[]=Zwierzęta&difficulty[]=Trudny"
  // "/quizzes/test?per_page=23&category[]=Jedzenie&category[]=Zwierzęta&difficulty[]=Średni&difficulty[]=Łatwy"


);
quizTest.value = resTest.data;
</script>

<style scoped lang="scss"></style>
