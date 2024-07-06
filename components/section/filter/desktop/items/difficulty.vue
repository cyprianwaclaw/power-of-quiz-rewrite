<template>
    <div class="w-full ">
        <!-- <p class="mb-2 text-lg font-bold">Poziom trasasudności</p> -->
        <div v-for="(level, index) in difficultyArray" :key="index">
            <label class="flex w-full mt-2">
                <input class="w-5 flex mb-[4px]" type="checkbox" v-model="level.selected" />
                <p class="w-full flex ml-2">{{ level.name }}</p>
            </label>
        </div>
           <div class="flex w-full">
            <ButtonLoading isLoading="false" :loading="isLoadingButton" text="Zaloguj się" @click="handleClick('Kategoria')" />
        </div>
    </div>
</template>
<script lang="ts" setup>

const router = useRouter()
const route = useRoute()
const isLoadingButton = ref(false)
const emit = defineEmits(['close'])

const difficultyArray = ref([
    { name: "Łatwy", selected: route.query?.difficulty?.includes('Łatwy') ? true : false },
    { name: "Średni", selected: route.query?.difficulty?.includes('Średni') ? true : false },
    { name: "Trudny", selected: route.query?.difficulty?.includes('Trudny') ? true : false },
])

const handleClick = (openedButton: any) => {
    isLoadingButton.value = true

    const routeParams = { ...router.currentRoute.value.query };
    const changeQueryURL = () => {
        return {
            ...routeParams,
            difficulty: returnSelectedNameFromArray(difficultyArray.value),
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
