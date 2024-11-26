import { defineStore } from 'pinia';

export const useCompetition = defineStore('competition', {
    state: () => ({
        errorState: true as boolean,
        isSendSuccess: false as boolean,
        id: '',
        title: '',
        image: '',
        description: '',
        time: '',
        difficulty: '',
        category_id: '',
        questionsArray: [{
            id: '',
            title: '',
            answers: [
                { id: '', answer: '', isCorrect: false },
                { id: '', answer: '', isCorrect: false },
                { id: '', answer: '', isCorrect: false },
                { id: '', answer: '', isCorrect: false }
            ]
        }],
        questionsArrayNew: [] as any,
        removedQuestionIndexArray: [] as any,
        newImageFile: '' as any,
        newImage: '' as any,

    }),

    actions: {
        apiDataQuiz() {
            return {
                title: this.title,
                description: this.description,
                time: this.time,
                difficulty: this.difficulty,
                category_id: this.category_id
            };
        },

        updateQuizData(data: { id: any, title: string; image: any; description: string; time: any; difficulty: string; category_id: any, questionsArray: any }) {
            this.id = data.id;
            this.title = data.title;
            this.image = data.image;
            this.description = data.description;
            this.time = data.time;
            this.difficulty = data.difficulty;
            this.category_id = data.category_id;
            this.questionsArray = data.questionsArray;
        },

        saveImage(image: any) {
            this.image = image;
        },
        
        async questionsAndAnswersSubmit1(axiosMethod: 'post' | 'patch', questionsArray: any[]) {
            try {
                const axiosInstance = useNuxtApp().$axiosInstance as any;

                for (const question of questionsArray) {
                    const newQuestionData = { "question": question.title, "quiz_id": this.id };
                    let newQuestion;
                    if (axiosMethod == 'post') {
                        newQuestion = await axiosInstance.post(`/questions`, newQuestionData);
                    }
                    else {
                        await axiosInstance.patch(`/questions/${question.id}`, newQuestionData);

                    }
                    for (const answer of question.answers) {
                        const newAnswerData = {
                            "answer": answer.answer,
                            "question_id": newQuestion.data.data.id,
                            "correct": answer.isCorrect,
                        }
                        await axiosInstance.post('/answers', newAnswerData);
                    }
                }
            } catch (error) {
                console.error("Wystąpił błąd podczas aktualizacji pytań i odpowiedzi:", error);
                this.errorState = true;
            }
        },
        async addQuestionsAndAnswers(questionsArray: any) {
            const axiosInstance = useNuxtApp().$axiosInstance as any
            try {
                for (const question of questionsArray) {
                    const newQuestionData = ref({ "question": question.title, "quiz_id": this.id });
                    const newQuestion = await axiosInstance.post(`/questions`, newQuestionData.value);
                    for (const answer of question.answers) {
                        const newAnswerData = ref({
                            "answer": answer.answer,
                            "question_id": newQuestion.data.data.id,
                            "correct": answer.isCorrect,
                        })
                        await axiosInstance.post('/answers', newAnswerData.value);
                    }
                }
            } catch (error) {
                console.error("Wystąpił błąd podczas aktualizacji pytań i odpowiedzi:", error);
                this.errorState = true;
            }
        }


    }
})
