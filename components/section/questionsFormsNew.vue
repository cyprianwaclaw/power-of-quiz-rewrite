<template>
    <div class="mb-11">
        <div v-for="(single, questionIndex) in questionsArrayNew" :key="questionIndex"
            class=" bg-white pt-7 pb-8 px-2 mt-7 rounded-[24px] relative">
            <div class="flex justify-between place-items-center mx-[21px]">
                <p class="font-semibold text-[18px]">Pytanie {{ questionsArray.length  + 1 }}</p>
                <div class="w-[48px] h-[48px] absolute right-3 mt-3 " v-if="questionsArrayNew.length >= 2 || questionsArray.length >= 2"
                    @click="removeQuestion(questionIndex)">
                    <Icon name="carbon:close" size="30"
                        class="text-error-notification close border-transparent rounded-[6px]" />
                </div>
            </div>
            <div class="mr-[28px] ml-5">
                <textarea v-model="single.title" wrap="soft" rows="1" class=" w-full mt-3 "
                    :ref="(el) => setTitleTextareaRef(questionIndex, el)"
                    @input="resizeTitleTextarea(titleTextareas, questionIndex)" placeholder="Pytanie..." />
                <div v-if="(isSend || props.error) && single?.title?.length < 3" class="mt-2 mb-1">
                    <p class="text-error-notification">Wprowadź min 3 znaki</p>
                </div>
                <div v-if="(isSend || props.error) && single?.title?.length > 120" class="mt-2 mb-1">
                    <p class="text-error-notification">Pytanie nie moźe być dłuższe niż 120 znaków</p>
                </div>
            </div>
            <div v-for="(answer, answerIndex) in single?.answers" :key="answerIndex"
                :class="answerIndex === 3 ? 'row-table-end' : 'row-table-start'">
                <div class="flex place-items-center mr-[23px]">
                    <div class="w-[44px] h-[44px] mr-[7px] flex justify-center items-center"
                        @click="selectAnswer(questionIndex, answerIndex)">
                        <Icon :name="answer.isCorrect ? 'ph:check-circle-duotone' : 'ph:check-circle'"
                            :color="answer.isCorrect ? '#4BB21A' : '#9a9a9a'" size="25" />
                    </div>
                    <textarea class="scrollbar-hide" v-model="answer.answer" wrap="soft" rows="1"
                        :ref="(el) => setTextareaRef(questionIndex, answerIndex, el)"
                        @input="resizeTextarea(textareas, questionIndex, answerIndex)" placeholder="Odpowiedź..." />
                </div>
                <div v-if="(isSend || props.error) && answer.answer.length < 3" class="mt-2 mb-1">
                    <p class="text-error-notification">Wprowadź min 3 znaki</p>
                </div>
                <div v-if="(isSend || props.error) && answer.answer.length > 120" class="mt-2 mb-1">
                    <p class="text-error-notification">Odpowiedź nie moźe być dłuższa niż 120 znaków</p>
                </div>
            </div>
            <div class="mt-3 ml-[28px]" v-if="(isSend || props.error) && isAllFalse(questionIndex)">
                <p class="text-error-notification">Zaznacz poprawną odpowiedź</p>
            </div>
        </div>
        <div class="w-full flex justify-end mt-8">
            <button @click="addQuestion" class="primary-color font-semibold text-[18px]">Dodaj pytanie</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useQuiz } from "@/stores/useQuiz"

const quizState = useQuiz()
const { errorState, questionsArrayNew, questionsArray } = storeToRefs(quizState)

const textareas = ref<Record<string, HTMLTextAreaElement | null>>({});
const titleTextareas = ref<Record<number, HTMLTextAreaElement | null>>({});

const props = defineProps({
    error: {
        type: Boolean,
        required: true
    }
})

const isSend = ref(false)

const setTextareaRef = (questionIndex: any, answerIndex: any, el: any) => {
    textareas.value[`${questionIndex}-${answerIndex}`] = el
};

const setTitleTextareaRef = (questionIndex: any, el: any) => {
    titleTextareas.value[questionIndex] = el
}


const selectAnswer = (questionIndex: any, answerIndex: any) => {
    questionsArrayNew.value[questionIndex].answers.forEach((answer: any, idx: number) => {
        answer.isCorrect = (idx === answerIndex)
    })
}


const validateQuestion = (questionIndex: number): boolean => {
    const question = questionsArrayNew.value[questionIndex];

    if (question.title.length < 3 || question.title.length > 120) {
        errorState.value = true;
        return false;
    }

    for (const answer of question.answers) {
        if (answer.answer.length < 3 || answer.answer.length > 120) {
            errorState.value = true;
            return false;
        }
    }

    if (isAllFalse(questionIndex)) {
        errorState.value = true;
        return false;
    }

    return true;
};

const validateAllQuestions = (): boolean => {
    errorState.value = false;
    for (let i = 0; i < questionsArrayNew.value.length; i++) {
        if (!validateQuestion(i)) {
            return false;
        }
    }

    return true;
};

const addQuestion = () => {
    isSend.value = true
    if (validateAllQuestions()) {
        errorState.value = true;
        isSend.value = false
        questionsArrayNew.value.push({
            title: '',
            answers: [
                { answer: '', isCorrect: false },
                { answer: '', isCorrect: false },
                { answer: '', isCorrect: false },
                { answer: '', isCorrect: false }
            ]
        });
    }
}

const isAllFalse = (questionIndex: any): boolean => {
    return questionsArrayNew.value[questionIndex].answers.every((answer: any) => !answer.isCorrect);
};

const removeQuestion = (index: any) => {
    questionsArrayNew.value.splice(index, 1)
}

</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";

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