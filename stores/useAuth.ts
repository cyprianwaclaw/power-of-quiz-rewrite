import { defineStore } from 'pinia'
import axios from 'axios';

export const useAuth = defineStore('auth', {

    state: () => ({
        loggedIn: false as boolean,
        token: null as any,
        isLoadingButton: false as boolean,
        errorValue: null as string | null,
    }),

    persist: true,

    actions: {
        async login(email: string, password: string) {
            const API_URL = useRuntimeConfig().public.API_URL;
            try {
                this.isLoadingButton = true;
                await new Promise((resolve) => setTimeout(resolve, 600));
                const res = await axios.post(`${API_URL}/login`, { email, password });
                this.token = res.data.access_token
                this.loggedIn = true
                window?.location?.reload()
            } catch (error: any) {
                this.isLoadingButton = false;
                this.errorValue = error.response.data

            }
        },
        logout() {
            this.token = null
            this.loggedIn = false
            window?.location?.reload()
        },

        nullError() {
            this.errorValue = null
        },

        async register(name: string, email: string, password: string, confirmPassword: string) {
            const API_URL = useRuntimeConfig().public.API_URL;
            try {
                this.isLoadingButton = true;
                await new Promise((resolve) => setTimeout(resolve, 600));
                const res = await axios.post(`${API_URL}/register`, { name, email, password, confirmPassword });
                this.token = res.data.access_token
                this.loggedIn = true
                window?.location?.reload()
            } catch (error: any) {
                this.isLoadingButton = false;
                this.errorValue = error.response.data

            } finally {
                this.isLoadingButton = false;
            }
        },
    }
})
