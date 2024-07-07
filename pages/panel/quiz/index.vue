<template>
    <ModalDown :modalActive="filter" title="Filtruj quizy" @close="filterShow">
        <template #content>
            <ModalContentFilter @close="filterShow" :categoriesArray="mapCategories" />
        </template>
    </ModalDown>
    <ModalDown :modalActive="sortingMobile" title="Sortowanie" @close="sortingShowMobile">
        <template #content>
            <ModalContentSorting @close="sortingShowMobile" @save="saveSort" />
        </template>
    </ModalDown>
    <div class="md:mt-5 lg:mt-8 mb-2 md:mb-4 lg:mb-7">
        <h2 class="text-2xl md:text-3xl flex place-items-center font-medium">
            Quizy
        </h2>
        <div v-if="router.currentRoute.value.query.searchTerm" class="mt-[23px]">
            <div class="flex justify-between">
                <p class="text-gray-600 font-medium text-[15px]">Wyszukiwanie dla:</p>
                <p @click="clearSearchTerm()" class="primary-color text-[14px]">Wyczyść wyniki</p>
            </div>
            <p class="font-semibold text-[18px]">
                {{ router.currentRoute.value.query.searchTerm }}
            </p>
        </div>
    </div>
    <div class="-mb-24">
        <div class="flex w-full justify-between -mb-[1px] mt-[20px] place-items-center">
            <div v-if="isLoading">
                <div class="card is-loading">
                    <div class="image" />
                </div>
            </div>
            <div v-else class="flex gap-2 text-[15px]">
                <p class="text-gray-400">
                    Strona {{ route.query.page ? route.query.page : 1 }}/{{ allQuiz?.pagination?.last_page }}
                </p>
                <p class="text-gray-400">( {{ allQuiz?.pagination.count }} )</p>
            </div>
            <div class="flex sm:hidden">
                <button @click="sortingShowMobile">
                    <p class="primary-color font-medium">Sortuj</p>
                </button>
            </div>
        </div>
        <div class="flex justify-between place-items-center mb-4">
        </div>
        <div class="sm:flex hidden flex flex-col mb-[32px]">
            <SectionFilterDesktop :categories="mapCategories" />
        </div>
        <div class="fixed margin z-30 lg:hidden flex w-[12px] justify-end right-0 bottom-[160px]">
            <div class="open-filter" @click="filterShow">
                <Icon name="heroicons:adjustments-horizontal" size="32" color="white" />
            </div>
        </div>
        <div v-if="cookieView == 'two'">
            <CardTwoQuiz :quizes="allQuiz?.data" :plan="hasPremium?.has_premium" :isLoading="isLoading" :n="10" />
        </div>
        <div v-if="cookieView == 'three'">
            <CardSearchQuiz :quizes="allQuiz?.data" :plan="hasPremium?.has_premium" :isLoading="isLoading" :n="10" />
        </div>
        <div v-if="cookieView == 'four'">
            <CardFourQuiz :quizes="allQuiz?.data" :plan="hasPremium?.has_premium" :isLoading="isLoading" :n="10" />
        </div>
        <div v-if="allQuiz?.data.length == 0" class="flex justify-center mt-8">
            Brak wyników
        </div>
        <SectionPagination :last_page="allQuiz?.pagination?.last_page" :current_page="allQuiz?.pagination?.current_page"
            :isLoading="isLoading" />
    </div>
</template>

<script setup lang="ts">
import { useUser } from "@/stores/useUser";
const axiosInstance = useNuxtApp().$axiosInstance;

definePageMeta({
    middleware: "auth",
})

const userState = useUser();
const router = useRouter();
const route = useRoute();
const isLoading = ref(true);
const endpoint = ref('/quizzes/all');
const allQuiz = ref();
const cookieView = useCookie('view');
const cookiePerPage = useCookie('perPage') as any;
const { hasPremium } = storeToRefs(userState);
const categories = ref([]);

const filter = ref(false);
const sortingMobile = ref(false);

cookieView.value = cookieView.value || 'two';
cookiePerPage.value = cookiePerPage.value || 23;

const filterShow = () => {
    filter.value = !filter.value;
}

const sortingShowMobile = () => {
    sortingMobile.value = !sortingMobile.value;
}

onMounted(async () => {
    const res = await axiosInstance.get(`${endpoint.value}?${formatQueryString(route.query)}&per_page=${cookiePerPage.value}`);
    allQuiz.value = res.data;
    isLoading.value = false;
});


const resCategories = await axiosInstance.get('/categories');
categories.value = resCategories.data.data;

const mapCategories = categories.value.map((single: any) => ({
    id: single.id,
    name: single.name,
    selected: route.query?.category === single.name ? true : false
}));

const saveSort = async (value: any) => {
    const res = await axiosInstance.get(`${endpoint.value}?${formatQueryString(router.currentRoute.value.query)}&per_page=${cookiePerPage.value}`);
    allQuiz.value = res.data;
};

onBeforeRouteUpdate(async (to) => {
    isLoading.value = true;
    const res = await axiosInstance.get(`${endpoint.value}?${formatQueryString(to.query)}&per_page=${cookiePerPage.value}`);
    allQuiz.value = res.data;
    isLoading.value = false;
});


const clearSearchTerm = () => {
    router.push('/panel/quiz')

}

</script>



<style scoped lang="scss">
@import "@/assets/style/variables.scss";

.open-filter {
    color: white;
    background-color: #618cfb;
    padding: 8px 6px 8px 9px;
    border: 1px solid transparent;
    border-radius: 14px 0px 0px 14px;
}

.card.is-loading {

    .image,
    h2,
    p {
        // background: #eee;
        background: linear-gradient(110deg, #c7c7c7 8%, #d4d4d4 18%, #c7c7c7 33%);
        border-radius: 5px;
        // background-size: 300% 100%;
        animation: 1.6s shine linear infinite;
    }

    .image {
        height: 23px;
        width: 160px;
        border-radius: 7px;
    }

    h2 {
        height: 30px;
    }

    p {
        height: 70px;
    }
}

@keyframes shine {
    to {
        background-position-x: -200%;
    }
}
</style>
