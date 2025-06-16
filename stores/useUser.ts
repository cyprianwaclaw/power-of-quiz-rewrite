import { defineStore } from 'pinia';
import axios from 'axios';

export const useUser = defineStore('user', {
    state: () => ({
        user: null as any,
        settings: null as any,
        hasPremium: null as any,
        changeEmailData: null as any,
        isDataChangeEmail: null as any,
        isDataChangeEmailError: null as any
    }),

    persist: true,

    actions: {
        async currentUser(token: any) {
            const API_URL = useRuntimeConfig().public.API_URL;
            const res = await axios.get(`${API_URL}/user/current`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            });
            this.user = res.data;
            this.hasPremium = res.data.plan === "Premium" ? true : false
        },

        updateUserAvatarState(avatarLink: string) {
            this.user.avatar = avatarLink
        },

        async getUserSettings(token: any) {
            const API_URL = useRuntimeConfig().public.API_URL;
            const res = await axios.get(`${API_URL}/user/settings`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            });
            this.settings = res.data;
        },

        async userPlan(token: any) {
            // const res = await axiosInstance.get(`/user/hasPremium`)
            const API_URL = useRuntimeConfig().public.API_URL;
            const res = await axios.get(`${API_URL}/user/hasPremium`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
                //    'send-new-code-change-email'
            });
            this.hasPremium = res.data

        },

        async sendNewCodeChangeEmail(pageName: string, token: string, email: string) {
            try {
                const API_URL = useRuntimeConfig().public.API_URL;
                const resData = { email, page_name: pageName };

             const res =   await axios.post(`${API_URL}/send-new-code-change-email`, resData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    }
                })
              this.isDataChangeEmail = res.data
            } catch (error:any) {
                // this.error = error.response.data
                this.isDataChangeEmailError = error.response.data
                // console.error("Błąd podczas wysyłania emaila:", error);
            }
        }



    }
});