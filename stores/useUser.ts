import { defineStore } from 'pinia';
import axios from 'axios';

export const useUser = defineStore('user', {
    state: () => ({
        user: null as any,
        settings: null as any,
        hasPremium: null as any,
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
            });
            this.hasPremium = res.data

        }
    }
});