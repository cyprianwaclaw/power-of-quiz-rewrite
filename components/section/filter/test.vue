<template>
    <!-- <div class="w-full h-[510px] pb-10 absolute bg-white z-30 top-0"> -->
        <div class="w-full h-[510px] pb-10">
        <div class="w-full p-10 bg-white">
            <div class="w-full flex">
                <div class="w-full ">
                    <p class="mb-2 text-lg font-bold">Poziom trasasudności</p>
                    <div v-for="(level, index) in difficultyArray" :key="index">
                        <label class="flex w-full mt-2">
                            <input class="w-5 flex mb-[4px]" type="checkbox" v-model="level.selected" />
                            <p class="w-full flex ml-2">{{ level.name }}</p>
                        </label>
                    </div>
                </div>
                <div class="w-full ">
                    <p class="mb-2 text-lg font-bold">Kategoria</p>
                    <div class="overflow-y-scroll h-[170px] right-8 left-8 pr-4 w-[180px]">
                        <div v-for="(category, index) in props.categories" :key="index">
                            <label class="flex w-full mt-2">
                                <input class="w-5 flex mb-[4px]" type="checkbox" v-model="category.selected" />
                                <p class="w-full flex ml-2">{{ category.name }}</p>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="w-full ">
                    <p class="mb-6 text-lg font-bold">Liczba pytań</p>
                    <InputRange :min="1" :max="60" v-model:max-value="maxAnswersRange"
                        v-model:min-value="minAnswersRange" />
                    <p class="mb-6 text-lg font-bold mt-9">
                        Czas trwania<span class="text-gray text-xs font-normal ml-[5px]">( minuty )</span>
                    </p>
                    <InputRange :min="1" :max="60" v-model:min-value="minTimeRange" v-model:max-value="maxTimeRange" />
                </div>
            </div>
            <div class="flex columns-2 gap-4 mt-10 mb-5">
                <button class="button-remove w-full" @click="saveChanges">Wyczyść</button>
                <button class="button-primary w-full" @click="saveChanges">Zapisz</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const router = useRouter();
const route = useRoute();

const props = defineProps({
    categories: {
        type: Object,
        required: true
    }
})

const minAnswersRange = ref(
    router.currentRoute.value.query.question_count_from ? router.currentRoute.value.query.question_count_from : 4
)

const maxAnswersRange = ref(
    router.currentRoute.value.query.question_count_to ? router.currentRoute.value.query.question_count_to : 56
)

const minTimeRange = ref(
    router.currentRoute.value.query.time_from ? router.currentRoute.value.query.time_from : 4
)

const maxTimeRange = ref(
    router.currentRoute.value.query.time_to ? router.currentRoute.value.query.time_to : 56
)

const emit = defineEmits<{
    (e: "state", value: string): void;
    (e: "perPage", value: number): void;
    (e: "close"): void;
}>();

const difficultyArray = ref([
    { name: "Łatwy", selected: route.query?.difficulty?.includes('Łatwy') ? true : false },
    { name: "Średni", selected: route.query?.difficulty?.includes('Średni') ? true : false },
    { name: "Trudny", selected: route.query?.difficulty?.includes('Trudny') ? true : false },
]);

const saveChanges = () => {
    const routeParams = { ...router.currentRoute.value.query };
    const changeQueryURL = () => {
        return {
            ...routeParams,
            category: returnSelectedNameFromArray(props.categories),
            difficulty: returnSelectedNameFromArray(difficultyArray.value),
            question_count_from: minAnswersRange.value,
            question_count_to: maxAnswersRange.value,
            time_to: maxTimeRange.value,
            time_from: minTimeRange.value,
            page: 1
        };
    };

    router.push({ query: changeQueryURL() });
    emit("close");
};

</script>
