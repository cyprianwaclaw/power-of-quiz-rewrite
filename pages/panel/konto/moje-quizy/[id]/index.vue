<template>
    <NuxtLayout name="account" arrowText="Moje quizy">
        <NuxtLink to="/panel/konto?pageName=quiz&section=null" class="hidden md:flex place-items-center -mt-[12px] ">
            <Icon name="ph:caret-left-bold" size="22" class="primary-color back-arrow" />
            <p class="text-[18px] primary-color">Moje konto</p>
        </NuxtLink>
        <p class="font-bold text-[13px] md:text-[14px] mt-10 md:mt-[44px]"
            :class="singleQuiz?.data.status == true ? 'text-[#4BB21A]' : 'text-[#E1A817]'">
            {{ singleQuiz?.data.status
                ? 'Aktywny' : 'W oczekiwaniu' }}</p>
        <!-- {{ singleQuiz?.data }} -->
        <p class="font-semibold text-[23px] md:text-[28px] leading-[28px] mt-[8px]"> {{ singleQuiz?.data.title }}</p>
        <div class="md:flex md:flex-row-reverse md:gap-[28px] md:mt-[32px] mt-[32px] flex flex-col">

            <div class="w-full mb-[34px] md:mb-[0px]">
                <NuxtImg :src="singleQuiz?.data.image" class="image md:h-[420px] h-[300px]" />
            </div>
<!-- {{ singleQuiz?.data }} -->
            <div class="bg-white rounded-[18px] p-[30px] w-full">
                <div class=" mb-[28px] gap-[5px] flex flex-col">
                    <div class="flex gap-[7px]">
                        <p class="text-gray-600">Kategoria:</p>
                        <p class="text-base primary-color font-medium">
                            {{ singleQuiz?.data.category }}
                        </p>
                    </div>
                    <div class="flex gap-[7px]">
                        <p class="text-gray-600">Trudność:</p>
                        <p class="text-base primary-color font-medium">
                            {{ singleQuiz?.data.difficulty }}
                        </p>
                    </div>
                    <div class="flex gap-[7px]">
                        <p class="text-gray-600">Pytania:</p>
                        <p class="text-base primary-color font-medium">
                            {{ quizQuestions?.count }}
                        </p>
                    </div>
                    <div class="flex gap-[7px]">
                        <p class="text-gray-600">Czas trwania:</p>
                        <p class="text-base primary-color font-medium">
                            {{ singleQuiz?.data.time }} min
                        </p>
                    </div>
                    <div class="flex gap-[7px]">
                        <p class="text-gray-600">Dodano:</p>
                        <p class="text-base primary-color font-medium">
                            {{ singleQuiz?.data.date }}
                        </p>
                    </div>
                </div>
                <p class="text-[17px] font-semibold">Opis</p>
                <p class="text pr-6 text-gray-600 mt-[5px] leading-[23px]">{{ singleQuiz?.data.description }}</p>
            </div>
        </div>

        <div class="mt-[27px] bg-white border-white rounded-[18px] w-full p-[21px]">
            <CardQuizQuestions :questions="quizQuestions?.data" :n="14" :isLoading="isLoading" />
        </div>
        <div class="flex justify-end items-end mt-8 gap-[2px]">
            <p class="text-red-600 px-[23px] py-[10px] font-semibold cursor-pointer" @click="removeModal()">Usuń</p>
            <!-- <NuxtLink :to="`/panel/konto/moje-quizy/${router.currentRoute.value.params.id}/edycja`"> -->
            <!-- < :to="`/panel/konto/moje-quizy/${router.currentRoute.value.params.id}/edycja`"> -->
            <button class="button-primary" @click="goToEditData()">
                Edytuj
            </button>
            <!-- </Nu> -->
        </div>
    </NuxtLayout>
</template>
<script lang="ts" setup>
import { storeToRefs } from "pinia"
import { useUser } from "@/stores/useUser"
import { useQuiz } from "@/stores/useQuiz"
import { useImage } from "@/stores/imageStore"


const axiosInstance = useNuxtApp().$axiosInstance as any

const router = useRouter()
const isLoading = ref(true)
const singleQuiz = ref() as any
const quizQuestions = ref() as any
const quizState = useQuiz()
const imageState = useImage()
const { newImage, newImageFile } = storeToRefs(imageState)
const isRemove = ref(false)

onMounted(async () => {
    const questions = await axiosInstance.get(`quizzes/${router.currentRoute.value.params.id}/data`);
    const quiz = await axiosInstance.get(`quiz/${router.currentRoute.value.params.id}`);
    singleQuiz.value = quiz.data
    quizQuestions.value = questions.data;
    console.log(singleQuiz.value)
    // localStorage.setItem('quizData', JSON.stringify(quiz.data.data));
    // localStorage.setItem('quizQuestions', JSON.stringify(questions.data.data));

    quizState.updateQuiz(
        singleQuiz.value.data.id, // Dodaj wszystkie wymagane parametry
        singleQuiz.value.data.title,
        singleQuiz.value.data.image,
        singleQuiz.value.data.description,
        singleQuiz.value.data.time,
        singleQuiz.value.data.difficulty_id,
        singleQuiz.value.data.category_id,
        quizQuestions.value.data
    )

    newImage.value = singleQuiz.value.data.image,

    setTimeout(async () => {
        isLoading.value = false;
    }, 200);
});

const removeModal = () => {
    isRemove.value = !isRemove.value
}

const goToEditData = () => {
    router.push(`/panel/konto/moje-quizy/${router.currentRoute.value.params.id}/test`)
    // allDataToEdit.value = [{
    //     "dsd": "dfdf",
    //     "image": singleQuiz.value.data.image,
    //     "quizQuestion": quizQuestions.value?.data,
    //     "title": singleQuiz.value.data.title,
    //     "time": singleQuiz.value.data.time,
    //     "description": singleQuiz.value.data.description,
    //     "category_id": singleQuiz.value.data.category_id,
    //     "difficulty": singleQuiz.value.data.difficulty_id,

    //     // title
    //     // time,
    //     // description,
    //     // category_id,
    //     // difficulty
    //  }]
}

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
