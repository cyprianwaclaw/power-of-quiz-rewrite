<template>
    <div class="w-full flex-col justify-center mx-auto md:w-[700px]">
        <NuxtLink to="/panel/quiz?section=konkursy" class="flex md:hidden place-items-center -mt-[10px] mb-[18px]">
            <Icon name="ph:caret-left-bold" size="22" class="primary-color back-arrow" />
            <p class="go primary-color">Konkursy</p>
        </NuxtLink>
        <p class="md:flex hidden text-[19px] font-semibold my-[15px]">
            {{ router.currentRoute.value.query.name }}
        </p>
        <div class="image-wrapper h-[210px] md:h-[350px]">
            <img :src="competitionSubmissionCookie.info?.image" />
        </div>
        <p class="md:flex hidden text-[19px] font-semibold mt-[32px]">
            {{ currentQuestionsArray?.question }}
        </p>
        <div v-if="currentQuestionsArray ? true : false"
            class="flex flex-col gap-[10px] mt-[16px] w-full md:grid md:grid-cols-2">
            <div v-for="(answer, index) in currentQuestionsArray?.answers" :key="index">
                <div class="w-full default-state rounded" @click="sendAnswer(currentQuestionsArray.id, answer.id)" :class="[
                    isClick === answer.id && isGoodAnswer === false ? 'bad-answer' : '',
                    isClick === answer.id && isGoodAnswer === true ? 'good-answer' : '',
                ]">
                    {{ answer.answer }}
                </div>
            </div>
        </div>
        <div v-else class="bg-white p-[21px] rounded-xl">
            <p class="primary-color font-medium text-[18px]">Rozwiązano konkurs</p>
            <p class="mt-[7px]">
                Po zakończymym konkursie zostaną ogłoszone wyniki, śledź informacje <NuxtLink
                    to="/panel/konto/konkursy?name=wyniki" class="underline">TUTAJ
                </NuxtLink>
            </p>
        </div>
    </div>
</template>
<script lang="ts" setup>
import gsap from 'gsap'
const router = useRouter()
const axiosInstance = useNuxtApp().$axiosInstance as any
const competitionSubmissionCookie = useCookie('competition_submission') as any

definePageMeta({
    middleware: "auth",
})

useSeoMeta({
    title: () => `Konkurs - ${router.currentRoute.value.query?.name}`, // Dynamiczny tytuł
    ogTitle: 'Pakiet premium',
    description: competitionSubmissionCookie.value.info,
    ogDescription: competitionSubmissionCookie.value.info,
    ogImage: competitionSubmissionCookie.info?.image,
    twitterCard: 'summary_large_image',
})

const competitionId = ref(router.currentRoute.value.params.id)
const isLoading = ref(true)
const isClick = ref<number | null>(null)
const isGoodAnswer = ref<boolean | null>(null)
const currentQuestionsArray = ref() as any
const isNextQuestions = ref()

onMounted(async () => {
    // ! rozwizaujemu konkurs
    currentQuestionsArray.value = competitionSubmissionCookie.value.first_question
    setTimeout(() => {
        isLoading.value = false
    }, 300)

    // ! nie wolno grac
})

const sendAnswer = async (questionId: number, answerId: number) => {
    isClick.value = answerId
    const sendQuestion = await axiosInstance.post(`/competition/submission/${competitionSubmissionCookie.value.submission_id}/answerQuestion`, {
        question_id: questionId,
        answer_id: answerId
    })
    isNextQuestions.value = sendQuestion.data
    isGoodAnswer.value = sendQuestion.data.is_correct
    setTimeout(() => {
        isClick.value = null
        isGoodAnswer.value = null
    }, 350)
    setTimeout(() => {
        currentQuestionsArray.value = sendQuestion.data.next_question
    }, 450)

}
</script>
<style lang="scss" scoped>
@import "@/assets/style/variables.scss";

.image-wrapper {
    position: relative;
    width: 100%;
    overflow: hidden;
    border-radius: 18px;
}

.go {
    font-weight: 500;
    font-size: 17px;
    line-height: 22px;
    margin-left: 2px;
}

.image {
    width: 100%;
    height: 170px;
    object-fit: cover;
    border-radius: 12px;
}

.gradient-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(15deg, rgb(26, 26, 26) 17%, rgba(0, 0, 0, 0) 100%);
}

.bad-answer {
    background: $color-error !important;
}

.good-answer {
    background: $color-success !important;
}


.default-state {
    background: $primary;
    height: 62px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    padding-left: 10px;
    font-size: 15px;
    color: white;
    cursor: pointer;

    &:hover {
        background: lighten($primary, 5%);
    }

    @media (max-width: 768px) {
        font-size: 14px;
        font-weight: 500;
        padding-left: 14px;
        justify-content: start;
        height: 50px;
    }
}

.is-loading {

    .image {
        background: linear-gradient(110deg, #c7c7c7 8%, #d4d4d4 18%, #c7c7c7 33%);
        border-radius: 12px;
        background-size: 300% 100%;
        animation: 1.6s shine linear infinite;
    }

    .questions {
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
