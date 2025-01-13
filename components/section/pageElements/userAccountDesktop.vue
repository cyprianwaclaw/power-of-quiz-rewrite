<template>
    <ModalWithdrawFunds :modalActive="isWithdraw" @close="modalWithdraw" />
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
                <div v-if="!userQuizzes?.quizzes">
                </div>
            </div>
            <div v-if="router.currentRoute.value.query?.pageName === 'competition'">
                <div>
                    <CardUserQuizzes :quizzes="competitionData?.data" :n="14" :isLoading="isLoading" />
                    <SectionPagination :last_page="competitionData?.pagination?.last_page"
                        :current_page="competitionData?.pagination?.current_page" :isLoading="isLoading" />
                </div>
                <div v-if="!competitionData?.data">
                    nie ma quizów
                </div>
            </div>
            <div v-if="router.currentRoute.value.query?.pageName === 'founds'" class="w-full flex shrink-0">
                <div v-if="router.currentRoute.value.query?.section === 'null'">
                    <p class="font-semibold text-[27px]">
                        {{ user.points }} zł
                    </p>
                    <p class="text-gray-400 text-[16px] font-regular mt-[7px] cursor-default">
                        Twoje środki zgromadzone na koncie
                    </p>
                    <button @click="isClose" class="flex mt-[4px]">
                        <p class="primary-color font-semibold">Jak zdobyć środki?</p>
                    </button>
                    <div class="pt-[27px]  w-full flex justify-start mt-[12px]">
                        <button v-if="user.points > 0" class="button-primary" @click="modalWithdraw">
                            Wypłać
                        </button>
                        <button v-else class="button-primary-disabled">
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
const { user } = storeToRefs(userState);
const route = useRoute()
const isLoading = ref(true)
const isLoadingButton = ref(true)
const router = useRouter()
const userQuizzes = ref() as any
const competitionData = ref() as any
const allPayouts = ref() as any
const isOpen = ref(false)
const isWithdraw = ref(false)


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
        return [
            {
                title: "Wyniki",
                link: "null-competition"
            },
        ]
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
}

const buttonsArray = ref([
    {
        title: "Quizy",
        link: `null-quiz`
    },
    {
        title: "Konkursy",
        link: "null-competition"
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
        setTimeout(() => {
            isLoading.value = false
            isLoadingButton.value = false
        }, 340)
    }
    if (route.query.pageName == 'competition') {
        // isLoading.value = true;
        const res = await axiosInstance.get(`/user/competitions?${formatQueryString(route.query)}&page=${route.query.page}&per_page=${4}`);
        competitionData.value = res.data;
        setTimeout(() => {
            isLoading.value = false
            isLoadingButton.value = false
        }, 340)
    }
    if (route.query.pageName == 'founds') {
        // isLoading.value = true;
        const res = await axiosInstance.get(`payouts?${formatQueryString(route.query)}`);
        allPayouts.value = res.data;
        setTimeout(() => {
            isLoading.value = false
            isLoadingButton.value = false
        }, 340)
    }
    else {
        setTimeout(() => {
            isLoading.value = false
            isLoadingButton.value = false
        }, 340)
    }
});

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
    isLoading.value = false
    if (to.query.pageName == undefined) {
        router.push({ query: { pageName: 'quiz', section: 'null' } });
    }
})


</script>
<style lang="css" scoped></style>