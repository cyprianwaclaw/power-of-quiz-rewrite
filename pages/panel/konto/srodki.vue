<template>
    <ModalWithdrawFunds :modalActive="isWithdraw" @close="modalWithdraw" />
    <ModalNotFinancialSettings :modalActive="openAlert" @close="isClick" />

    <ModalDown :modalActive="isOpen" title="Jak zdobyć środki?" @close="isClose">
        <template #content>
            <ModalContentHowToGetPoints />
        </template>
    </ModalDown>
    <NuxtLayout name="account" arrowText="Twoje konto" title="Środki">
        <ButtonSecondary :array="buttonsArray" />
        <div v-if="!route.query.section">
            <div class="bg-white rounded-[18px] p-[30px]">
                <p class="font-semibold text-[27px]">
                    {{ user?.points }} zł
                </p>
                <p class="text-gray-400 text-[16px] font-regular mt-[7px]">
                    Twoje środki zgromadzone na koncie
                </p>
                <button @click="isClose" class="flex mt-[4px]">
                    <p class="primary-color font-semibold">Jak zdobyć środki?</p>
                </button>
                <div class="pt-[27px] border-t w-full flex justify-end mt-[26px]">
                    <button v-if="user?.points > 0" class="button-primary" @click="isClick">
                        Wypłać
                    </button>
                    <button v-else class="button-primary-disabled h-[45px]">
                        Wypłać
                    </button>
                </div>
                <p class="text-gray-400 text-[14px] font-regular mt-[44px]">
                    Aby móc wypłacić zgromadzone środki,
                    najpierw musisz uzupełnić dane do przelewu w ustawieniach
                </p>
            </div>
        </div>
        <div v-if="route.query.section == buttonsArray[1].link">
            <div class="bg-white rounded-[18px] p-[30px]">
                <CardPayouts :payouts="allPayouts?.payouts" :n="14" :isLoading="isLoading" />
                <SectionPagination :last_page="allPayouts?.pagination?.last_page"
                    :current_page="allPayouts?.pagination?.current_page" :isLoading="isLoading" />
            </div>
              <div v-if="allPayouts.payouts.length < 1" class="bg-white rounded-[18px] p-[30px]">
                  <div  class="w-full items-center justify-center text-center py-14">
                    <Icon name="ph:hand-coins" color="#CFD8E0" size="120" />
                    <p class="text-[38px] text-[#CFD8E0] font-bold mt-[6px]">Brak wypłat</p>
                </div>
            </div>
        </div>
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
const router = useRouter();
const route = useRoute()
const isWithdraw = ref(false)
const isOpen = ref(false)
const userState = useUser();
const { user, settings } = storeToRefs(userState)

const cookie = useCookie("auth") as any

onMounted(async () => {
    await userState.currentUser(cookie.value?.token)
    await userState.getUserSettings(cookie.value?.token)
    console.log(settings.value)
})

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

const openAlert = ref(false)

const isClick = (quiz: any) => {
    if (settings.value.financial ? true : false) {
        isWithdraw.value = !isWithdraw.value;
    } else {
        openAlert.value = !openAlert.value
    }
}

const isClose = (value: any) => {
    isOpen.value = !isOpen.value;
}

const modalWithdraw = async (value: any) => {
    isWithdraw.value = !isWithdraw.value;
    // if (value == true) {
    //        await userState.login()
    // }
}
if (route.query.section == buttonsArray[1].link) {
    const res = await axiosInstance.get(`payouts?${formatQueryString(router.currentRoute.value.query)}`);
    allPayouts.value = res.data;
    isLoading.value = false;
}

onBeforeRouteUpdate(async (to) => {
    if (to.query.section == buttonsArray[1].link) {
        isLoading.value = true;
        const res = await axiosInstance.get(`payouts?${formatQueryString(to.query)}`);
        allPayouts.value = res.data;
        isLoading.value = false;
    }
})


useSeoMeta({
    title: 'Ustawienia - środki',
    ogTitle: 'Ustawienia - środki',
    twitterCard: 'summary_large_image',
})
</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";

.button-primary-disabled {
    cursor: not-allowed !important;
    background-color: #aec5ff !important;
    padding: 10px 23px !important;
    color: $white !important;
    font-style: normal !important;
    font-weight: 500 !important;
    font-size: 15px !important;
    line-height: 22px !important;
    letter-spacing: 0.05em !important;
    display: block !important;
    border-radius: 8px !important;
}
</style>
