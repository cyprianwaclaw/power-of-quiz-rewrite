<template>
    <!-- {{ allDataToEdit[0].difficulty}}
    {{ quizData }} -->
    <!-- {{ title }}gfd -->
    <!-- {{ quizState.title }} -->
    <!-- {{ quizData}} -->
    <div class="bg-white pt-7 pb-8 px-2 mt-10 md:mt-0 rounded-[24px] w-full">
        <div class="row-table-start">
            <textarea v-model="title" wrap="soft" rows="1" class=" w-full -mt-3 " ref="autoResizeTextarea"
                @input="autoResize" placeholder="Nazwa" />
            <p v-if="quizState.isAllData() === true ? false : true && props.error" class="text-error-notification">{{
                validateField('title') }}</p>
        </div>
        <div class="row-table-start">
            <Dropdown v-model="categorySelect" :options="categories" option-label="name" placeholder="Wybierz kategorię"
                class="w-full my-1 -ml-[1px]" :pt="dropdownPt(0)" filter filter-placeholder="Wyszukaj..."
                @show="toggleRotation(0, true)" @hide="toggleRotation(0, false)" />
            <p v-if="quizState.isAllData() === true ? false : true && props.error" class="text-error-notification">{{
                validateField('category') }}</p>
        </div>
        <div class="row-table-start">
            <Dropdown v-model="difficultySelect" :options="difficultyArray" option-label="name"
                placeholder="Poziom trudności" class="w-full my-1 -ml-[1px]" :pt="dropdownPt(1)"
                @show="toggleRotation(1, true)" @hide="toggleRotation(1, false)" />
            <p v-if="quizState.isAllData() === true ? false : true && props.error" class="text-error-notification">{{
                validateField('difficulty') }}</p>
        </div>
        <div class="row-table-start">
            <p class="text-[14px] mb-[6px] text-[#312d2d]">Czas trwania</p>
            <div class="flex place-items-center gap-[12px] mb-1.5">
                <input type="number" min="0" max="99" class="w-[56px] px-[12px] py-[8px]" placeholder="0" v-model="time" />
                <p>minuty</p>
            </div>
            <p v-if="quizState.isAllData() === true ? false : true && props.error" class="text-error-notification">{{
                validateField('time') }}</p>
        </div>
        <div class="row-table-end">
            <textarea v-model="description" wrap="soft" rows="3" class=" w-full mt-1" ref="autoResizeTextarea1"
                @input="autoResize" placeholder="Opis..." />
            <p v-if="quizState.isAllData() === true ? false : true && props.error" class="text-error-notification">{{
                validateField('description') }}</p>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useQuiz } from "@/stores/useQuiz"
// import { useEditQuiz } from "@/stores/useEditQuiz"
const axiosInstance = useNuxtApp().$axiosInstance as any

const router = useRouter()
// const { allDataToEdit } = storeToRefs(useEditQuiz())
const categories = ref([]);
const quizState = useQuiz()
const { isSendSuccess, title, time, description, category_id, difficulty } = storeToRefs(quizState)
const rotationStates = ref<boolean[]>([false, false])
const resCategories = await axiosInstance.get('/categories');
categories.value = resCategories.data.data;

// const quizData = reactive({
//     title,
//     time,
//     description,
//     category_id,
//     difficulty
// })

const props = defineProps({
    error: {
        type: Boolean,
        required: true,
        default: true,
    }
})

const difficultyArray = reactive([
    { id: 'easy', name: 'Łatwy' },
    { id: 'medium', name: 'Średni' },
    { id: 'hard', name: 'Trudny' },
])


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
        time: () => !time.value || time.value == '0',
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
    difficultyNew.value = difficulty
    categoryNew.value = category_id

    // if (router.currentRoute.value.fullPath.includes('edycja')) {
    //     quizData.title = allDataToEdit.value[0].title
    //     quizData.time = allDataToEdit.value[0].time
    //     quizData.description = allDataToEdit.value[0].description
    //     quizData.difficulty = allDataToEdit.value[0].difficulty
    //     // quizData.difficulty = "easy"

    //     quizData.category_id = allDataToEdit.value[0].category_id
    // } else {
        // questionsArrayData.value = questionsArray.value
    // }

    nextTick(() => {
        const textareas = document.querySelectorAll('textarea');
        textareas.forEach((textarea) => {
            textarea.addEventListener('input', autoResize);
            autoResize({ target: textarea } as any);
        })
    })
})

</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";

textarea {
    padding: 0px;
    width: 100%;
    font-size: 16px;
    letter-spacing: 0.17px;
    outline: none;
    font-weight: 500;
    resize: none;
    overflow-y: auto;

    &:focus {
        background-color: #ffffff;
        color: #292828 !important;
        letter-spacing: 0.16px;
        font-weight: 500;
    }

    &::placeholder {
        letter-spacing: 0.17px;
        font-size: 16px;
        font-weight: 400;
        color: #9a9a9a;
    }

    &:focus::placeholder {
        font-weight: 400;
        color: #d1d1d1;
    }

    &::-ms-clear {
        display: none;
    }
}
</style>




