<template>
  <div class="mt-1 md:mt-6">
    <div class="flex flex-col md:hidden">
      <NavOpenMenu />
      <h2 class="title-h2 mb-[6px] md:mt-8 mt-3.5z">Wybrane dla Ciebie</h2>
      <p class="text mb-7">Wybrane quizy na podstawie Twoich ostatnich wyborów</p>
      <CardIndexQuiz :quizes="quizForYou" :plan="hasPremium" :isLoading="isLoading" :n="12" />
    </div>
    <div class="md:flex hidden flex-col mt-7">
      <!-- {{ user}} -->
      <h2 class="title-h2 mb-[6px] md:mt-8">Wybrane dla Ciebie</h2>
      <p class="text mb-7">Wybrane quizy na podstawie Twoich ostatnich wyborów</p>
      <CardIndexQuiz :quizes="quizForYou" :plan="hasPremium" :isLoading="isLoading" :n="12" />
    </div>
    <div class="flex-col mt-8  md:mt-20">
      <h2 class="title-h2 mb-[6px] md:mt-8">Quizy zyskujące popularność</h2>
      <p class="text mb-7">Zobacz jakie quizy są ostatnio na topie i zagraj w nie</p>
      <CardIndexQuiz :quizes="quizPopular" :plan="hasPremium" :isLoading="isLoading" :n="12" />
    </div>
    <div class="bg-white p-10 rounded-3xl relative md:hidden my-12">
      <SectionCardPackage />
    </div>
    <div class="flex-col mt-8 md:mt-20 md:mb-0 -mb-10">
      <h2 class="title-h2 mb-[6px] md:mt-8">Najnowsze quizy</h2>
      <p class="text mb-7">Zobacz jakie quizy są ostatnio na topie i zagraj w nie</p>
      <CardIndexQuiz :quizes="quizLatest" :plan="hasPremium" :isLoading="isLoading" :n="12" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUser } from "@/stores/useUser"
const axiosInstance = useNuxtApp().$axiosInstance as any
const userState = useUser()
const { user, hasPremium } = storeToRefs(userState);

definePageMeta({
  middleware: "auth",
});

const isLoading = ref(true)
const quizForYou = ref();
const quizPopular = ref();
const quizLatest = ref();

onMounted(async () => {

  const resForYou = await axiosInstance.get("/quizzes/for-you?per_page=23")
  quizForYou.value = resForYou.data.data;

  const resPopular = await axiosInstance.get("/quizzes/popular?per_page=23")
  quizPopular.value = resPopular.data.data;

  const resLatest = await axiosInstance.get("/quizzes/latest?per_page=23")
  quizLatest.value = resLatest.data.data;

  isLoading.value = false

})

useSeoMeta({
  title: 'Power of quiz',
  ogTitle: 'Power of quiz',
  twitterCard: 'summary_large_image',
})



</script>

<style scoped lang="scss"></style>