<template>
    <NuxtLayout name="account" arrowText="Twoje konto" title="Konkursy">
        <ButtonSecondary :array="buttonsArray" />
        <SectionPageElementsCompetitionResults v-if="router.currentRoute.value.query?.section == null" />
        <SectionPageElementsNewCompetition v-if="router.currentRoute.value.query?.section == 'newCompetition'" />
    </NuxtLayout>
</template>
<script lang="ts" setup>
import { storeToRefs } from "pinia"
import { useUser } from "@/stores/useUser"
const axiosInstance = useNuxtApp().$axiosInstance;

definePageMeta({
    middleware: "auth",
})

const isLoading = ref(true)
const allPayouts = ref() as any
const router = useRouter();
const route = useRoute()
const isWithdraw = ref(false)
const isOpen = ref(false)
const userState = useUser();
const { user } = storeToRefs(userState);

const buttonsArray = reactive([
    {
        title: "Wyniki",
        link: ""
    },
    {
        title: "Nowy konkurs",
        link: "newCompetition"
    }
])

</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";
</style>
