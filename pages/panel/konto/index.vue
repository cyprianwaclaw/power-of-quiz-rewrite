<template>
    <h2 class="text-2xl md:text-3xl flex place-items-center font-medium">
        Moje konto
    </h2>
    <div class="md:hidden flex flex-col">
        <div class="md:hidden flex flex-col mb-4">
            <div class="columns-2 flex gap-5 mt-5">
                <NuxtLink to="/panel/konto/moje-quizy" class="retangle gold">
                    <Icon name="ph:game-controller-fill" color="D19D38" size="34" />
                    <p class="retangle-title family">Quizy</p>
                </NuxtLink>
                <NuxtLink to="/panel/konto/konkursy" class="retangle red flex flex-col">
                    <Icon name="ph:shooting-star-fill" color="E04AAC" size="34" />
                    <p class="retangle-title family mb-1 text-black">Konkursy</p>
                </NuxtLink>
            </div>
            <div class="columns-2 flex gap-5">
                <NuxtLink to="/panel/konto/srodki" class="retangle blue">
                    <Icon name="ph:wallet-fill" color="2B3BC7" size="34" />
                    <p class="retangle-title family">Środki</p>
                </NuxtLink>
                <NuxtLink to="/panel/konto/platnosci" class="retangle green flex flex-col">
                    <Icon name="ph:newspaper-fill" color="38D1AC" size="34" />
                    <p class="retangle-title family mb-1 text-black">Faktury</p>
                </NuxtLink>
            </div>
        </div>
        <div class="bg-white py-5 px-8 rounded-3xl relative mb-[38px]">
            <SectionCardPackage />
        </div>
        <SectionCardStatistic />
        <div class="mt-8">
            <div class="white-retangle">
                <NuxtLink to="/panel/konto/ustawienia">
                    <div class="row-table-start flex place-items-center justify-between">
                        <div class="flex place-items-center mb-2">
                            <Icon name="ph:gear-light" size="26" class="primary-color" />
                            <h2 class="title-menu-mobile ml-2">Ustawienia</h2>
                        </div>
                        <Icon name="ph:caret-right-light" size="20" class="text-gray mb-2" />
                    </div>
                </NuxtLink>
                <div class="row-table-end flex place-items-center justify-between">
                    <div class="flex place-items-center mb-2 mt-2">
                        <Icon name="ph:paper-plane-right-light" size="26" class="primary-color" />
                        <h2 class="title-menu-mobile ml-2">Napisz do nas</h2>
                    </div>
                    <Icon name="ph:caret-right-light" size="20" class="text-gray mb-2 mt-2" />
                </div>
            </div>
        </div>
        <div class="flex justify-end -mb-[100px] mt-8">
            <div class="flex place-items-center gap-1.5" @click="logoutUser()">
                <p class="one primary-color">Wyloguj się</p>
                <Icon name="material-symbols:logout-rounded" size="18" class="primary-color margin-top" />
            </div>
        </div>
    </div>
    <!-- Dekstop view user account  -->
    <div class="hidden md:flex flex-col">
        <div class="mt-[28px]">
            <ButtonSecondary :array="buttonsArray" query="pageName" />
        </div>
        <div class="flex w-full gap-[40px]">
            <div class="flex shrink-0 w-[150px]">
                <ButtonSecondary :array="quizSectionsArray" :onlyText="true" query="section" />
            </div>
            <!-- {{ router.currentRoute.value.query?.pageName == null }} -->
            <div class="flex shrink-1 bg-white w-full rounded-[18px] p-[30px]">
                <div v-if="router.currentRoute.value.query?.pageName == null">
                    <div>
                        <CardUserQuizzes :quizzes="userQuizzes?.quizzes" :n="14" :isLoading="isLoading" />
                        <SectionPagination :last_page="userQuizzes?.pagination?.last_page"
                            :current_page="userQuizzes?.pagination?.current_page" :isLoading="isLoading" />
                    </div>
                    <div v-if="!userQuizzes?.quizzes">
                        <!-- nie ma quizów -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from "pinia"
import { useUser } from "@/stores/useUser"
const axiosInstance = useNuxtApp().$axiosInstance as any

const route = useRoute()
const isLoading = ref(true)
const router = useRouter()
const userQuizzes = ref() as any
const userState = useUser();
const { user } = storeToRefs(userState);

const buttonsArray = reactive([
    {
        title: "Quizy",
        link: ""
    },
    {
        title: "Konkursy",
        link: "competition"
    },
    {
        title: "Środki",
        link: "founds"
    },
    {
        title: "Faktury i płatności",
        link: "invoices"
    }
])


const quizSectionsArray = reactive([
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
</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";

.retangle {
    padding: 16px 16px 16px 23px;
    margin-bottom: 20px;
    border-radius: 8px;
    width: 100%;
}

.retangle-title {
    font-size: 16px;
    font-weight: 500;
    margin-top: 6px;
}

.green {
    background: rgba(56, 209, 172, 0.17)
}

.gold {
    background: rgba(209, 157, 56, 0.17)
}

.blue {
    background: rgba(43, 59, 199, 0.17)
}

.red {
    background: rgba(224, 74, 172, 0.17)
}
</style>
