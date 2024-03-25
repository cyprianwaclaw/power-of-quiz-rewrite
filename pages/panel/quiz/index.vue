<template>
    <div v-if="!isLoading" class="flex justify-center">
        <p class="text-center">Ładowanie wyników...</p>
    </div>
    <div v-else class="-mb-14">
        <div class="flex justify-between place-items-center mb-4">
            <div class="flex flex-row gap-2">
                <p class="text-[13px] text-gray-400">
                    Strona {{ route.query.page ? route.query.page : 1 }}/{{ allQuiz.pagination.last_page }}
                </p>
                <div class="vl"></div>
                <p class="text-[13px] text-gray-400">{{ allQuiz.pagination.count }} wyników</p>
            </div>
            <div class="sm:flex hidden">
                <!-- sortowanie na desktop -->
                <button @click="sortingShow">Sortuj</button>
            </div>
        </div>
        <!-- <Transition @enter="EnterModal" @leave="LeaveModal" :css="false"> -->
        <div v-if="sorting" ref="section">
            <SectionSorting :categories="mapCategories" />
        </div>
        <!-- </Transition> -->
        <div v-if="view == 'two'">
            <div class="grid grid-cols-2 gap-6">
                <CardForYou v-for="(quiz, index) in allQuiz.data" :key="index" :quizes="quiz"
                    :plan="hasPremium?.has_premium" />
            </div>
        </div>
        <div v-if="view == 'three'">
            <QuizSearchCard v-for="quiz in allQuiz" :key="quiz?.id" :quiz="quiz" />
        </div>
        <div v-if="view == 'four'">
            <div class="grid grid-cols-2 gap-6">
                <QuizTwoQuiz v-for="quiz in allQuiz" :key="quiz?.id" :quiz="quiz" />
            </div>
        </div>
        <SectionPagination :last_page="allQuiz.pagination.last_page" :current_page="allQuiz.pagination.current_page" />
    </div>
    <!-- <pre class="mt-24">
    {{ allQuiz.data }}
    </pre> -->
</template>

<script setup lang="ts">
import gsap from "gsap";
import { useUser } from "@/stores/useUser";
const axiosInstance = useNuxtApp().$axiosInstance;

definePageMeta({
    middleware: "auth",
});

const userState = useUser();
const { hasPremium } = storeToRefs(userState);
const sorting = ref(false)
const sortingShow = () => {
    sorting.value = !sorting.value;
}
const route = useRoute()
const isLoading = ref(true)
const view = ref('two')

const endpoint = ref('/quizzes/all')

const allQuiz = ref()
const res = await axiosInstance.get(`${endpoint.value}?${formatQueryString(route.query)}`)
allQuiz.value = res.data;

const categories = ref([]) as any;
const resCategories = await axiosInstance.get('/categories')
categories.value = resCategories.data.data;
const mapCategories = categories.value.map((single: any) => ({
    id: single.id,
    name: single.name,
    selected: route.query?.category === single.name ? true : false
}));



onBeforeRouteUpdate(async (to) => {
    const res = await axiosInstance.get(`${endpoint.value}?${formatQueryString(to.query)}`)
    allQuiz.value = res.data;
})

const section = ref()

const EnterModal = (el: any, done: any) => {
    const targetHeight = section.value.offsetHeight;
    console.log(targetHeight)
    gsap.fromTo(el, { height: 0 }, {
        duration: 0.4,
        height: targetHeight,
        onComplete: done
    });
};

const LeaveModal = (el: any, done: any) => {
    gsap.to(el, {
        duration: 0.18,
        opacity: 0,
    })
    gsap.to(el, {
        // display: 'none',
        duration: 0.4,
        height: 0,
        onComplete: done
    });

};

</script>
<style scoped lang="scss">
@import "@/assets/style/variables.scss";
</style>
