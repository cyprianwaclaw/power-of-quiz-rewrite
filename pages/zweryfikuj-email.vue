<template>
    <NuxtLayout name="auth">
        <div class="auth-background" @click="auth.nullError()">
            <div class="width-login sm:shaddow-effect">
                <h2 class="mb-[24px] text-[28px] font-semibold">Weryfikacja adresu e-mail</h2>
                <div v-if="router.currentRoute.value.query?.email && router.currentRoute.value.query?.verification_code">
                    <Icon name="ph:check-circle-light" size="75" class="green" />
                    <p class="text-[22px] font-semibold mt-[8px]">Adres e-mail potwierdzony</p>
                    <p class="mt-[3px]">Za chwile zostaniesz przekierowany na strone główną</p>
                    <div class="w-[160px] mt-[21px]">
                        <NuxtLink to="/">
                            <p class="button-primary">Strona główna</p>
                        </NuxtLink>
                    </div>
                </div>
                <div v-else>
                    <!-- {{ errorValue }} -->
                    <div>
                        <p class="text-[17px]  mb-[24px] text-[#939393] mr-[32px]">Twój adres e-mail nie został potwierdzony, przed skorzystaniem z serwisu wymagana jest jego weryfikacja</p>
                        <div class="flex w-full justify-between">
                            <p class="text-[17px] font-medium w-[300px]">Wpisz kod, który został wysłany na Twój adres
                                e-mail</p>
                            <p class="text-[15px]"
                                :class="resentCodeText == 'Wyślij ponownie' ? ' hover:underline primary-color cursor-pointer' : ' font-medium text-[#21a67a]'"
                                @click="resentCode()">{{ resentCodeText }}</p>
                        </div>
                        <Form @submit="verifyEmailAddress" @click="auth.nullError()" class="mt-6">
                            <div class="flex flex-col sm:gap-[10px] mb-10 w-[220px]">
                                <InputBase name="code" placeholder="Kod weryfikacyjny" type="text" :hasError="errorValue?.message || errorValue?.errors?.verification_code" />
                            </div>
                            <ButtonLoading :disable="false" isLoading="false" :loading="isLoadingButton" text="Gotowe" />
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
import { useAuth } from "@/stores/useAuth";
import { useUser } from "@/stores/useUser"
import * as yup from "yup";
import { Form, Field, useForm, ErrorMessage, useField } from "vee-validate";
const auth = useAuth();
const userState = useUser()
const { user } = storeToRefs(userState)

definePageMeta({
    middleware: "user",
});

const { isLoadingButton, errorValue, token, loggedIn, email } = storeToRefs(auth)
const isQueryVerify = ref(false)
const resentCodeText = ref("Wyślij ponownie")
const router = useRouter()
const typePassword = ref<string>("password");
const typeConfirmPassword = ref<string>("password");
const iconTypePassword = ref<string>("ph:eye");
const iconTypeConfirmPassword = ref<string>("ph:eye");

const verifyEmailAddress = async (values: any) => {
    try {
        const res = await auth.verifyEmail(values.code, null) as any
        // token.value = res?.data?.token
        // console.log(res)
        setTimeout(async () => {
            await userState.currentUser(token.value)
            await userState.getUserSettings(token.value)
            await userState.userPlan(token.value)
            router.push("/panel")
        }, 300)
    } catch (error) {
        console.error("Błąd podczas weryfikacji e-maila:", error)
    }
}

const resentCode = async () => {
    resentCodeText.value = "Wysłano"
    await auth.sendNewCode(null)
    setTimeout(() => {
        resentCodeText.value = "Wyślij ponownie"
    }, 1600)
}

onMounted(async () => {
    auth.nullError()
    await auth.sendNewCode(null)
    // if (router.currentRoute.value.query.email && router.currentRoute.value.query.verification_code) {
    //     await auth.verifyEmail(router.currentRoute.value.query.verification_code, router.currentRoute.value.query.email)
    //     setTimeout(async () => {
    //         await userState.currentUser(token.value)
    //         await userState.getUserSettings(token.value)
    //         await userState.userPlan(token.value)
    //     }, 200)
    //     setTimeout(async () => {
    //         router.push("/panel")
    //     }, 600)
    // }
})
useSeoMeta({
    title: 'Power of quiz - rejestracja',
    ogTitle: 'Power of quiz - rejestracja',
    twitterCard: 'summary_large_image',
})

</script>
<style scoped lang="scss">
@import "@/assets/style/variables.scss";

@media only screen and (max-width: 880px) {
    .width-login {
        max-width: 500px;
        position: relative;
        top: 50%;
        left: 50%;
        width: 84%;
        transform: translate(-50%, -50%);
        background: white;
        border-radius: 16px;
        padding: 28px;
    }
}

@media only screen and (min-width: 880px) {
    .width-login {
        position: absolute;
        width: 620px;
        background: white;
        border-radius: 16px;
        padding: 55px;
        top: 50%;
        left: 67%;
        transform: translate(-50%, -50%);
    }
}
</style>
