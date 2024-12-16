<template>
    <div class="mb-11">
        <div v-for="(single, questionIndex) in questionsArray" :key="questionIndex"
            class=" bg-white pt-7 pb-8 px-2 mt-7 rounded-[24px] relative">
            <div class="flex justify-between place-items-center mx-[21px]">
                <p class="font-semibold text-[18px]">Pytanie {{ questionIndex + 1 }}</p>
                <div class="w-[48px] h-[48px] absolute right-3 mt-3 " v-if="questionsArray.length >= 2"
                    @click="removeQuestion(questionIndex)">
                    <Icon name="carbon:close" size="30"
                        class="text-error-notification close border-transparent rounded-[6px]" />
                </div>
            </div>
            <div class="mr-[28px] ml-5">
                <textarea v-model="single.title" wrap="soft" rows="1" class=" w-full mt-3 "
                    :ref="(el) => setTitleTextareaRef(questionIndex, el)"
                    @input="resizeTitleTextarea(titleTextareas, questionIndex)" placeholder="Pytanie..." />
                <div v-if="(isSend || props.error) && single.title.length > 120" class="mt-2 mb-1">
                    <p class="text-error-notification">Pytanie nie moźe być dłuższe niż 120 znaków</p>
                </div>
                <div v-if="single.title.length > 0 && single.answers.filter((answer) => answer.answer.trim().length > 0).length == 0"
                    class="mt-2 mb-1">
                    <p class="text-error-notification">Uzupełnij odpowiedzi i zaznacz poprawną</p>
                </div>
            </div>
            <div v-for="(answer, answerIndex) in single.answers" :key="answerIndex"
                :class="answerIndex === 3 ? 'row-table-end' : 'row-table-start'">
                <!-- {{ answer.answer }} -->
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
                <div v-if="(isSend || props.error) && answer.answer.length > 120" class="mt-2 mb-1">
                    <p class="text-error-notification">Odpowiedź nie moźe być dłuższa niż 120 znaków</p>
                </div>
            </div>
            <div class="mt-3 ml-[28px]" v-if="(isSend || props.error) && isAllFalse(questionIndex)">
                <p class="text-error-notification">Uzupełnij tytuł, odpowiedzi i zaznacz poprawną</p>
            </div>
        </div>
        <div class="w-full flex justify-end mt-8">
            <button @click="addQuestion" class="primary-color font-semibold text-[18px]">Następne pytanie</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCompetition } from "@/stores/useCompetition"

const quizState = useCompetition()
const { questionsArray, removedQuestionIndexArray } = storeToRefs(quizState)
const router = useRouter()
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
    questionsArray.value[questionIndex].answers.forEach((answer: any, idx: number) => {
        answer.isCorrect = (idx === answerIndex)
    })
}


const validateQuestion = (questionIndex: number): boolean => {
    const question = questionsArray.value[questionIndex];

    // Sprawdzenie, czy tytuł jest za długi
    if (question.title.length > 120) {
        return false;
    }

    // Sprawdzenie, czy którakolwiek odpowiedź jest za długa
    for (const answer of question.answers) {
        if (answer.answer.length > 120) {
            return false;
        }
    }

    // Sprawdzenie, czy tytuł jest podany, ale wszystkie odpowiedzi są puste
    if (question.title.length > 0 && question.answers.filter((answer) => answer.answer.trim().length > 0).length === 0) {
        return false
    }

    // Sprawdzenie, czy żadna odpowiedź nie jest zaznaczona jako poprawna
    if (isAllFalse(questionIndex)) {

        return false
    }
    return true
}

const validateAllQuestions = (): boolean => {
    // Przechodzimy przez wszystkie pytania i walidujemy każde z osobna
    for (let i = 0; i < questionsArray.value.length; i++) {
        if (!validateQuestion(i)) {
            // Jeśli któreś pytanie nie przejdzie walidacji, zwracamy fałsz
            return false;
        }
    }
    return true
}


const addQuestion = () => {
    isSend.value = true
    if (validateAllQuestions()) {

        isSend.value = false
        questionsArray.value.push({
            id: '',
            title: '',
            answers: [
                { id: '', answer: '', isCorrect: false },
                { id: '', answer: '', isCorrect: false },
                { id: '', answer: '', isCorrect: false },
                { id: '', answer: '', isCorrect: false }
            ]
        })
    }
}

const isAllFalse = (questionIndex: any): boolean => {
    const question = questionsArray.value[questionIndex];
    const answers = question.answers;

    // Wyświetlenie odpowiedzi w konsoli
    console.log("Odpowiedzi:", answers.map((answer: any) => answer.answer));

    // Sprawdzenie, ile odpowiedzi jest uzupełnionych
    const filledAnswersCount = answers.filter((answer: any) => answer.answer.trim().length > 0).length;

    // Sprawdzenie, czy wszystkie odpowiedzi są uzupełnione
    const allFilled = filledAnswersCount === answers.length;

    // Sprawdzenie, czy żadna odpowiedź nie jest poprawna
    const allIncorrect = answers.every((answer: any) => !answer.isCorrect);

    // Zwracanie błędu, jeśli chociaż jedna odpowiedź jest uzupełniona, a inne nie
    if (filledAnswersCount > 0 && !allFilled) {
        console.log("Błąd: Nie wszystkie odpowiedzi są uzupełnione.");
        return true; // Zwraca błąd
    }

    // Zwrócenie błędu, jeśli wszystkie odpowiedzi są uzupełnione, ale żadna nie jest poprawna
    if (allFilled && allIncorrect) {
        console.log("Błąd: Wszystkie odpowiedzi są uzupełnione, ale żadna nie jest poprawna.");
        return true; // Zwraca błąd
    }

    // Sprawdzenie, czy tytuł pytania jest pusty tylko jeśli są uzupełnione odpowiedzi
    if (filledAnswersCount > 0 && question.title.trim().length === 0) {
        console.log("Błąd: Tytuł pytania nie jest uzupełniony.");
        return true; // Zwraca błąd, jeśli tytuł jest pusty
    }

    return false; // Brak błędów
};


const removeQuestion = (index: any) => {
    const removedQuestionIndex = questionsArray.value[index].id
    removedQuestionIndexArray.value.push(removedQuestionIndex)
    questionsArray.value.splice(index, 1)
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