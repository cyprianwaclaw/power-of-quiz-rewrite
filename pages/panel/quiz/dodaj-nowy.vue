<template>
   <div>
      <h2 class="text-2xl md:text-3xl flex place-items-center font-medium">
         Dodaj nowy quiz
      </h2>
      <div v-if="errorState && showErrorMessage" class="flex place-items-center gap-[5px] mt-3">
         <Icon name="ph:warning-circle" size="22" class="text-[#ef142a]" />
         <p class="text-[#ef142a] text-[15px] mt-[3px]">Uzupełnij wszystkie
            dane</p>
      </div>
      <SectionQuizForm :categoriesArray="categories" :error="showErrorMessage" />
      <LazySectionQuestionsForms :array="Array" :error="showErrorMessage" />
   </div>
   <div class="w-full -mb-[70px]">
      <ButtonLoading isLoading="false" @click="onSubmit" :loading="isLoadingButton"
         :text="isButtonText ? isButtonText : 'Dodaj quiz'"
         :class="[isButtonText ? 'button-send-success' : 'button-send']" />
   </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useQuiz } from "@/stores/useQuiz";
const axiosInstance = useNuxtApp().$axiosInstance as any

const quizState = useQuiz()
const { errorState, questionsArray, isSendSuccess } = storeToRefs(quizState);

const showErrorMessage = ref<boolean>(false);
const categories = ref([]);
const resCategories = await axiosInstance.get('/categories');
categories.value = resCategories.data.data;
const isLoadingButton = ref(false)
const isButtonText = ref()

const onSubmit = async () => {
   showErrorMessage.value = true
   isLoadingButton.value = true

   if (errorState.value == false) {
      const newQuiz = await axiosInstance.post('/quizzes', quizState.apiDataQuiz())
      for (const question of questionsArray.value) {
         const newQuestionData = ref({ "question": question.title, "quiz_id": newQuiz.data.data.id });
         try {
            const newQuestion = await axiosInstance.post('/questions', newQuestionData.value)

            for (const answer of question.answers) {
               const newAnswerData = ref({ "answer": answer.answer, "question_id": newQuestion.data.data.id, "correct": answer.isCorrect, });
               await axiosInstance.post('/answers', newAnswerData.value);

            }
            setTimeout(async () => {
               isLoadingButton.value = false
               setTimeout(async () => {
                  isButtonText.value = "Wysłano!"
                  quizState.$reset()
                  showErrorMessage.value = false;
                  isSendSuccess.value = true
               }, 20)
            }, 1000)
            setTimeout(async () => {
               isButtonText.value = ""
            }, 3100)
         } catch (error) {
            console.error("Error:", error)
         }
      }
   } else {
      scrollToTop()
      isLoadingButton.value = false
   }
}

onMounted(() => {
   // const id = 2
   const id = null
   if (id) {
      quizState.updateQuizData({
         title: "Example Quiz Title",
         description: "This is an example description",
         time: '30',
         difficulty: "easy",
         category_id: '5',
         questionsArray: [{ "title": "gfdggdfgf", "answers": [{ "answer": "gfgfdgdfg", "isCorrect": true }, { "answer": "dfgddf", "isCorrect": false }, { "answer": "gfdg", "isCorrect": false }, { "answer": "fdgdfgdfg", "isCorrect": false }] }, { "title": "vcxvcxv", "answers": [{ "answer": "vcxvcxvcx", "isCorrect": false }, { "answer": "vcvcvc", "isCorrect": true }, { "answer": "xcvcxv", "isCorrect": false }, { "answer": "cvcbfghgh", "isCorrect": false }] }, { "title": "gfdggdfgf", "answers": [{ "answer": "gfgfdgdfg", "isCorrect": true }, { "answer": "dfgddf", "isCorrect": false }, { "answer": "gfdg", "isCorrect": false }, { "answer": "fdgdfgdfg", "isCorrect": false }] }, { "title": "vcxvcxv", "answers": [{ "answer": "vcxvcxvcx", "isCorrect": false }, { "answer": "vcvcvc", "isCorrect": true }, { "answer": "xcvcxv", "isCorrect": false }, { "answer": "cvcbfghgh", "isCorrect": false }] }, { "title": "gfdggdfgf", "answers": [{ "answer": "gfgfdgdfg", "isCorrect": true }, { "answer": "dfgddf", "isCorrect": false }, { "answer": "gfdg", "isCorrect": false }, { "answer": "fdgdfgdfg", "isCorrect": false }] }, { "title": "vcxvcxv", "answers": [{ "answer": "vcxvcxvcx", "isCorrect": false }, { "answer": "vcvcvc", "isCorrect": true }, { "answer": "xcvcxv", "isCorrect": false }, { "answer": "cvcbfghgh", "isCorrect": false }] }]
      });
   } else {
      quizState.$reset()
   }
})

</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";


.button-send-success {
   background: $color-success !important;
   transition: background-color 0.4s ease-in-out;
}

.button-send {
   background-color: $primary;
   transition: background-color 0.4s ease-in-out;
}

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