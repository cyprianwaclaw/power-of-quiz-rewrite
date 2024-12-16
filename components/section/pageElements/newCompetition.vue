
<template>
    <div>
        <!-- {{ questionsArray[0].title ? true : false }} -->
        <SectionCompetitionForm :error="showErrorMessage" />
        <SectionChangeImage />
        <div v-if="showErrorMessage && (newImageFile ? false : true)" class="mb-[32px] -mt-[24px]">
            <p class="text-error-notification">Wybierz zdjęcie konkursu</p>
        </div>
        <div v-if="allQuestions.data?.length > 0">
            <div class="bg-white pt-[28px] pb-[8px] pl-[28px] border-transparent rounded-[24px]">
                <div class="flex justify-between pr-[21px]">
                    <p class="font-semibold text-[18px] mb-[27px]">
                        Wybierz pytania
                    </p>
                    <SectionPaginationQuestions :last_page="allQuestions?.pagination?.last_page"
                        :current_page="allQuestions?.pagination?.current_page" :isLoading="isLoading" />
                </div>
                <div v-for="(question, index) in allQuestions.data" :key="index"
                    class="flex items-center mb-[23px] pb-[10px]  w-full"
                    :class="allQuestions.data.length == index + 1 ? 'border-b border-b-white' : 'border-b border-b-slate-200'">
                    <div class="flex gap-[10px] place-items-start pr-[28px]">
                        <input type="checkbox" class="w-5 h-4 shrink-0" v-model="question.checked"
                            @change="selectQuestion(question.id, question.checked)" :id="`question-${question.id}`" />
                        <label class="w-full " :for="`question-${question.id}`">{{ question.question }}</label>
                    </div>
                </div>
            </div>
        </div>
        <SectionCompetitionQuestionsForms :array="Array" :error="showErrorMessage" />
    </div>
    <div v-if="showErrorMessage && (selectedQuestionsArray.length > 0 || questionsArray[0].title ? false : true)"
        class="mb-[18px] -mt-[13px]">
        <p class="text-error-notification">Brak pytań w konkursie</p>
    </div>
    <div class="w-full -mb-[70px]">
        <ButtonLoading isLoading="false" @click="onSubmit" :loading="isLoadingButton"
            :text="isButtonText ? isButtonText : 'Dodaj konkurs'"
            :class="[isButtonText ? 'button-send-success' : 'button-send']" />
    </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useCompetition } from "@/stores/useCompetition";
import { useImage } from "@/stores/imageStore"

const imageState = useImage()
const { newImageFile, newImage } = storeToRefs(imageState)
const axiosInstance = useNuxtApp().$axiosInstance as any;
const axiosInstanceData = useNuxtApp().$axiosInstanceData as any;
const quizState = useCompetition();
const { questionsArray, isSendSuccess, isSelectedQuestionsArray } = storeToRefs(quizState);
const route = useRoute();
const showErrorMessage = ref<boolean>(false);
const isLoadingButton = ref(false);
const isButtonText = ref<string | undefined>();
const allQuestions = ref<any>({
    data: [],
    pagination: {
        last_page: 1,
        current_page: 1,
    },
})
const isLoading = ref(true);
const selectedQuestionsArray = ref<number[]>([])


const selectQuestion = (id: number, checked: boolean) => {
    if (checked) {
        if (!selectedQuestionsArray.value.includes(id)) {
            selectedQuestionsArray.value.push(id) // Dodaj ID do tablicy
        }
    } else {
        const index = selectedQuestionsArray.value.indexOf(id)
        if (index !== -1) {
            selectedQuestionsArray.value.splice(index, 1); // Usuń ID z tablicy
        }
    }
}

watch(selectedQuestionsArray.value, (newValue) => {
    newValue.length == 0 ? isSelectedQuestionsArray.value = false : isSelectedQuestionsArray.value = true;
})

const fetchQuestions = async (query = route.query) => {
    const res = await axiosInstance.get(`questions/all?${formatQueryString(query)}&per_page=5`);
    allQuestions.value = res.data || { data: [], pagination: { last_page: 1, current_page: 1 } };
    allQuestions.value.data.forEach((question: any) => {
        question.checked = selectedQuestionsArray.value.includes(question.id); // Ustaw zaznaczenie na podstawie tablicy
    })
}

