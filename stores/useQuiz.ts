import { defineStore } from 'pinia';

export const useQuiz = defineStore('quiz', {
    state: () => ({
        errorState: false as boolean,
        title: '',
        description: '',
        time: '',
        difficulty: '',
        category_id: '',
        questionsArray: [{
            title: '',
            answers: [
                { answer: '', isCorrect: false },
                { answer: '', isCorrect: false },
                { answer: '', isCorrect: false },
                { answer: '', isCorrect: false }
            ]
        }],
    }),

    actions: {
        apiData() {
            return {
                title: this.title,
                description: this.description,
                time: this.time,
                difficulty: this.difficulty,
                category_id: this.category_id
            };
        },
        updateQuizData(data: { title: string; description: string; time: any; difficulty: string; category_id: any, questionsArray:any }) {
            this.title = data.title;
            this.description = data.description;
            this.time = data.time;
            this.difficulty = data.difficulty;
            this.category_id = data.category_id;
            this.questionsArray = data.questionsArray;
        }
    }
})
