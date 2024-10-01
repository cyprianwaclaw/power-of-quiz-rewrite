<template>
    <div class="relative">
        <div v-if="isLoading">
            <div class="is-loading">
                <div class="image" />
                <div class="mt-10">
                    <div class="questions" />
                    <div class="questions" />
                </div>
            </div>
        </div>
        <div v-else>
            <div class="image-wrapper">
                <img :src="getSingleQuizById.data.data?.image" class="image" />
                <div class="gradient-overlay"></div>
            </div>
            <div class="flex w-full justify-center text-center px-[28px] mt-[23px]">
                <p class="text-[20px] font-[600] leading-[27px]">{{ currentQuestionsArray.question }}</p>
            </div>
            <div class="grid grid-rows-2 grid-flow-col gap-4 mt-[44px] px-[28px]">
                <div v-for="(answer, index) in currentQuestionsArray.answers" :key="index">
                    <div class="w-full border-own rounded p-2" @click="sendAnswer(currentQuestionsArray.id, answer.id)"
                        :class="[
                            isClick === answer.id && isGoodAnswer === false ? 'bad-answer' : '',
                            isClick === answer.id && isGoodAnswer === true ? 'good-answer' : '',
                        ]">
                        {{ answer.answer }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import gsap from 'gsap'
const router = useRouter()
const axiosInstance = useNuxtApp().$axiosInstance as any
const quizSubmissionCookie = useCookie('quiz_submission') as any

const quizId = ref(router.currentRoute.value.params.id)
const isLoading = ref(true)
const isClick = ref<number | null>(null)
const isGoodAnswer = ref<boolean | null>(null)
const currentQuestionsArray = ref() as any
const getSingleQuizById = await axiosInstance.get(`/quizzes/${quizId.value}`)

onMounted(async () => {
    if (quizSubmissionCookie.value?.quiz_id == quizId.value) {
        // !gramy w quiz ze strony 'quizy'
        const getNextQuestion = await axiosInstance.get(`/quiz/submission/${quizSubmissionCookie.value.submission_id}/getNextQuestion`)
        currentQuestionsArray.value = getNextQuestion.data.data
        setTimeout(() => {
            isLoading.value = false
        }, 300)
    } else {
        // !gramy w quiz, do którego mamy link
        const newQuiz = await axiosInstance.get(`/quiz/${quizId.value}/start`)
        const submissionData = {
            submission_id: newQuiz.data.data.submission_id,
            quiz_id: router.currentRoute.value.params.id
        }
        quizSubmissionCookie.value = JSON.stringify(submissionData)
        currentQuestionsArray.value = newQuiz.data.data.next_question
        setTimeout(() => {
            isLoading.value = false
        }, 300)
    }
})

const sendAnswer = async (questionId: number, answerId: number) => {
    isClick.value = answerId
    const sendQuestion = await axiosInstance.post(`/quiz/submission/${quizSubmissionCookie.value.submission_id}/answerQuestion`, {
        question_id: questionId,
        answer_id: answerId
    })
    isGoodAnswer.value = sendQuestion.data.data.is_correct === 1 ? true : false
    setTimeout(() => {
        isClick.value = null
        isGoodAnswer.value = null
    }, 500)
    setTimeout(() => {
        currentQuestionsArray.value = sendQuestion.data.data.next_question
    }, 700)

}
</script>
<style lang="scss" scoped>
@import "@/assets/style/variables.scss";

.image-wrapper {
    position: relative;
    width: 100%;
    height: 285;
    overflow: hidden;
    border-radius: 0px 0px 32px 32px;
}

.image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0px 0px 45px 45px;
}

.gradient-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(150deg, rgb(26, 26, 26) 10%, rgba(0, 0, 0, 0) 100%);
    // mix-blend-mode: overlay;
    // pointer-events: none; /* Zapobiega interakcji z gradientem */
    // filter: blur(8px); /* Dodaj rozmycie */
}

.bad-answer {
    border: 2px solid $color-error !important;
}

.good-answer {
    border: 2px solid $color-success !important;
}

.border-own {
    border: none;
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
