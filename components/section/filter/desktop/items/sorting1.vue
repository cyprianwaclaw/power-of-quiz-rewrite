<template>
    <div class="relative">
        <button @click="handleClick()" class="flex"  :class="{ 'active': isOpen}">
            Sortowanie
            <Icon name="ph:caret-down" size="24" :class="{ 'rotate': isOpen }" class="search-icon" />
            <div :class="{ 'border-bottom': isOpen }" class="hidden" />

        </button>
        <div v-if="isOpen" class="content">
            <!-- <SectionFilterCardView @changeView="changeView" />
            <div class="mb-8">
                <p class="mb-2.5 text-lg font-bold">Liczba na stronie</p>
                <InputSingleRange :max="60" :min="2" v-model="cookiePerPage" />
            </div> -->
            <!-- <p class="mb-4 text-lg font-bold">Inne opcje sortowania</p> -->
            <div v-for="(single, index) in sortingArray" :key="index">
                <label class="flex w-full mt-2">
                    <input type="checkbox" class="w-5 flex mb-[4px]" v-model="single.checked"
                        @change="unselectOtherItems(sortingArray, index)" />
                    <p class="ml-2">{{ single.label }}</p>
                </label>
            </div>
            <button class="button-primary w-full mt-9 mb-5" @click="saveChanges">
               Sortuj
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
const router = useRouter() as any;
const view = ref('') as any
const cookieView = useCookie('view')
const cookiePerPage = useCookie('perPage')
const emit = defineEmits<{
    (e: "state", value: string): void;
    (e: "close"): void;
    (e: "save", value: string): void;
    (e: "changeView", value: string): void;

}>()

const changeView = (value: any) => {
    view.value = value
}

const isOpen = ref(false)
const handleClick = () => {
    isOpen.value = !isOpen.value
}

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
    cookieView.value = view.value ? view.value : cookieView.value
    delete routeParams['order_by_time']
    delete routeParams['order_by_date']
    delete routeParams['order_by_questions']

    const selectedSort = sortingArray.find((item: any) => item.checked == true) as any

    const changeQueryURL = () => {
        const queryObj: any = {
            ...routeParams,
            page: 1,
        };
        if (selectedSort) {
            queryObj[selectedSort.key] = selectedSort.value;
        }
        return queryObj;
    };
    setTimeout(() => {
        emit('close')
        router.push({ query: changeQueryURL() })
    }, 400)
    handleClick()

}
</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";

$borderColor: black;

.content {
    background-color: white;
    position: absolute;
    z-index: 10;
    border: 2px solid $borderColor;
    border-radius: 8px 0px 8px 8px;
    right: 0;
    top: 50px;
    width: 260px;
   // height: 300px;
    padding: 18px 28px 10px 24px;
}


.rotate {
    transform: rotate(180deg);
    transition: transform 0.1s ease;
}

.border-bottom {
    display: flex !important;
    border: 4px solid rgb(255, 255, 255);
    z-index: 20;
    position: absolute;
    bottom: -5px;
    width: 100%
}

button {
    padding: 12px 12px 12px 12px;
    border: 2px solid $borderColor;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
    position: relative;
    z-index: 15;

    &.active {
        background-color: white;
        border-radius: 8px 8px 0px 0px;
    }
}

.search-icon {
    transition: transform 0.1s ease;
}
</style>

