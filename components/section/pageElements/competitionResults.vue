<template>
    <div>
        <div>
            {{ userCompetition?.data.length }}
        </div>
        <CardUserCompetition :competitions="userCompetition?.data" :plan="true" :isLoading="isLoading" :n="10" />
        <SectionPagination :last_page="userCompetition?.pagination?.last_page"
            :current_page="userCompetition?.pagination?.current_page" :isLoading="isLoading" />
    </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from "pinia"
import { useUser } from "@/stores/useUser"
const axiosInstance = useNuxtApp().$axiosInstance as any

definePageMeta({
    middleware: "auth",
})

const route = useRoute();
const isLoading = ref(true)
const userCompetition = ref()
const perPage = ref(10)

onMounted(async () => {
    const res = await axiosInstance.get(`/user/competitions?${formatQueryString(route.query)}&per_page=${perPage.value}`);
    userCompetition.value = res.data;
    isLoading.value = false;
})

onBeforeRouteUpdate(async (to) => {
    isLoading.value = true;
    const res = await axiosInstance.get(`/user/competitions?${formatQueryString(to.query)}&per_page=${perPage.value}`);
    userCompetition.value = res.data;
    isLoading.value = false;
});

</script>
<style lang="scss" scoped></style>
