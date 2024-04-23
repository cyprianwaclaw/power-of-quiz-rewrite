<template>
    <!-- <ModalDown :modalActive="filter" title="Filtruj quizy" @close="filterShow()">
        <template #content>
          <ModalContentQuizFilterView @close="filterShow" @category="category" />
        </template>
      </ModalDown> -->
    <ModalDown :modalActive="sortingMobile" title="Sortowanie" @close="sortingShowMobile()">
        <template #content>
            <ModalContentSorting @close="sortingShowMobile" @save="saveSort" />
        </template>
    </ModalDown>
    <div class=" mt-4 md:mt-5 lg:mt-8 mb-2 md:mb-4 lg:mb-7">
        <h2 class="text-2xl md:text-3xl flex place-items-center font-medium">
            Quizy
        </h2>
    </div>
    <div v-if="!isLoading" class="flex justify-center">
        <p class="text-center">Ładowanie wyników...</p>
    </div>
    <div v-else class="-mb-14">
        <div class="flex sm:hidden">
            <button @click="sortingShowMobile">Sortuj Quizy</button>
        </div>

        <div class="flex justify-between place-items-center mb-4">
        </div>
        <div class="sm:flex hidden flex flex-col">
            <SectionSortingDesktop :categories="mapCategories" />
            <div class="flex gap-2">
                <p class="text-gray-400">
                    Strona {{ route.query.page ? route.query.page : 1 }}/{{ allQuiz.pagination.last_page }}
                </p>
                <p class="text-gray-400">{{ allQuiz.pagination.count }} wyników</p>
            </div>
        </div>


        <div v-if="sortingDesktop" ref="section" class="sm:flex hidden">
            <SectionSortingTest :categories="mapCategories" />
        </div>
        <div v-if="cookieView == 'two'">
            <div class="grid md:grid-cols-2 gap-6 w-full">
                <CardForYou v-for="(quiz, index) in allQuiz.data" :key="index" :quizes="quiz"
                    :plan="hasPremium?.has_premium" />
            </div>
        </div>
        <div v-if="cookieView == 'three'">
            trzy
            <QuizSearchCard v-for="quiz in allQuiz" :key="quiz?.id" :quiz="quiz" />
        </div>
        <div v-if="cookieView == 'four'">
            cztery
            <div class="grid grid-cols-2 gap-6">
                <QuizTwoQuiz v-for="quiz in allQuiz" :key="quiz?.id" :quiz="quiz" />
            </div>
        </div>
        <SectionPagination :last_page="allQuiz.pagination.last_page" :current_page="allQuiz.pagination.current_page" />
    </div>
</template>

<script setup lang="ts">
import { useUser } from "@/stores/useUser";
const axiosInstance = useNuxtApp().$axiosInstance;

definePageMeta({
    middleware: "auth",
});
const userState = useUser();
const router = useRouter()
const route = useRoute()
const isLoading = ref(true)
const endpoint = ref('/quizzes/all')
const allQuiz = ref()
const cookieView = useCookie('view')
const cookiePerPage = useCookie('perPage') as any
const { hasPremium } = storeToRefs(userState);
const sortingDesktop = ref(false)
cookieView.value = cookieView.value ? cookieView.value : 'two'
cookiePerPage.value = cookiePerPage.value ? cookiePerPage.value : 23


const sortingShowDesktop = () => {
    filterDesktop.value = false
    sortingDesktop.value = !sortingDesktop.value;
}

const filterDesktop = ref(false)
const filterShowDesktop = () => {
    sortingDesktop.value = false
    filterDesktop.value = !filterDesktop.value;
}

const sortingMobile = ref(false)
const sortingShowMobile = () => {
    sortingMobile.value = !sortingMobile.value;
}

const res = await axiosInstance.get(`${endpoint.value}?${formatQueryString(route.query)}&per_page=${cookiePerPage.value}`)
allQuiz.value = res.data;

const categories = ref([]) as any;
const resCategories = await axiosInstance.get('/categories')
categories.value = resCategories.data.data;
const mapCategories = categories.value.map((single: any) => ({
    id: single.id,
    name: single.name,
    selected: route.query?.category === single.name ? true : false
}));

const saveSort = async (value: any) => {
    console.log(cookiePerPage.value)

    const res = await axiosInstance.get(`${endpoint.value}?${formatQueryString(router.currentRoute.value.query)}&per_page=${cookiePerPage.value}`)
    allQuiz.value = res.data;
}

onBeforeRouteUpdate(async (to) => {
    const res = await axiosInstance.get(`${endpoint.value}?${formatQueryString(to.query)}&per_page=${cookiePerPage.value}`)
    allQuiz.value = res.data;
})

</script>
<style scoped lang="scss">
@import "@/assets/style/variables.scss";
</style>
