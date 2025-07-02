<template>
    <NuxtLayout name="account" arrowText="Twoje konto" title="Konkursy">
        <ButtonSecondary :array="buttonsArray()" />
        <SectionPageElementsCompetitionResults v-if="router.currentRoute.value.query?.section == null" />
        <SectionPageElementsNewCompetition v-if="router.currentRoute.value.query?.section == 'newCompetition'" />
    </NuxtLayout>
</template>
<script lang="ts" setup>
import { storeToRefs } from "pinia"
import { useUser } from "@/stores/useUser"
const axiosInstance = useNuxtApp().$axiosInstance as any
const router = useRouter()

const userState = useUser();
const { user } = storeToRefs(userState);

const buttonsArray = () => {
    if (user.value.user_email == "marocz@o2.pl") {
           return [
            {
                title: "Wyniki",
                link: ""
            },
            {
                title: "Nowy konkurs",
                link: "newCompetition"
            }
        ]
    } else {
         return [
            {
                title: "Wyniki",
                link: ""
            }
        ]
    }
}
onMounted(() => {
    if (router.currentRoute.value.query.name == 'wyniki') {
        router.push('/panel/konto?pageName=competition&section=results&page=1')
    }
})

definePageMeta({
    middleware: "auth",
})

useSeoMeta({
    title: 'Konkursy',
    ogTitle: 'Konkursy',
    twitterCard: 'summary_large_image',
})

</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";
</style>
