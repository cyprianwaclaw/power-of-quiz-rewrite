import { defineStore } from 'pinia';

export const useQuiz = defineStore('quiz', {
    state: () => ({
        isSendSuccess: false as boolean,
        id: '',
        title: '',
        description: '',
        time: '',
        difficulty: '',
        category_id: '',
        questionsArray: [{
            id: '',
            question: '',
            answers: [
                { id: '', answer: '', correct: false },
                { id: '', answer: '', correct: false },
                { id: '', answer: '', correct: false },
                { id: '', answer: '', correct: false }
            ]
        }],
        questionsArrayNew: [] as any,
        removedQuestionIndexArray: [] as any,
        // allDataToEdit: [] as any
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

      
        updateQuiz(id: any, title: string, image: any, description: string, time: any, difficulty: string, category_id: any, questionsArray: any) {
            this.id = id;
            this.title = title;
            this.description = description;
            this.time = time;
            this.difficulty = difficulty;
            this.category_id = category_id;
            this.questionsArray = questionsArray;
        },

        isAllData(): boolean {
            const { title, category_id, difficulty, time, description } = this;

            const hasBasicData = Object.values({ title, category_id, difficulty, time, description })
                .every(value => value !== null && value !== '' && value !== undefined);

            const questionsValid = this.questionsArray.every(question => {
                const hasquestion = question.question.trim().length > 0;
                const allAnswersFilled = question.answers.every(answer => answer.answer.trim().length > 0);
                const hasCorrectAnswer = question.answers.some(answer => answer.correct);
                return hasquestion && allAnswersFilled && hasCorrectAnswer;
            })

            return hasBasicData && questionsValid;
        },


        async questionsAndAnswersSubmit1(axiosMethod: 'post' | 'patch', questionsArray: any[]) {
            try {
                const axiosInstance = useNuxtApp().$axiosInstance as any;

                for (const question of questionsArray) {
                    const newQuestionData = { "question": question.question, "quiz_id": this.id };
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
                // this.errorState = true;
            }
        },
        async addQuestionsAndAnswers(questionsArray: any) {
            const axiosInstance = useNuxtApp().$axiosInstance as any
            try {
                for (const question of questionsArray) {
                    const newQuestionData = ref({ "question": question.question, "quiz_id": this.id });
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
                // this.errorState = true;
            }
        }


    }
})
