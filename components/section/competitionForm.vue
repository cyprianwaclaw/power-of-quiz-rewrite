<template>
    <div class="bg-white pt-7 pb-8 px-2 mt-10 rounded-[24px] w-full">
        <div class="row-table-start">
            <textarea v-model="title" wrap="soft" rows="1" class=" w-full -mt-3 " ref="autoResizeTextarea"
                @input="autoResize" placeholder="Nazwa" />
            <p v-if="props.error" class="text-error-notification">{{ validateField('title') }}</p>
        </div>
        <div class="row-table-start">
            <Dropdown v-model="categorySelect" :options="categories" option-label="name" placeholder="Wybierz kategorię"
                class="w-full my-1 -ml-[1px]" :pt="dropdownPt(0)" filter filter-placeholder="Wyszukaj..."
                @show="toggleRotation(0, true)" @hide="toggleRotation(0, false)" />
            <p v-if="props.error" class="text-error-notification">{{ validateField('category') }}</p>
        </div>
        <div class="row-table-start">
            <Dropdown v-model="difficultySelect" :options="difficultyArray" option-label="name"
                placeholder="Poziom trudności" class="w-full my-1 -ml-[1px]" :pt="dropdownPt(1)"
                @show="toggleRotation(1, true)" @hide="toggleRotation(1, false)" />
            <p v-if="props.error" class="text-error-notification">{{ validateField('difficulty') }}</p>
        </div>
        <div class="row-table-start">
            <p class="text-[14px] mb-[6px] text-[#312d2d]">Nagrody na wyznaczone miejsce</p>
            <div class="flex flex-col md:flex-row">
                <input class="border-none pl-0" placeholder="Pierwsze" v-model="first_points" type="number" />
                <p v-if="props.error && !first_points" class="text-error-notification">Uzupełnij wygraną</p>
                <input class="border-none pl-0" placeholder="Drugie" v-model="second_points" type="number" />
                <p v-if="props.error && !second_points" class="text-error-notification">Uzupełnij wygraną</p>
                <input class="border-none pl-0" placeholder="Trzecie" v-model="third_points" type="number" />
                <p v-if="props.error && !third_points" class="text-error-notification">Uzupełnij wygraną</p>
            </div>
        </div>
        <div class="row-table-start flex flex-col md:flex-row place-items-center -m-[8px]">
            <p class="text-[14px] mb-[6px] text-[#312d2d] pr-[30px] mt-[8px]">Data i godzina</p>
            <div class="flex flex-col md:flex-row gap-[0px]">
                <Calendar v-model="time" class="w-[145px] my-1 -ml-[1px]" dateFormat="dd.mm.yy" placeholder="Data konkursu"
                :pt="dropdownPt(1)" />
                <div class="flex gap-[0px] -mt-[24px] md:mt-[0px]">
                    <Calendar v-model="time_start" class="w-[70px] my-1 -ml-[1px]" showTime timeOnly placeholder="Start"
                    :pt="dropdownPt(1)" />
                    <Calendar v-model="time_end" class="w-[80px] my-1 -ml-[1px]" showTime timeOnly placeholder="Koniec"
                    :pt="dropdownPt(1)" />
                </div>
            </div>
            <p v-if="props.error && (!time || !time_end || !time_start)" class="text-error-notification">Uzupełnij datę
                oraz godziny konkursu</p>
        </div>
        <div class="row-table-end">
            <textarea v-model="description" wrap="soft" rows="3" class=" w-full mt-1" ref="autoResizeTextarea1"
                @input="autoResize" placeholder="Opis..." />
            <p v-if="props.error" class="text-error-notification">{{ validateField('description') }}</p>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useCompetition } from "@/stores/useCompetition"
const axiosInstance = useNuxtApp().$axiosInstance as any

const props = defineProps({
    error: {
        type: Boolean,
        required: true,
        default: true,
    }
})
const categories = ref([]);
const resCategories = await axiosInstance.get('/categories');
categories.value = resCategories.data.data;

const difficultyArray = reactive([
    { id: 'easy', name: 'Łatwy' },
    { id: 'medium', name: 'Średni' },
    { id: 'hard', name: 'Trudny' },
])

const quizState = useCompetition()
const { isSendSuccess, title, description, category_id, difficulty, first_points, second_points, third_points, time, time_start, time_end } = storeToRefs(quizState)
const rotationStates = ref<boolean[]>([false, false])

const toggleRotation = (index: number, isVisible: boolean) => {
    rotationStates.value[index] = isVisible;
}

const dropdownPt = (index: number) => ({
    root: {
        style: 'outline: 1px solid white; padding-left: 0px',
    },
    input: ({ instance, props }: { instance: any, props: any }) => ({
        class: [
            instance?.label === props.placeholder
                ? 'text-[#9a9a9a] font-[400] family'
                : 'text-black'
        ],
        style: 'border: 1px solid white; padding: 0px',
    }),
    trigger: () => ({
        style: rotationStates.value[index]
            ? 'transform: rotate(180deg); transition: transform 0.3s ease;'
            : 'transition: transform 0.3s ease;'
    }),
    panel: {
        style: 'z-index: 0;',
    },
    filterIcon: {
        style: 'width: 27px; margin-top: -7px; margin-right: 2px; background-color: white; padding-left: 8px;',
    },
})

const autoResize = (event: Event) => {
    const target = event.target as HTMLTextAreaElement;
    if (target) {
        target.style.height = 'auto';
        target.style.height = `${target.scrollHeight}px`;
    }
}


const validateField = (field: string): string | null => {
    const errors = {
        title: () => !title.value || title.value.length < 3,
        category: () => !category_id.value,
        difficulty: () => !difficulty.value,
        description: () => !description.value || description.value.length < 10,
    } as any
    const errorMessages = {
        title: 'Wprowadź min 3 znaki',
        category: 'Wybierz kategorię',
        difficulty: 'Wybierz poziom trudności',
        time: 'Wpisz czas trwania',
        description: 'Wprowadź min 10 znaków',
    } as any

    if (props.error && errors[field]()) {
        // errorState.value = true
        return errorMessages[field]
    }

    return null
}

const difficultyNew = ref()
const difficultySelect = ref()

const categoryNew = ref()
const categorySelect = ref()

watch(difficultyNew, (newValue: any) => {
    difficultySelect.value = difficultyArray.find((diff: any) => diff.id === difficulty.value) || {}
})

watch(difficultySelect, (newValue: any) => {
    difficulty.value = newValue.id
})

watch(categoryNew, (newValue: any) => {
    if (category_id.value !== undefined && category_id.value !== null) {
        const categoryId = category_id.value;
        const foundCategory = categories.value.find((category: any) => category.id == categoryId);
        categorySelect.value = foundCategory
    }
})

watch(categorySelect, (newValue: any) => {
    category_id.value = newValue.id
})

watch(isSendSuccess, (newValue: any) => {
    difficultySelect.value = {}
    categorySelect.value = {}
})


onMounted(() => {
    // errorState.value = true;
    difficultyNew.value = difficulty
    categoryNew.value = category_id

    nextTick(() => {
        const textareas = document.querySelectorAll('textarea');
        textareas.forEach((textarea) => {
            textarea.addEventListener('input', autoResize);
            autoResize({ target: textarea } as any);
        })
    })
})
</script>
<style lang="scss" scoped></style>
