<template>
    <NuxtLayout name="account" arrowText="Moje quizy">
        <p class="font-bold text-[13px] mt-10"
            :class="singleQuiz?.data.status == true ? 'text-[#4BB21A]' : 'text-[#E1A817]'">
            {{ singleQuiz?.data.status
                ? 'Aktywny' : 'W oczekiwaniu' }}</p>
        <p class="font-semibold text-[23px] leading-[28px] mt-[6px]"> {{ singleQuiz?.data.title }}</p>
        <div class="w-full">
            <div v-if="isLoading">
                <div class="is-loading">
                    <div class="image" />
                </div>
            </div>
            <img v-show="!isLoading" :src="singleQuiz?.data.image" class="image" />
        </div>
        <div class="bg-white rounded-[18px] p-[30px]">
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
        <div class="bg-white rounded-[18px] p-[30px] mt-[27px]">
            <CardQuizQuestions :questions="quizQuestions?.data" :n="14" :isLoading="isLoading" />
        </div>
        <div class="flex justify-end items-end mt-8 gap-[2px]">
            <p class="text-red-600 px-[23px] py-[10px] font-semibold" @click="removeModal()">Usuń</p>
            <NuxtLink :to="`/panel/konto/moje-quizy/${router.currentRoute.value.params.id}/edycja`">
                <button class="button-primary">
                    Edytuj
                </button>
            </NuxtLink>
        </div>
    </NuxtLayout>
</template>
<script lang="ts" setup>
import { storeToRefs } from "pinia"
import { useUser } from "@/stores/useUser"
const axiosInstance = useNuxtApp().$axiosInstance as any

const route = useRoute()
const router = useRouter()
const isLoading = ref(true)
const singleQuiz = ref() as any
const quizQuestions = ref() as any
const userState = useUser();
const { user } = storeToRefs(userState);
const isRemove = ref(false)

onMounted(async () => {
    const questions = await axiosInstance.get(`quizzes/${router.currentRoute.value.params.id}/data`);
    const quiz = await axiosInstance.get(`quiz/${router.currentRoute.value.params.id}`);
    singleQuiz.value = quiz.data;
    quizQuestions.value = questions.data;

    localStorage.setItem('quizData', JSON.stringify(quiz.data.data));
    localStorage.setItem('quizQuestions', JSON.stringify(questions.data.data));

    setTimeout(async () => {
        isLoading.value = false;
    }, 200);
});

const removeModal = () => {
    isRemove.value = !isRemove.value
}
</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";

.image {
    border: 1px solid $border;
    border-radius: 12px;
    margin-bottom: 27px;
    margin-top: 24px;
    object-fit: cover;
    width: 100%;
    height: 275px;

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