const onSubmit = async () => {
    showErrorMessage.value = true
    isLoadingButton.value = true

    // // if (quizState.isAllData() && newImageFile.value ? true : false) {
    // if (quizState.isAllData()) {

    //     console.log('All data are available')
    // } else {
    //     console.log('Not all data are available')

    // }
    if (quizState.isAllData() && newImageFile.value ? true : false) {
        console.log('All data are available')

        const competitionData = {
            ...quizState.apiDataQuiz(),
            image: newImageFile.value
        }

        const newQuiz = await axiosInstanceData.post('/competition/new', competitionData)
        for (const question of questionsArray.value) {
            const newQuestionData = ref({ "question": question.title, "competition_id": newQuiz.data.competition_id })

            try {
                if (questionsArray.value[0].title ? true : false) {
                    const newQuestion = await axiosInstance.post('/questions', newQuestionData.value);

                    for (const answer of question.answers) {
                        const newAnswerData = ref({ "answer": answer.answer, "question_id": newQuestion.data.data.id, "correct": answer.isCorrect });
                        await axiosInstance.post('/answers', newAnswerData.value);
                    }
                }

                await axiosInstance.post(`competition/${newQuiz.data.competition_id}/addQuestions`, {
                    "questions": selectedQuestionsArray.value
                })

                setTimeout(() => {
                    isLoadingButton.value = false;
                    setTimeout(async () => {
                        isLoading.value = true;
                        await fetchQuestions();
                        isLoading.value = false;
                        isButtonText.value = "Wysłano!";
                        quizState.$reset();
                        newImageFile.value = null
                        showErrorMessage.value = false;
                        isSendSuccess.value = true;
                    }, 20);
                }, 1000);

                setTimeout(() => {
                    isButtonText.value = "";
                }, 3100);
            } catch (error) {
                console.error("Error:", error);
            }
        }
    } else {
        scrollToTop();
        isLoadingButton.value = false;
    }

    // if (errorState.value === false && (newImageFile.value ? true : false)) {

    //     const competitionData = {
    //         ...quizState.apiDataQuiz(),
    //         image: newImageFile.value
    //     }
    //     const newQuiz = await axiosInstanceData.post('/competition/new', competitionData)
    //     for (const question of questionsArray.value) {
    //         const newQuestionData = ref({ "question": question.title, "competition_id": newQuiz.data.competition_id });
    //         try {
    //             const newQuestion = await axiosInstance.post('/questions', newQuestionData.value);

    //             for (const answer of question.answers) {
    //                 const newAnswerData = ref({ "answer": answer.answer, "question_id": newQuestion.data.data.id, "correct": answer.isCorrect });
    //                 await axiosInstance.post('/answers', newAnswerData.value);
    //             }
    //             await axiosInstance.post(`competition/${newQuiz.data.competition_id}/addQuestions`, {
    //                 "questions": selectedQuestionsArray.value
    //             })

    //             setTimeout(() => {
    //                 isLoadingButton.value = false;
    //                 setTimeout(async () => {
    //                     isLoading.value = true;
    //                     await fetchQuestions();
    //                     isLoading.value = false;
    //                     isButtonText.value = "Wysłano!";
    //                     quizState.$reset();
    //                     newImageFile.value = null
    //                     showErrorMessage.value = false;
    //                     isSendSuccess.value = true;
    //                 }, 20);
    //             }, 1000);

    //             setTimeout(() => {
    //                 isButtonText.value = "";
    //             }, 3100);
    //         } catch (error) {
    //             console.error("Error:", error);
    //         }
    //     }
    // } else {
    //     scrollToTop();
    //     isLoadingButton.value = false;
    // }
};

onMounted(async () => {
    isLoading.value = true;
    newImageFile.value = null
    newImage.value = null
    await fetchQuestions();
    isLoading.value = false;
});

onBeforeRouteUpdate(async (to) => {
    isLoading.value = true;
    await fetchQuestions(to.query);
    isLoading.value = false;
});
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