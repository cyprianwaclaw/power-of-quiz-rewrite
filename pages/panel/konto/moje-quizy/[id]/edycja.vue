<template>
    <NuxtLayout name="account" :arrowText="truncateText(title, 26)">
        <NuxtLink to="/panel/konto?pageName=quiz&section=null"
            class="hidden md:flex place-items-center -mt-[12px] mb-[32px]">
            <Icon name="ph:caret-left-bold" size="22" class="primary-color back-arrow" />
            <p class="text-[18px] primary-color">Moje konto</p>
        </NuxtLink>
        <div class="flex flex-col md:flex-row md:place-items-center md:gap-[28px] mt-[34px]">
            <SectionQuizForm :error="showErrorMessage" />
            <div>
                <SectionChangeImage />
            </div>
        </div>
        <SectionQuestionsForms :error="showErrorMessage" />
        <div class="w-full -mb-[70px]">
            <ButtonLoading isLoading="false" @click="onSubmit" :loading="isLoadingButton"
                :text="isButtonText ? isButtonText : 'Zapisz zmiany'"
                :class="[isButtonText ? 'button-send-success' : 'button-send']" />
        </div>
    </NuxtLayout>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useQuiz } from "@/stores/useQuiz";
import { useEditQuiz } from "@/stores/useEditQuiz";
import { useImage } from "@/stores/imageStore"
const axiosInstance = useNuxtApp().$axiosInstance as any

const imageState = useImage()
const { newImage, newImageFile } = storeToRefs(imageState)
const quizState = useQuiz()
const { title, id, questionsArray, removedQuestionIndexArray, questionsArrayNew, isSendSuccess } = storeToRefs(quizState);
const { allDataToEdit } = storeToRefs(useEditQuiz());
const showErrorMessage = ref<boolean>(false);
const updatedQuiz = ref(false)
const isLoadingButton = ref(false)
const isButtonText = ref()
const quizQuestions = ref() as any
const quizObject = ref() as any

onMounted(() => {
    newImage.value = allDataToEdit.value[0]?.image
})

const onSubmit = async () => {
    isLoadingButton.value = true

    if (newImageFile.value) {
        const formData = new FormData();
        formData.append("image", newImageFile.value);
        await axiosInstance.post(`/quizzes/${id.value}/image`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
    }
    const modifiedData = getModifiedQuizData(quizObject.value, quizState.apiDataQuiz());
    if (Object.keys(modifiedData).length > 0) {
        await axiosInstance.patch(`/quizzes/${id.value}`, modifiedData);
    }

    if (removedQuestionIndexArray.value.length > 0) {
        for (const removed of removedQuestionIndexArray.value) {
            await axiosInstance.delete(`/questions/${removed}`)
        }
    }

    if (questionsArrayNew.value.length > 0) {
        quizState.addQuestionsAndAnswers(questionsArrayNew.value)
    }

    if (getModifiedQuestions(questionsArray.value, quizQuestions.value)?.length > 0) {
        const modifiedQuestions = getModifiedQuestions(questionsArray.value, quizQuestions.value);
        for (const question of modifiedQuestions) {
            const newQuestionData = { "question": question.title, "quiz_id": id.value };
            await axiosInstance.patch(`/questions/${question.id}`, newQuestionData);
        }
    }

    if (getModifiedAnswers(questionsArray.value, quizQuestions.value)?.length > 0) {
        const modifiedAnswer = getModifiedAnswers(questionsArray.value, quizQuestions.value);
        for (const answers of modifiedAnswer) {
            const newQuestionData = { "answer": answers.answer, "correct": answers.isCorrect, };
            await axiosInstance.patch(`/answers/${answers.id}`, newQuestionData);
        }
    }


    setTimeout(async () => {
        isLoadingButton.value = false
    }, 500)
    setTimeout(async () => {
        isButtonText.value = "Zapisano wszystkie zmiany"
    }, 200)
    setTimeout(async () => {
        isButtonText.value = ""
    }, 2500)
}



watch(updatedQuiz, (newValue) => {
    if (newValue === true) {
        questionsArray.value.push(...questionsArrayNew.value);
        questionsArrayNew.value = []
    }
})

definePageMeta({
    middleware: "auth",
})

useSeoMeta({
    title: 'Edycja quizu',
    ogTitle: 'Edycja quizu',
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

.image {
    border: 1px solid $border;
    border-radius: 12px;
    margin-bottom: 32px;
    margin-top: 22px;
    object-fit: cover;
    width: 100%;
    height: 220px;

    @media only screen and (min-width: 640px) {
        height: 100%;
    }
}

.is-loading {

    .image {
        background: linear-gradient(110deg, #c7c7c7 8%, #d4d4d4 18%, #c7c7c7 33%);
        border-radius: 12px;
        background-size: 300% 100%;
        animation: 1.6s shine linear infinite;
    }

    .image {
        border-radius: 12px;
        width: 100%;
        height: 220px;

        @media only screen and (min-width: 640px) {
            height: 538px;
        }
    }
}

@keyframes shine {
    to {
        background-position-x: -200%;
    }
}
</style>
