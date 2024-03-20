import { defineStore } from 'pinia';
import axios from 'axios';

export const useUser = defineStore('user', {
    state: () => ({
        user: null as any,
        hasPremium: null as any,

    }),

    actions: {
        async login() {
            try {
                const axiosInstance = useNuxtApp().$axiosInstance;
                const res = await axiosInstance.get(`/user/current`);
                // const res = await axiosInstance.get(`/user/hasPremium`);

                this.user = res.data;
            } catch (error) {
                console.error("Błąd logowania:", error);
            }
        },
        async userPlan() {
            const axiosInstance = useNuxtApp().$axiosInstance;
            const res = await axiosInstance.get(`/user/hasPremium`);
            this.hasPremium = res.data;

        }
    }
});