<template>
    <ModalWithdrawFunds :modalActive="isWithdraw" @close="modalWithdraw" />
    <ModalNotFinancialSettings :modalActive="openAlert" @close="isClick" />

    <div class="mt-[28px]">
        <ButtonLink :array="buttonsArray" query="pageName" :isLoading="isLoadingButton" :n="4" />
    </div>
    <div class="flex gap-[21px]">
        <div class="w-[180px]">
            <ButtonLink :array="allButtonsArray(router.currentRoute.value.query?.pageName)" :onlyText="true" query="section"
                :n="3" :isLoading="isLoadingButton" />
        </div>
        <div class="w-full flex bg-white rounded-[18px] p-[30px]">
            <div v-if="router.currentRoute.value.query?.pageName === 'quiz'" class="w-full flex shrink-0">
                <div>
                    <CardUserQuizzes :quizzes="userQuizzes?.quizzes" :n="14" :isLoading="isLoading" />
                    <SectionPagination :last_page="userQuizzes?.pagination?.last_page"
                        :current_page="userQuizzes?.pagination?.current_page" :isLoading="isLoading" />
                </div>
                <div v-if="userQuizzes?.quizzes.length < 1" class="w-full items-center justify-center text-center py-14">
                    <Icon name="ph:game-controller" color="#CFD8E0" size="120" />
                    <p class="text-[38px] text-[#CFD8E0] font-bold mt-[6px]">Brak quizów</p>
                </div>
            </div>
            <div v-if="router.currentRoute.value.query?.pageName === 'competition'">
                <div v-if="router.currentRoute.value.query?.section === 'results'">
                    <CardUserCompetition :competitions="userCompetition?.data" :plan="true" :isLoading="isLoading" :n="8" />
                    <SectionPagination :last_page="userCompetition?.pagination?.last_page"
                        :current_page="userCompetition?.pagination?.current_page" :isLoading="isLoading" />
                    <div v-if="userCompetition?.data.length < 1"
                        class="w-full items-center justify-center text-center py-14">
                        <Icon name="ph:shooting-star" color="#CFD8E0" size="120" />
                        <p class="text-[38px] text-[#CFD8E0] font-bold mt-[6px]">Brak konkursów</p>
                    </div>
                </div>
                <div v-else>
                    <CardUserQuizzes :quizzes="competitionData?.data" :n="14" :isLoading="isLoading" />
                    <SectionPagination :last_page="competitionData?.pagination?.last_page"
                        :current_page="competitionData?.pagination?.current_page" :isLoading="isLoading" />
                    <div v-if="competitionData?.data">
                        Brak konkursów
                    </div>
                </div>
            </div>
            <div v-if="router.currentRoute.value.query?.pageName === 'founds'" class="w-full flex shrink-0">
                <div v-if="router.currentRoute.value.query?.section === 'null'">
                    <p class="font-semibold text-[27px]">
                        {{ user?.points }} zł
                    </p>
                    <p class="text-gray-400 text-[16px] font-regular mt-[7px] cursor-default">
                        Twoje środki zgromadzone na koncie
                    </p>
                    <button @click="isClose" class="flex mt-[4px]">
                        <p class="primary-color font-semibold">Jak zdobyć środki?</p>
                    </button>
                    <div class="pt-[27px]  w-full flex justify-start mt-[12px]">
                        <button v-if="user?.points > 0" class="button-primary" @click="isClick">
                            Wypłać
                        </button>
                        <button v-else class="button-primary-disabled h-[45px]">
                            Wypłać
                        </button>
                    </div>
                    <p class="text-gray-400 text-[14px] font-regular mt-[44px] cursor-default">
                        Aby móc wypłacić zgromadzone środki,
                        najpierw musisz uzupełnić dane do przelewu w ustawieniach
                    </p>
                </div>
                <div v-else class="w-full">
                    <CardPayouts :payouts="allPayouts.payouts" :n="14" :isLoading="isLoading" />
                    <SectionPagination :last_page="allPayouts?.pagination?.last_page"
                        :current_page="allPayouts?.pagination?.current_page" :isLoading="isLoading" />
                    <div v-if="allPayouts.payouts.length < 1"
                        class="w-full items-center justify-center text-center py-14">
                        <Icon name="ph:hand-coins" color="#CFD8E0" size="120" />
                        <p class="text-[38px] text-[#CFD8E0] font-bold mt-[6px]">Brak wypłat</p>
                    </div>
                </div>
            </div>
            <div v-if="router.currentRoute.value.query?.pageName === 'invoices'" class="w-full flex shrink-0">
                <div v-if="router.currentRoute.value.query?.section === 'null'" class="w-full">
                    {{ payments?.data.data }}
                    <CardPayments :payments="payments?.data.data" :n="14" :isLoading="isLoading" />
                    <SectionPagination :last_page="payments?.pagination?.last_page"
                        :current_page="payments?.pagination?.current_page" :isLoading="isLoading" />
                </div>
                <div v-else class="w-full">
                    <!-- sdafdf
                    <CardPayouts :payouts="allPayouts.payouts" :n="14" :isLoading="isLoading" />
                    <SectionPagination :last_page="allPayouts?.pagination?.last_page"
                        :current_page="allPayouts?.pagination?.current_page" :isLoading="isLoading" /> -->
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from "pinia"
import { useUser } from "@/stores/useUser"
const axiosInstance = useNuxtApp().$axiosInstance as any

