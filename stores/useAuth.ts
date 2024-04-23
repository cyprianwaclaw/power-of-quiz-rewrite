import { defineStore } from 'pinia'
import axios from 'axios';

export const useAuth = defineStore('auth', {

    state: () => ({
        loggedIn: false as boolean,
        token: null as any,
        isLoadingButton: false as boolean,
        errorValue: null as any | null,
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
                this.errorValue = error.response.data
                this.isLoadingButton = false;
            }
        },
        logout() {
            this.token = null
            this.loggedIn = false
            window?.location?.reload()
        },

        nullError() {
            this.errorValue = null
            this.isLoadingButton = false;
        },

        async register(name: string, email: string, invitation: string, password: string, password_confirmation: string) {
            const API_URL = useRuntimeConfig().public.API_URL;
            try {
                this.isLoadingButton = true;
                await new Promise((resolve) => setTimeout(resolve, 600));
                const res = await axios.post(`${API_URL}/register`, { name, email, invitation, password, password_confirmation });
                this.token = res.data.access_token
                this.loggedIn = true
                this.isLoadingButton = false;
                // window?.location?.reload()
            } catch (error: any) {
                this.isLoadingButton = false;
                this.errorValue = error.response.data
                this.isLoadingButton = false;

            }
            // } finally {
            //     this.isLoadingButton = false;
        },
    }
})
