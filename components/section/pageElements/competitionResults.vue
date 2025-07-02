<template>
    <div>
        <div>
            <CardUserCompetition :competitions="userCompetition?.data" :plan="true" :isLoading="isLoading" :n="10" />
            <SectionPagination :last_page="userCompetition?.pagination?.last_page"
                :current_page="userCompetition?.pagination?.current_page" :isLoading="isLoading" />
        </div>
         <div v-if="userCompetition?.data.length < 1" class="w-full flex bg-white rounded-[18px] p-[30px]">
             <div class="w-full items-center justify-center text-center py-14">
                <Icon name="ph:shooting-star" color="#CFD8E0" size="120" />
                <p class="text-[38px] text-[#CFD8E0] font-bold mt-[6px]">Brak konkursów</p>
            </div>
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
