import { defineStore } from 'pinia'
import axios from 'axios';

export const useAuth = defineStore('auth', {

    state: () => ({
        loggedIn: false as boolean,
        token: null as any,
        email: null as any,
        isLoadingButton: false as boolean,
        errorValue: null as any | null,
    }),

    persist: true,

    actions: {
        async login(email: string, password: string) {
            const API_URL = useRuntimeConfig().public.API_URL;
            try {
                this.isLoadingButton = true;
                // await new Promise((resolve) => setTimeout(resolve, 500));
                const res = await axios.post(`${API_URL}/login`, { email, password });
                this.token = res.data.token
                this.loggedIn = true
                // window?.location?.reload()
            } catch (error: any) {
                this.errorValue = error.response.data
                this.isLoadingButton = false;
            }
        },
        logout() {
            const router = useRouter()
            this.token = null
            this.loggedIn = false
            router.push('/')
        },

        nullError() {
            this.errorValue = null
            this.isLoadingButton = false;
        },

        async register(name: string, surname: string, email: string, confirmEmail: string, password: string, confirmPassword: string) {
            const API_URL = useRuntimeConfig().public.API_URL;
            try {
                this.isLoadingButton = true;
                // await new Promise((resolve) => setTimeout(resolve, 600));
                const res = await axios.post(`${API_URL}/register`, { name, surname, email, confirmEmail, password, confirmPassword });
                this.token = res.data.token
                this.loggedIn = false
                this.email = email
                this.isLoadingButton = false;
            } catch (error: any) {
                this.isLoadingButton = false;
                this.errorValue = error.response.data
                this.isLoadingButton = false;

            }
        },

        async verifyEmail(code: any, email:any) {
            const API_URL = useRuntimeConfig().public.API_URL;
            // await new Promise((resolve) => setTimeout(resolve, 600));
            const resData = {
                "verification_code": code,
                "email": email ? email : this.email
            }
            try {
                this.isLoadingButton = true;
                await new Promise((resolve) => setTimeout(resolve, 400));
                const res = await axios.post(`${API_URL}/verify-email`, resData);
                this.loggedIn = true
                this.isLoadingButton = false;
            }
            catch (error: any) {
                this.isLoadingButton = false;
                this.errorValue = error.response.data.message
                this.isLoadingButton = false;

            }
        },

        async sendNewCode() {
            const API_URL = useRuntimeConfig().public.API_URL;
            const resData = {
                "email": this.email
            }
            await axios.post(`${API_URL}/send-new-code`, resData);
        }
    }
})