const userState = useUser();
const { user, settings } = storeToRefs(userState);
const route = useRoute()
const isLoading = ref(true)
const isLoadingButton = ref(true)
const router = useRouter()
const userQuizzes = ref() as any
const competitionData = ref() as any
const allPayouts = ref() as any
const payments = ref() as any
const userCompetition = ref() as any
const isOpen = ref(false)
const isWithdraw = ref(false)


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
}

const allButtonsArray = (routeName: any) => {
    if (routeName == null || routeName == 'quiz') {
        return [
            {
                title: "Wszystkie",
                link: `null-quiz`

            },
            {
                title: "Zaakceptowane",
                link: "true-quiz"
            },
            {
                title: "Do akceptacji",
                link: "false-quiz"
            }
        ]
    }
    if (routeName == 'competition') {
        if (user.value.user_email == "marocz@o2.pl") {
            return [
                {
                    title: "Wyniki",
                    link: "results-competition"
                },
                {
                    title: "Moje konkursy",
                    link: "null-competition"
                },
            ]
        } else {
            return [
                {
                    title: "Wyniki",
                    link: "results-competition"
                },]
        }
    }
    if (routeName == 'founds') {
        return [
            {
                title: "Saldo konta",
                link: "null-founds"
            },
            {
                title: "Historia wypłat",
                link: "payouthistory-founds"
            },
        ]
    }
    if (routeName == 'invoices') {
        return [
            {
                title: "Wszystkie",
                link: "null-invoices"
            },
            {
                title: "Wyniki",
                link: "results-invoices"
            },
        ]
    }
}

const buttonsArray = ref([
    {
        title: "Quizy",
        link: `null-quiz`
    },
    {
        title: "Konkursy",
        link: "results-competition"
    },
    {
        title: "Środki",
        link: "null-founds"
    },
    {
        title: "Faktury i płatności",
        link: "null-invoices"
    }
])

onMounted(async () => {

    const res = await axiosInstance.get(`user/quizzes?${formatQueryString(route.query)}`);
    userQuizzes.value = res.data;

    if (route.query.pageName == undefined) {
        router.push({ query: { pageName: 'quiz', section: 'null' } })
        isLoading.value = false
        isLoadingButton.value = false
    }
    if (route.query.pageName == 'competition') {
        const res = await axiosInstance.get(`/user/competitions?${formatQueryString(route.query)}&page=${route.query.page}&per_page=${4}`);
        competitionData.value = res.data;
        isLoading.value = false
        isLoadingButton.value = false
    }
    if (route.query.pageName == 'founds') {
        const res = await axiosInstance.get(`payouts?${formatQueryString(route.query)}`);
        allPayouts.value = res.data;
        isLoading.value = false
        isLoadingButton.value = false
    }
    if (route.query.pageName == 'invoices') {
        const res = await axiosInstance.get(`payments?${formatQueryString(route.query)}&page=${route.query.page}`);
        payments.value = res.data
        isLoading.value = false
        isLoadingButton.value = false
    }
    else {
        isLoading.value = false
        isLoadingButton.value = false
    }
})

onBeforeRouteUpdate(async (to) => {
    if (to.query.pageName == 'quiz') {
        // isLoading.value = true;
        const res = await axiosInstance.get(`user/quizzes?${formatQueryString(to.query)}`);
        userQuizzes.value = res.data;
        // isLoading.value = false;
    }
    if (to.query.pageName == 'competition') {
        // isLoading.value = true;
        const res = await axiosInstance.get(`/user/competitions?${formatQueryString(to.query)}&page=${to.query.page}&per_page=${4}`);
        competitionData.value = res.data;
        // isLoading.value = false;
    }
    if (to.query.section == 'payouthistory') {
        // isLoading.value = true;
        const res = await axiosInstance.get(`payouts?${formatQueryString(to.query)}`);
        allPayouts.value = res.data;
        // isLoading.value = false;
    }
    if (to.query.section == 'results') {
        const res = await axiosInstance.get(`/user/competitions?${formatQueryString(to.query)}&per_page=${8}`);
        userCompetition.value = res.data
    }
    if (to.query.pageName == 'invoices') {
        console.log(to.query.page)
        // & page=${ to.query.page }
        const res = await axiosInstance.get(`payments?${formatQueryString(to.query)}`);
        payments.value = res.data
        // isLoading.value = false
        // isLoadingButton.value = false
    }
    // isLoading.value = false
    if (to.query.pageName == undefined) {
        router.push({ query: { pageName: 'quiz', section: 'null' } });
    }
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