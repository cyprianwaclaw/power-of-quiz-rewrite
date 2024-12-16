<template>
    <h2 class="text-2xl md:text-3xl flex place-items-center font-medium mb-6 md:mb-8">
        Znajomi
    </h2>
    <SectionCardInvite />
    <div class="-mb-24 mt-9">
        <div v-if="invitedUses?.data?.length === 0">
            <div class="grid place-items-center mt-4 md:mt-10">
                <Icon name="ph:users" size="166" color="#CFD8E0" />
                <p class="invite-text -mt-2 mb-5">Brak znajomych</p>
            </div>
        </div>
        <div v-else>
            <CardInvitedUser :users="invitedUses?.data" :n="23" :isLoading="isLoading" />
            <SectionPagination :last_page="invitedUses?.pagination?.last_page"
                :current_page="invitedUses?.pagination?.current_page" :isLoading="isLoading" />
        </div>
    </div>
</template>
<script lang="ts" setup>
const axiosInstance = useNuxtApp().$axiosInstance as any
const router = useRouter()

definePageMeta({
    middleware: "auth",
});

const isLoading = ref(true)
const invitedUses = ref() as any

onMounted(async () => {
    const res = await axiosInstance.get(`user/getInvitedUsers?${formatQueryString(router.currentRoute.value.query)}`);
    invitedUses.value = res.data;
    isLoading.value = false;
});

onBeforeRouteUpdate(async (to) => {
    isLoading.value = true;
    const res = await axiosInstance.get(`user/getInvitedUsers?${formatQueryString(to.query)}`)
    invitedUses.value = res.data;
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
