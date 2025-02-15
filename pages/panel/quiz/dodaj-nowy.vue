<template>
   <div>
      <h2 class="text-2xl md:text-3xl flex place-items-center font-medium">
         Nowy quiz
      </h2>
      <div class="md:flex md:w-full md:gap-[28px] place-items-center md:mt-[42px]">
         <SectionQuizForm :error="showErrorMessage" />
         <div>
            <SectionChangeImage />
            <div v-if="quizState.isAllData() === true ? false : true && (newImageFile ? false : true) && showErrorMessage"
            class="mb-[32px] mt-[24px]">
            <p class="text-error-notification">Wybierz zdjęcie quizu</p>
         </div>
      </div>
   </div>
   <SectionQuestionsForms :array="Array" :error="showErrorMessage" />
   </div>
   <div class="w-full md:w-[200px] -mb-[70px]">
      <ButtonLoading isLoading="false" @click="onSubmit" :loading="isLoadingButton"
         :text="isButtonText ? isButtonText : 'Dodaj quiz'"
         :class="[isButtonText ? 'button-send-success' : 'button-send']" />
   </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useQuiz } from "@/stores/useQuiz";
import { useImage } from "@/stores/imageStore"

const imageState = useImage()
const { newImageFile, newImage } = storeToRefs(imageState)
const axiosInstance = useNuxtApp().$axiosInstance as any
const axiosInstanceData = useNuxtApp().$axiosInstanceData as any

const quizState = useQuiz()
const { questionsArray, isSendSuccess } = storeToRefs(quizState)

const showErrorMessage = ref<boolean>(false);
const isLoadingButton = ref(false)
const isButtonText = ref()


const onSubmit = async () => {
   showErrorMessage.value = true
   isLoadingButton.value = true

   if (quizState.isAllData() && newImageFile.value ? true : false) {

      console.log('All data are available')
      const quizData = {
         ...quizState.apiDataQuiz(),
         image: newImageFile.value
      }

      const newQuiz = await axiosInstanceData.post('/quizzes', quizData)
      for (const question of questionsArray.value) {
         const newQuestionData = ref({ "question": question.question, "quiz_id": newQuiz.data.data.id });
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
                  newImageFile.value = null
                  newImage.value = null
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
      isLoadingButton.value = false
   } else {
      scrollToTop()
      console.log('Not all data are available')
      isLoadingButton.value = false
   }
}

onMounted(() => {
   quizState.$reset()
   newImageFile.value = null
   newImage.value = null
})

definePageMeta({
   middleware: "auth",
})

useSeoMeta({
   title: 'Nowy quiz',
   ogTitle: 'Nowy quiz',
   twitterCard: 'summary_large_image',
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