<template>
    <div class="overflow-y-scroll h-[275px] right-8 left-8 pr-4">
        <p class="mb-3 text-lg font-bold">Poziom trudności</p>
        <div v-for="(level, index) in difficultyArray" :key="index">
            <label class="flex w-full mt-2">
                <input class="w-5 flex mb-[4px]" type="checkbox" v-model="level.selected" />
                <p class="w-full flex ml-2">{{ level.name }}</p>
            </label>
        </div>
        <p class="mb-3 text-lg font-bold  mt-9">Kategoria</p>
        <div class="overflow-y-scroll h-[160px]">
            <div v-for="(category, index) in categoriesArray" :key="index">
                <label class="flex w-full mt-2">
                    <input class="w-5 flex mb-[4px]" type="checkbox" v-model="category.selected" />
                    <p class="w-full flex ml-2">{{ category.name }}</p>
                </label>
            </div>
        </div>

        <p class="mb-6 text-lg font-bold mt-6">Liczba pytań</p>
        <Slider v-model="sliderRange" range :min="0" :max="70" class="w-14rem" :step="1" />
        <div class="flex justify-between mt-4">
            <InputNumber v-model.number="sliderRange[0]" class="w-14" />
            <InputNumber v-model.number="sliderRange[1]" class="w-14" />
        </div>

        <div class="flex mt-10 mb-5 gap-2 place-items-end">
            <p class="text-lg font-bold">Czas trwania</p>
            <p class="text-sm text-slate-300 mb-[2px]">( minuty )</p>
        </div>
        <Slider v-model="sliderRangeDuration" range :min="0" :max="70" class="w-14rem" :step="1" />
        <div class="flex justify-between mt-4">
            <InputNumber v-model.number="sliderRangeDuration[0]" class="w-14" />
            <InputNumber v-model.number="sliderRangeDuration[1]" class="w-14" />
        </div>
        <div class="w-full flex place-items-center mt-12 mb-6">
            <p class="text-red-600 px-9 py-3"  @click="removeAllQuery()">Wyczyść</p>
            <button class="button-primary w-full" @click="saveChanges()">
                Flirtuj wyniki
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
const router = useRouter() as any
const route = useRoute()
const view = ref('') as any

const emit = defineEmits<{
    (e: "close"): void;
}>()

const props = defineProps({
    categoriesArray: {
        type: Array as any,
        required: true
    }
})
const difficultyArray = ref([
    { name: "Łatwy", selected: route.query?.difficulty?.includes('Łatwy') ? true : false },
    { name: "Średni", selected: route.query?.difficulty?.includes('Średni') ? true : false },
    { name: "Trudny", selected: route.query?.difficulty?.includes('Trudny') ? true : false },
])


const categoriesArray = ref(props.categoriesArray)

onMounted(() => {
    categoriesArray.value = props.categoriesArray.map((value: any) => {
        return { ...value, selected: router.currentRoute.value.query.category?.includes(value.name) ? router.currentRoute.value.query.category?.includes(value.name) : false }
    })
})
const diff = ref<number>(20)
const diffDuration = ref<number>(20)

const sliderRange = ref<number[]>([
    Number(router.currentRoute.value.query.question_count_from ? router.currentRoute.value.query.question_count_from : 4),
    Number(router.currentRoute.value.query.question_count_to ? router.currentRoute.value.query.question_count_to : 40)
])

watch(sliderRange, (newValue, oldValue) => {
    if (newValue[1] - newValue[0] <= diff.value) {
        nextTick(() => {
            sliderRange.value = [oldValue[0], oldValue[1]]; // Ustawienie wartości suwaka na poprzednie wartości
        })
    }
})

const sliderRangeDuration = ref<number[]>([
    Number(router.currentRoute.value.query.time_from ? router.currentRoute.value.query.time_from : 4),
    Number(router.currentRoute.value.query.time_to ? router.currentRoute.value.query.time_to : 40)
])

watch(sliderRangeDuration, (newValue, oldValue) => {
    if (newValue[1] - newValue[0] <= diffDuration.value) {
        nextTick(() => {
            sliderRangeDuration.value = [oldValue[0], oldValue[1]]; // Ustawienie wartości suwaka na poprzednie wartości
        })
    }
})

const sortingArray = reactive([
    { key: "order_by_time", value: "desc", label: "Czas malejąco", checked: router.currentRoute.value.query.order_by_time == "desc" ? true : false },
    { key: "order_by_time", value: "asc", label: "Czas rosnąco", checked: router.currentRoute.value.query.order_by_time == "asc" ? true : false },
    { key: "order_by_questions", value: "asc", label: "Pytania malejąco", checked: router.currentRoute.value.query.order_by_questions == "desc" ? true : false },
    { key: "order_by_questions", value: "desc", label: "Pytania rosnąco", checked: router.currentRoute.value.query.order_by_questions == "asc" ? true : false },
    { key: "order_by_date", value: "asc", label: "Od najnowszych", checked: router.currentRoute.value.query.order_by_date == "desc" ? true : false },
    { key: "order_by_date", value: "desc", label: "Od najstarszych", checked: router.currentRoute.value.query.order_by_date == "asc" ? true : false },

])

const unselectOtherItems = (array: any[], selected: number) => {
    array.forEach((single: any, index: number) => {
        if (index !== selected) {
            single.checked = false;
        }
    })

}


const saveChanges = () => {

    const routeParams = { ...router.currentRoute.value.query };
    const changeQueryURL = () => {
        return {
            ...routeParams,
            question_count_from: sliderRange.value[0],
            question_count_to: sliderRange.value[1],
            time_from: sliderRangeDuration.value[0],
            time_to: sliderRangeDuration.value[1],
            category: returnSelectedNameFromArray(categoriesArray.value),
            difficulty: returnSelectedNameFromArray(difficultyArray.value),
            page: 1
        }
    }
    router.push({ query: changeQueryURL() })
    scrollToTop()
    emit('close')

}

const removeAllQuery = () => {
    router.push({ query: null })
    scrollToTop()
    emit('close')
}
</script>

<style lang="scss" scoped>
@import "@/assets/style/variables.scss";
</style>
