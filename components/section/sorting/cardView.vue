<template>
    <div class="w-full grid grid-cols-3 justify-items-center mt-[21px] mb-[34px]">
        <div @click="changeView('two')">
            <div :class="[currentView === 'two' ? 'active' : 'nonActive']" class="w-12 rounded-[4px] h-[30px]" />
            <div :class="[currentView === 'two' ? 'active' : 'nonActive']" class="w-12 rounded-[4px] h-[30px] mt-1.5" />
        </div>
        <div @click="changeView('three')">
            <div :class="[currentView === 'three' ? 'active' : 'nonActive']" class=" rounded-[4px] w-12 h-[18px]" />
            <div :class="[currentView === 'three' ? 'active' : 'nonActive']" class=" rounded-[4px] w-12  h-[18px] mt-1.5" />
            <div :class="[currentView === 'three' ? 'active' : 'nonActive']" class=" rounded-[4px] w-12  h-[18px] mt-1.5" />
        </div>
        <div @click="changeView('four')">
            <div class="grid grid-cols-2 gap-1.5">
                <div class="w-[26px] rounded-[4px] h-[30px]" :class="[currentView === 'four' ? 'active' : 'nonActive']" />
                <div class="w-[26px] rounded-[4px] h-[30px]" :class="[currentView === 'four' ? 'active' : 'nonActive']" />
            </div>
            <div class="grid grid-cols-2 gap-1.5 mt-1.5">
                <div class="w-[26px] rounded-[4px] h-[30px]" :class="[currentView === 'four' ? 'active' : 'nonActive']" />
                <div class="w-[26px] rounded-[4px] h-[30px]" :class="[currentView === 'four' ? 'active' : 'nonActive']" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
    (e: "changeView", value: string): void;

}>();

const cookie = useCookie('view')

const currentView = ref(cookie.value ? cookie.value : 'two')

const changeView = (newView: string) => {
    currentView.value = newView
    emit('changeView', newView)
}

</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";

.nonActive {
    background-color: hsl(223, 100%, 93%);
}

.active {
    background-color: $primary;
}
</style>
