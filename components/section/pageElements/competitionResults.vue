<template>
    <div>
        <div v-if="userCompetition?.data.length === 7">
            <div class="grid place-items-center mt-4 md:mt-10">
                <Icon name="ph:shooting-star" size="166" color="#CFD8E0" />
                <p class="invite-text mt-2 mb-5">Brak konkursów</p>
            </div>
        </div>
        <div v-else>
            <CardUserCompetition :competitions="userCompetition?.data" :plan="true" :isLoading="isLoading" :n="10" />
            <SectionPagination :last_page="userCompetition?.pagination?.last_page"
                :current_page="userCompetition?.pagination?.current_page" :isLoading="isLoading" />
        </div>
    </div>
</template>
<script lang="ts" setup>
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
<style scoped lang="scss">
@import "@/assets/style/variables.scss";

.invite-text {
    font-style: normal;
    font-weight: 700;
    font-size: 38px;
    color: #cfd8e0;
}
</style>
