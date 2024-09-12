<template>
   <div @click="clearErrorMessage">
      <h2 class="text-2xl md:text-3xl flex place-items-center font-medium">
         Nowy quiz
      </h2>
      <!-- {{ quizState.apiData() }} -->
      <SectionQuizForm :categoriesArray="categories" :error="showErrorMessage" />
      <LazySectionQuestionsForms :array="Array" :error="showErrorMessage" />
   </div>
   <button class="button-primary w-full" @click="onSubmit">Dodaj quiz</button>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useQuiz } from "@/stores/useQuiz";
const axiosInstance = useNuxtApp().$axiosInstance as any

const quizState = useQuiz()
const { errorState } = storeToRefs(quizState);

const showErrorMessage = ref<boolean>(false);
const categories = ref([]);

const resCategories = await axiosInstance.get('/categories');
categories.value = resCategories.data.data;


const onSubmit = async () => {
   showErrorMessage.value = true;
   setTimeout(async () => {
      if (errorState.value === false) {
         console.log('nie ma błędu')
         await axiosInstance.post('/quizzes',
            quizState.apiData()
         )
      }
   }, 200)
}

const clearErrorMessage = () => {
   showErrorMessage.value = false;
}

onMounted(() => {
   const id = 2
   // const id = null
   if (id) {
      quizState.updateQuizData({
         title: "Example Quiz Title",
         description: "This is an example description",
         time: '30',
         difficulty: "easy",
         category_id: '5',
         questionsArray: [{ "title": "gfdggdfgf", "answers": [{ "answer": "gfgfdgdfg", "isCorrect": true }, { "answer": "dfgddf", "isCorrect": false }, { "answer": "gfdg", "isCorrect": false }, { "answer": "fdgdfgdfg", "isCorrect": false }] }, { "title": "vcxvcxv", "answers": [{ "answer": "vcxvcxvcx", "isCorrect": false }, { "answer": "vcvcvc", "isCorrect": true }, { "answer": "xcvcxv", "isCorrect": false }, { "answer": "cvcbfghgh", "isCorrect": false }] }]
      });
   } else {
      quizState.$reset()
   }
})

</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";

textarea {
   padding: 0px;
   width: 100%;
   font-size: 16px;
   letter-spacing: 0.17px;
   outline: none;
   font-weight: 500;
   resize: none;
   overflow-y: auto;

   &:focus {
      background-color: #ffffff;
      color: #292828 !important;
      letter-spacing: 0.16px;
      font-weight: 500;
   }

   &::placeholder {
      letter-spacing: 0.17px;
      font-size: 16px;
      font-weight: 400;
      color: #9a9a9a;
   }

   &:focus::placeholder {
      font-weight: 400;
      color: #d1d1d1;
   }

   &::-ms-clear {
      display: none;
   }
}
</style>