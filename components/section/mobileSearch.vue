<template>
    <div class="fixed z-50 left-0 bottom-0 w-full" v-if="props.modalActive">
        <div class="modal-down">
            <div class="mx-[24px] relative">
                <input v-model="search" type="search" @keyup.enter="searchButton(search)" @input="handleSearchInput"
                    class="input-search" placeholder="Wpisz min 3 znaki..." />
                <div class="absolute right-[13px] top-[35px]" @click="searchButton(search)">
                    <Icon name="ph:magnifying-glass-light" size="30" class="search-icon" />
                </div>
                <div v-if="search.length < 3">
                    <p class="mt-[32px] mb-[14px] text-[17px] font-medium">Popularne quizy</p>
                    <div class="overflow-auto overflow-y-scroll h-screen pb-[280px] scrollbar-hide rounded-[12px]">
                        <CardSearchQuiz :quizes="allQuiz?.data" :plan="hasPremium" :isLoading="isLoading"
                            :n="12" />
                    </div>
                </div>
                <div v-else class="mt-[32px]">
                    <div v-if="searchRes.length === 0 && isLoading === false" class="flex justify-center text-center mt-8">
                        <p>Brak wyników</p>
                    </div>
                    <div class="overflow-auto overflow-y-scroll h-screen pb-[220px] rounded-[12px]">
                        <CardSearchQuiz :quizes="searchRes" :plan="hasPremium" :isLoading="isLoading"
                            :n="12" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useUser } from "@/stores/useUser"

const axiosInstance = useNuxtApp().$axiosInstance as any
const userState = useUser()
const router = useRouter();
const isLoading = ref(true);
const allQuiz = ref();
const { hasPremium } = storeToRefs(userState);
const search = ref<string>('');
const searchRes = ref<string>('');
const emit = defineEmits(['close'])

const props = defineProps({
    modalActive: {
        type: Boolean,
        required: true,
    },
})

const debouncedSearch = debounce(async () => {
    try {
        const res = await axiosInstance.post('/quizzes/search', {
            searchTerm: search.value
        });
        searchRes.value = res.data.quizzes;
    } catch (error) {
        console.error('Error while searching quizzes:', error);
    } finally {
        isLoading.value = false;
    }
}, 330)


const handleSearchInput = () => {
    if (search.value.length >= 3) {
        isLoading.value = true;
        debouncedSearch();
    } else {
        searchRes.value = '';
        isLoading.value = false;
    }
}

onMounted(async () => {
    const res = await axiosInstance.get("/quizzes/all?per_page=12")

    allQuiz.value = res.data;
    isLoading.value = false;
});

watch(props, (newVal) => {
    if (newVal.modalActive === true) {
        search.value = ''
        searchRes.value = ''
    }
})

const searchButton = (searchText: string) => {
    const modifiedText = searchText.split(' ').join('+');
    console.log(modifiedText);
    emit('close')
    router.push(`/panel/quiz?searchTerm=${searchText}`)
};
</script>


<style scoped lang="scss">
@import "@/assets/style/variables.scss";

.modal-down {
    background-color: white;
    position: fixed;
    top: 64px;
    width: 100%;
    z-index: 100;
    height: 100%;
}

.input-search {
    margin-top: 28px;
    background-color: #ECECEC;
    padding: 15px 57px 15px 18px;
    width: 100%;
    font-size: 16px;
    letter-spacing: 0.17px;
    border: 2px solid transparent;
    outline: none;
    border-radius: 12px;
    font-weight: 500;
    transition: border-color 0.15s ease-in-out, color 0.15s ease-in-out, background-color 0.15s ease-in-out;

    &:focus {
        background-color: #ffffff;
        border-color: #d0d0d0;
        border-width: 2px;
        color: #363636 !important;
        letter-spacing: 0.17px;
        font-weight: 500;
    }

    &::placeholder {
        letter-spacing: 0.17px;
        font-size: 16px;
        font-weight: 500;
        color: #9D9D9D;
    }

    &:focus::placeholder {
        font-size: 0px;
    }

    // Stylizacja przycisku do czyszczenia (znaku "x")
    &::-webkit-search-cancel-button {
        -webkit-appearance: none;
        height: 10px;
        margin-left: 13px;
        width: 10px;
        background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="red"><path d="M14.5 1.5L8 8m0 0L1.5 1.5M8 8l6.5 6.5M8 8L1.5 14.5" stroke="black" stroke-width="2" stroke-linecap="round"/></svg>'); // Ikona "x" w SVG
        cursor: pointer;
    }

    &::-ms-clear {
        display: none; // Ukrycie przycisku w IE
    }
}


.search-icon {
    color: #b1b1b1;
    margin: 6px;
}
</style>
