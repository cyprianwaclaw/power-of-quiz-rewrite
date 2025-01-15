<template>
    <NuxtLayout name="account" :arrowText="truncateText(title, 26)">
        <NuxtLink to="/panel/konto?pageName=quiz&section=null"
            class="hidden md:flex place-items-center -mt-[12px] mb-[32px]">
            <Icon name="ph:caret-left-bold" size="22" class="primary-color back-arrow" />
            <p class="text-[18px] primary-color">Moje konto</p>
        </NuxtLink>
        <div v-if="isLoading">
            ładowanie
        </div>
        <div v-else>
            <div class="flex flex-col md:flex-row md:place-items-center md:gap-[28px] mt-[34px]">
                <SectionQuizForm :error="showErrorMessage" />
                <div class="-mt-[120px]">
                    <SectionChangeImage />
                </div>
            </div>
            <SectionQuestionsForms :error="showErrorMessage" />
            <!-- <div class="w-full -mb-[70px]">
                <ButtonLoading isLoading="false" @click="onSubmit" :loading="isLoadingButton"
                :text="isButtonText ? isButtonText : 'Zapisz zmiany'"
                :class="[isButtonText ? 'button-send-success' : 'button-send']" />
            </div> -->
        </div>
    </NuxtLayout>
</template>
<script lang="ts" setup>
import { storeToRefs } from "pinia"
import { useQuiz } from "@/stores/useQuiz"
import { useImage } from "@/stores/imageStore"
const axiosInstance = useNuxtApp().$axiosInstance as any

const router = useRouter()
const isLoading = ref(true)
const singleQuiz = ref() as any
const quizQuestions = ref() as any
// import { useImage } from "@/stores/imageStore"

const imageState = useImage()
const { newImage, newImageFile } = storeToRefs(imageState)
const quizState = useQuiz()
const { title } = storeToRefs(quizState)
// const isRemove = ref(false)
const showErrorMessage = ref<boolean>(false);


onMounted(async () => {
    // console.log("Title:" + title.value)
    // newImage.value = allDataToEdit.value[0]?.image
    if (!title.value) {
        const quiz = await axiosInstance.get(`quiz/${router.currentRoute.value.params.id}`)
        const questions = await axiosInstance.get(`quizzes/${router.currentRoute.value.params.id}/data`)

        singleQuiz.value = quiz.data.data
        quizQuestions.value = questions.data

        quizState.updateQuiz(
            singleQuiz.value.id,
            singleQuiz.value.title,
            singleQuiz.value.image,
            singleQuiz.value.description,
            singleQuiz.value.time,
            singleQuiz.value.difficulty_id,
            singleQuiz.value.category_id,
            quizQuestions.value.data
        )

        newImage.value = singleQuiz.value.image
        // quiz.data.data
    }
    isLoading.value = false
})


</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";

.isLoaded {
    background: linear-gradient(110deg, #c7c7c7 8%, #d4d4d4 18%, #c7c7c7 33%);
    border-radius: 12px;
    background-size: 300% 100%;
    animation: 1.6s shine linear infinite;
}

.image {
    border: 1px solid $border;
    border-radius: 12px;
    object-fit: cover;
    width: 100%;
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
        height: 260px;

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
