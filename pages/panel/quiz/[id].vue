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
                <NuxtLink to="/panel/quiz/" class="left-[20px] top-[23px] absolute z-10 flex place-items-center gap-[1px]">
                    <Icon name="ph:caret-left-bold" size="22" class="text-white" />
                    <p class=" text-white">Quizy</p>
                </NuxtLink>
                <div class="flex  z-10 text-start left-[25px] bottom-[25px] right-[32px] absolute">
                    <p class="text-[17px] font-[500] leading-[26px] text-white">{{ currentQuestionsArray?.question }}</p>
                </div>
                <div class="gradient-overlay"></div>
            </div>
            <div v-if="isNextQuestions?.next_question === null" class="bg-white rounded-[14px] p-[25px] mt-[21px]">
                <p class="text-[18px] font-medium mb-[10px]">{{ isNextQuestions.quiz_id_data }} </p>
                <div class="flex gap-[2px]">
                    <p class="text-gray-600">Czas trwania: </p>
                    <p class="text-base primary-color font-medium">
                        {{ isNextQuestions.quiz_time }} min
                    </p>
                </div>
                <div class="flex gap-[2px] mb-[14px] mt-[2px]">
                    <p class="text-gray-600">Poprawne odpowiedzi: </p>
                    <p class="text-base primary-color font-medium">
                      {{ correctAnswer }}/{{ isNextQuestions.quiz_questions_count }}
                    </p>
                </div>
                <NuxtLink to="/panel/quiz" class="">
                    <button class="button-primary">Wróć do quizów</button>
                </NuxtLink>
            </div>
            <div v-else>
                <div class="flex flex-col gap-[12px] mt-[32px] w-full">
                    <div v-for="(answer, index) in currentQuestionsArray.answers" :key="index">
                        <div class="w-full default-state rounded" @click="sendAnswer(currentQuestionsArray.id, answer.id)"
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
const isNextQuestions = ref()
const correctAnswer = ref<number>(0)

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
    isNextQuestions.value = sendQuestion.data.data
    isGoodAnswer.value = sendQuestion.data.data.is_correct === 1 ? true : false
    isGoodAnswer.value == true ? correctAnswer.value++ : ''
    setTimeout(() => {
        isClick.value = null
        isGoodAnswer.value = null
    }, 350)
    setTimeout(() => {
        currentQuestionsArray.value = sendQuestion.data.data.next_question
    }, 450)

}
</script>
<style lang="scss" scoped>
@import "@/assets/style/variables.scss";

.image-wrapper {
    position: relative;
    width: 100%;
    height: 210px;
    overflow: hidden;
    border-radius: 18px;
}

.image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 18px;
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
    height: 58px;
    border-radius: 8px;
    place-content: center;
    padding-left: 10px;
    font-size: 15px;
    color: white;
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
