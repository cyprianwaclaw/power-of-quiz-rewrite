import { defineStore } from 'pinia'
import axios from 'axios';

export const useAuth = defineStore('auth', {

    state: () => ({
        loggedIn: false as boolean,
        token: null as any,
        image: null as any,
        isLoadingButton: false as boolean,
        errorValue: null as string | null,
    }),

    persist: true,

    actions: {
        async login(email: string, password: string) {
            const API_URL = useRuntimeConfig().public.API_URL;
            try {
                this.isLoadingButton = true;
                console.log(API_URL)
                await new Promise((resolve) => setTimeout(resolve, 600));
                const res = await axios.post(`${API_URL}/login`, { email, password });
                this.token = res.data.token
                this.image = res.data.user_image
                this.loggedIn = true
                window?.location?.reload()
            } catch (error: any) {
                this.isLoadingButton = false;
                this.errorValue = error.response.data

            } finally {
                this.isLoadingButton = false;
            }
        },
        logout() {
            this.token = null
            this.image = null
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
                this.token = res.data.token
                this.image = res.data.user_image
                this.loggedIn = true
                window?.location?.reload()

                // window?.location?.replace("/restauracje");
            } catch (error: any) {
                this.isLoadingButton = false;
                this.errorValue = error.response.data

            } finally {
                this.isLoadingButton = false;
            }
        },
    }
})

// W Pinii, wartości są odczytywane tylko przy pierwszym utworzeniu sklepu i 
// nie są automatycznie aktualizowane, gdy dane zewnętrzne(takie jak Cookies) 
// się zmieniają.Aby rozwiązać ten problem, możesz użyć gettera, który będzie 
// dynamicznie odczytywał wartość Cookies.get('token') za każdym razem,
// gdy loggedIn lub token zostanie odczytane. Wtedy usuwamy token oraz loggedIn 
// ze state i dajemy je do getters, przypisując domyslą wartośc z cookie