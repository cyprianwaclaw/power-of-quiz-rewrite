<template>
    <NuxtLayout name="account" arrowText="Twoje konto" title="Faktury i płatności">
        <!-- <ButtonSecondary :array="buttonsArray" /> -->
        <div v-if="!route.query.section" class="mt-[26px]">
            <div class="bg-white rounded-[18px] p-[30px] pb-[42px]">
                <CardPayments :payments="payments?.data.data" :n="14" :isLoading="isLoading" />
                <SectionPagination :last_page="payments?.pagination?.last_page"
                    :current_page="payments?.pagination?.current_page" :isLoading="isLoading" />
            </div>
        </div>
        <!-- <div v-if="route.query.section == buttonsArray[1].link">
            <div class="bg-white rounded-[18px] p-[30px]">
                <CardPayouts :payouts="allPayouts?.payouts" :n="14" :isLoading="isLoading" />
                <SectionPagination :last_page="allPayouts?.pagination?.last_page"
                    :current_page="allPayouts?.pagination?.current_page" :isLoading="isLoading" />
            </div>
        </div> -->
    </NuxtLayout>
</template>
<script lang="ts" setup>
import { storeToRefs } from "pinia"
import { useUser } from "@/stores/useUser"
const axiosInstance = useNuxtApp().$axiosInstance as any

definePageMeta({
    middleware: "auth",
})

const isLoading = ref(true)
const allPayouts = ref() as any
const router = useRouter()
const route = useRoute()
const payments = ref() as any
const userState = useUser()

const buttonsArray = reactive([
    {
        title: "Saldo konto",
        link: ""
    },
    {
        title: "Historia wypłat",
        link: "historia"
    }
])

onBeforeRouteUpdate(async (to) => {
    if (to.query.section == buttonsArray[1].link) {
        isLoading.value = true;
        const res = await axiosInstance.get(`payouts?${formatQueryString(to.query)}`);
        allPayouts.value = res.data;
        isLoading.value = false;
    }
})

onMounted(async () => {

    const res = await axiosInstance.get(`payments?${formatQueryString(route.query)}&page=${route.query.page ? route.query.page : 1}`);
    payments.value = res.data
    isLoading.value = false

})

onBeforeRouteUpdate(async (to) => {
    // if (to.query.pageName == 'invoices') {
    console.log(to.query.page)
    const res = await axiosInstance.get(`payments?${formatQueryString(to.query)}`);
    payments.value = res.data
    // isLoading.value = false
    // isLoadingButton.value = false
    // }
})

useSeoMeta({
    title: 'Twoje konto - płatności',
    ogTitle: 'Twoje konto - płatności',
    twitterCard: 'summary_large_image',
})







</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";






.product-colors {
    display: flex;
    gap: 10px;
    margin-top: 15px;
}

.color-option {
    cursor: pointer;
    border: 2px solid transparent;
    border-radius: 50%;
    padding: 5px;
    transition: border-color 0.3s;
}

.color-option img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
}

.color-option.selected {
    border-color: #000;
}
</style>
