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
            <!-- {{ newImageFile }} -->
            <div class="flex flex-col md:flex-row md:place-items-center md:gap-[28px] mt-[34px]">
                <SectionQuizForm :error="showErrorMessage" />
                <!-- <div class="-mt-[120px]"> -->
                <SectionChangeImage />
                <!-- </div> -->
            </div>
            <SectionQuestionsForms :error="showErrorMessage" />
            <SectionQuestionsFormsNew :error="showErrorMessage" />

            <div class="w-[200px] -mb-[70px]">
                <ButtonLoading isLoading="isLoadingButton" @click="onSubmit" :loading="isLoadingButton"
                    :text="isButtonText ? isButtonText : 'Zapisz zmiany'"
                    :class="[isButtonText ? 'button-send-success' : 'button-send']" />
            </div>
        </div>
    </NuxtLayout>
</template>
<script lang="ts" setup>
import { storeToRefs } from "pinia"
import { useQuiz } from "@/stores/useQuiz"
import { useImage } from "@/stores/imageStore"
const axiosInstance = useNuxtApp().$axiosInstance as any
const axiosInstanceData = useNuxtApp().$axiosInstanceData as any

const router = useRouter()
const isLoading = ref(true)
const singleQuiz = ref() as any
const quizQuestionsOriginal = ref()
const quizQuestionsModified = ref()
const isButtonText = ref()
const isLoadingButton = ref(false)
const imageState = useImage()
const { newImage, newImageFile } = storeToRefs(imageState)
const quizState = useQuiz()
const { title, updateQuiz, questionsArrayNew, removedQuestionIndexArray } = quizState
const showErrorMessage = ref<boolean>(false)

onMounted(async () => {
    const quiz = await axiosInstance.get(`quiz/${router.currentRoute.value.params.id}`)
    const questionsResponse = await axiosInstance.get(`quizzes/${router.currentRoute.value.params.id}/data`)

    singleQuiz.value = quiz.data.data;
    quizQuestionsOriginal.value = JSON.parse(JSON.stringify(questionsResponse.data.data))
    quizQuestionsModified.value = questionsResponse.data.data

    updateQuiz(
        singleQuiz.value.id,
        singleQuiz.value.title,
        singleQuiz.value.image,
        singleQuiz.value.description,
        singleQuiz.value.time,
        singleQuiz.value.difficulty_id,
        singleQuiz.value.category_id,
        quizQuestionsModified.value
    );

    newImage.value = singleQuiz.value.image
    isLoading.value = false
})


const updateQuestionTitles = async () => {
    const modifiedQuestions = quizQuestionsModified.value.filter((modifiedQuestion, index) => {
        return modifiedQuestion.question !== quizQuestionsOriginal.value[index].question
    })
    for (const question of modifiedQuestions) {
        const questionData = {
            question: question.question,
        }
        setTimeout(() => {
            isLoadingButton.value = false
        }, 250)
        isButtonText.value = "Zapisano"
        setTimeout(() => {
            isButtonText.value = ""
        }, 2500)
        await axiosInstance.patch(`/questions/${question.id}`, questionData);

    }
}

const updateAnswers = async () => {
    const modifiedAnswers = []
    for (const question of quizQuestionsModified.value) {
        const originalQuestion = quizQuestionsOriginal.value.find(q => q.id === question.id)
        if (originalQuestion) {
            const answersModified = question.answers.filter((modifiedAnswer, index) => {
                return (
                    modifiedAnswer.answer !== originalQuestion.answers[index].answer ||
                    modifiedAnswer.correct !== originalQuestion.answers[index].correct
                );
            });
            modifiedAnswers.push(...answersModified);
        }
    }

    for (const answer of modifiedAnswers) {
        const answerData = {
            answer: answer.answer,
            correct: answer.correct,
        }
        setTimeout(() => {
            isLoadingButton.value = false
        }, 250)
        isButtonText.value = "Zapisano"
        setTimeout(() => {
            isButtonText.value = ""
        }, 2500)
        await axiosInstance.patch(`/answers/${answer.id}`, answerData);
    }
}

const onSubmit = async () => {
    isLoadingButton.value = true
    // try {
    const modifiedData = getModifiedQuizData(singleQuiz.value, quizState.apiDataQuiz());
    if (Object.keys(modifiedData).length > 0) {
        await axiosInstance.patch(`/quizzes/${singleQuiz.value.id}`, modifiedData);
    }

    // console.log(newImage.value)
    // console.log(singleQuiz.value.image)
    if (newImage.value !== singleQuiz.value.image) {
        // image: newImageFile.value
        const quizData = {
            // ...quizState.apiDataQuiz(),
            image: newImageFile.value
        }
        // await axiosInstanceData.patch(`/quizzes/${singleQuiz.value.id}/image`, quizData);

        await axiosInstanceData.post(`/quizzes/${singleQuiz.value.id}/image`, quizData);
        // const newQuiz = await axiosInstanceData.patch('/quizzes', quizData)
        // console.log("inne zdjecia")
    }
    await updateQuestionTitles()
    await updateAnswers()


    //! Nowe pytania i odpowiedzi, musi usuwac tablice [] po wyslaniu 
    if (questionsArrayNew.length >= 1) {
        for (const question of questionsArrayNew) {
            const newQuestionData = ref({ "question": question.question, "quiz_id": singleQuiz.value.id });
            const newQuestion = await axiosInstance.post('/questions', newQuestionData.value)

            for (const answer of question.answers) {
                const newAnswerData = ref({ "answer": answer.answer, "question_id": newQuestion.data.data.id, "correct": answer.isCorrect, });
                await axiosInstance.post('/answers', newAnswerData.value);

            }
        }
    }

    if (removedQuestionIndexArray.length >= 1) {
        for (const removed of removedQuestionIndexArray) {
            await axiosInstance.delete(`/questions/${removed}`)
        }
    }

    const quiz = await axiosInstance.get(`quiz/${router.currentRoute.value.params.id}`)
    const questionsResponse = await axiosInstance.get(`quizzes/${router.currentRoute.value.params.id}/data`)

    singleQuiz.value = quiz.data.data;
    quizQuestionsOriginal.value = JSON.parse(JSON.stringify(questionsResponse.data.data))
    quizQuestionsModified.value = questionsResponse.data.data

    updateQuiz(
        singleQuiz.value.id,
        singleQuiz.value.title,
        singleQuiz.value.image,
        singleQuiz.value.description,
        singleQuiz.value.time,
        singleQuiz.value.difficulty_id,
        singleQuiz.value.category_id,
        quizQuestionsModified.value
    )

    if (newImage.value !== singleQuiz.value.image || questionsArrayNew.length >= 1 || removedQuestionIndexArray.length >= 1) {
        setTimeout(() => {
            isLoadingButton.value = false
        }, 250)
        isButtonText.value = "Zapisano"
        setTimeout(() => {
            isButtonText.value = ""
        }, 2500)
    }
    setTimeout(() => {
        isLoadingButton.value = false
    }, 250)
    // setTimeout(() => {
    //     isLoadingButton.value = false
    // }, 250)
    // isButtonText.value = "Zapisano"
    // setTimeout(() => {
    //     isButtonText.value = ""
    // }, 2500)
    // } catch (error) {
    //     console.error("Błąd podczas aktualizacji tytułów pytań lub odpowiedzi:", error);
    // }
};

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
