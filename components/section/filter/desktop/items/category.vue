<template>
    <div class="overflow-y-scroll h-[100px]">
        <div v-for="(category, index) in categoriesArray" :key="index">
            <label class="flex w-full mt-2">
                <input class="w-5 flex mb-[4px]" type="checkbox" v-model="category.selected" />
                <p class="w-full flex ml-2">{{ category.name }}</p>
            </label>
        </div>
    </div>
    <div class="flex w-full">
        <ButtonLoading isLoading="false" :loading="isLoadingButton" text="Zaloguj się" @click="handleClick" />
    </div>
</template>
<script lang="ts" setup>

const router = useRouter()
const route = useRoute()
const isLoadingButton = ref(false)

const props = defineProps({
    categories: {
        type: Object,
        required: true
    }
})
const emit = defineEmits(['close'])
const categoriesArray = ref(props.categories)

onMounted(() => {
    categoriesArray.value = props.categories.map((value: any) => {
        return { ...value, selected: router.currentRoute.value.query.category?.includes(value.name) ? router.currentRoute.value.query.category?.includes(value.name) : false }
    })
})

const handleClick = () => {
    isLoadingButton.value = true

    const routeParams = { ...router.currentRoute.value.query };
    const changeQueryURL = () => {
        return {
            ...routeParams,
            category: returnSelectedNameFromArray(categoriesArray.value),
            // category: categoriesArray.value.filter((c) => c.selected == true).map((c) => c.name),
            page: 1
        }
    }

    setTimeout(() => {
        isLoadingButton.value = false
        emit('close')
        router.push({ query: changeQueryURL() })
    }, 1000)

}
</script>
<style lang="scss" scoped></style>
