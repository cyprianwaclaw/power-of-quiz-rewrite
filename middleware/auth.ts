import { useAuth } from "@/stores/useAuth";

export default defineNuxtRouteMiddleware(async (to, from) => {
    // const token = Cookies.get('token')
    const authState = useAuth()

    if (!authState.loggedIn) {
        return navigateTo('/')
    }

    // if (authState.loggedIn && !token) {
    //     setTimeout(() => {
    //         authState.logout()
    //     }, 100)
    // }
});

