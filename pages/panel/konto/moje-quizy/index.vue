<template>
    <NuxtLayout name="account" arrowText="Twoje konto" title="Moje quizy">
        <ButtonSecondary :array="buttonsArray" />
        <div class="mt-[25px]">
            <div class="bg-white rounded-[18px] p-[30px]">
                <CardUserQuizzes :quizzes="userQuizzes?.quizzes" :n="14" :isLoading="isLoading" />
                <SectionPagination :last_page="userQuizzes?.pagination?.last_page"
                    :current_page="userQuizzes?.pagination?.current_page" :isLoading="isLoading" />
                    <div v-if="userQuizzes?.quizzes.length < 1" class="w-full items-center justify-center text-center py-14">
                        <Icon name="ph:game-controller" color="#CFD8E0" size="120" />
                        <p class="text-[38px] text-[#CFD8E0] font-bold mt-[6px]">Brak quizów</p>
                    </div>
            </div>
        </div>
    </NuxtLayout>
</template>
<script lang="ts" setup>
import { storeToRefs } from "pinia"
import { useUser } from "@/stores/useUser"
const axiosInstance = useNuxtApp().$axiosInstance as any

const route = useRoute()
const isLoading = ref(true)
const userQuizzes = ref() as any
const userState = useUser();
const { user } = storeToRefs(userState);

const buttonsArray = reactive([
    {
        title: "Wszystkie",
        link: ""
    },
    {
        title: "Zaakceptowane",
        link: "true"
    },
    {
        title: "Do akceptacji",
        link: "false"
    }

])

onMounted(async () => {
    const res = await axiosInstance.get(`user/quizzes?${formatQueryString(route.query)}`);
    userQuizzes.value = res.data;
    isLoading.value = false;
});

onBeforeRouteUpdate(async (to) => {
    isLoading.value = true;
    const res = await axiosInstance.get(`user/quizzes?${formatQueryString(to.query)}`);
    userQuizzes.value = res.data;
    isLoading.value = false;
})

definePageMeta({
    middleware: "auth",
})

useSeoMeta({
    title: 'Moje quizy',
    ogTitle: 'Moje quizy',
    twitterCard: 'summary_large_image',
})

</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";
</style>
