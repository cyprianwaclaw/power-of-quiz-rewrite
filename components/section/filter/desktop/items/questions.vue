<template>
    <div class="w-full mt-10">
        <Slider v-model="sliderRange" range :min="0" :max="70" class="w-14rem" :step="1" />
        <div class="flex justify-between mt-4">
            <InputNumber v-model.number="sliderRange[0]" class="w-14" />
            <InputNumber v-model.number="sliderRange[1]" class="w-14" />
        </div>
        <div class="flex w-full mt-[32px]">
            <ButtonLoading isLoading="false" :loading="isLoadingButton" text="Zapisz" @click="handleClick()" />
        </div>
    </div>
</template>

<script setup lang="ts">
import Slider from 'primevue/slider';

const router = useRouter()
const diff = ref<number>(20)
const isLoadingButton = ref(false)
const emit = defineEmits(['close'])

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

const handleClick = () => {
    isLoadingButton.value = true
    const routeParams = { ...router.currentRoute.value.query };
    const changeQueryURL = () => {
        return {
            ...routeParams,
            question_count_from: sliderRange.value[0],
            question_count_to: sliderRange.value[1],
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

<style scoped lang="scss"></style>

