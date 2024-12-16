import { defineStore } from 'pinia';

export const useCompetition = defineStore('competition', {
    state: () => ({
        isSendSuccess: false as boolean,
        id: '',
        title: '',
        description: '',
        time: '',
        difficulty: '',
        category_id: '',
        first_points: '',
        second_points: '',
        third_points: '',
        time_start: '',
        time_end: '',
        isSelectedQuestionsArray: false as boolean,
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
    }),

    actions: {
        apiDataQuiz() {
            const formatDateTime = (date: Date, time: Date): string => {
                const pad = (num: number) => String(num).padStart(2, '0');

                const year = time.getFullYear();
                const month = pad(time.getMonth() + 1);
                const day = pad(time.getDate());
                const hours = pad(date.getHours());
                const minutes = pad(date.getMinutes());
                const seconds = pad(date.getSeconds());

                return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
            };

            return {
                title: this.title,
                description: this.description,
                difficulty: this.difficulty,
                category_id: this.category_id,
                time_start: this.time_start ? formatDateTime(new Date(this.time_start), new Date(this.time)) : null,
                time_end: this.time_end ? formatDateTime(new Date(this.time_end), new Date(this.time)) : null,
                first_points: this.first_points,
                second_points: this.second_points,
                third_points: this.third_points,
            };
        },

        isAllData(): boolean {
            const { title, category_id, difficulty, first_points, second_points, third_points, time, time_start, time_end, description } = this;

            // Sprawdzanie podstawowych danych
            const hasBasicData = Object.values({ title, category_id, difficulty, first_points, second_points, third_points, time, time_start, time_end, description })
                .every(value => value !== null && value !== '' && value !== undefined);

            // Logika walidacji questionsArray
            const questionsValid = this.questionsArray.length > 0
                ? this.questionsArray.every(question => {
                    const hasTitle = question.title.trim().length > 0;
                    const allAnswersFilled = question.answers.every(answer => answer.answer.trim().length > 0);
                    const hasCorrectAnswer = question.answers.some(answer => answer.isCorrect);
                    return hasTitle && allAnswersFilled && hasCorrectAnswer;
                })
                : false; // Jeśli tablica jest pusta, zwróć false

            // Jeśli flaga isSelectedQuestionsArray jest true, walidacja questionsArray jest pomijana
            if (this.isSelectedQuestionsArray) {
                return hasBasicData; // Sprawdzane są tylko podstawowe dane
            }

            // Jeśli isSelectedQuestionsArray jest false, ale questionsArray ma dane, waliduj je
            return hasBasicData && questionsValid;
        },


        // isAllData(): boolean {
        //     const { title, category_id, difficulty, first_points, second_points, third_points, time, time_start, time_end, description } = this;
        //     // time, time_start, time_end,
        //     const hasBasicData = Object.values({ title, category_id, difficulty, first_points, second_points, third_points, time, time_start, time_end, description })
        //         .every(value => value !== null && value !== '' && value !== undefined);

        //     const questionsValid = this.questionsArray.every(question => {
        //         const hasTitle = question.title.trim().length > 0;
        //         const allAnswersFilled = question.answers.every(answer => answer.answer.trim().length > 0);
        //         const hasCorrectAnswer = question.answers.some(answer => answer.isCorrect);
        //         return hasTitle && allAnswersFilled && hasCorrectAnswer;
        //     })

        //     // return hasBasicData
        //     return hasBasicData && questionsValid;

        // },



        updateQuizData(data: { id: any, title: string; image: any; description: string; time: any; difficulty: string; category_id: any, questionsArray: any }) {
            this.id = data.id;
            this.title = data.title;
            // this.image = data.image;
            this.description = data.description;
            // this.time = data.time;
            this.difficulty = data.difficulty;
            this.category_id = data.category_id;
            this.questionsArray = data.questionsArray;
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
