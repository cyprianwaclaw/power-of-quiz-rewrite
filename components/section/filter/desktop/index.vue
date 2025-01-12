<template>
    <div class="flex justify-between place-items-center">
        <div class="flex w-full gap-7">
            <div v-for="(button, i) in buttonsArray.slice(0, 4)" :key="i">
                <div class="w-full relative">
                    <button @click="toggleClick(button.text)" :class="{ 'active': button.click }">
                        {{ button.text }}
                        <Icon name="ph:caret-down" size="24" :class="{ 'rotate': button.click }" class="search-icon" />
                        <div :class="{ 'border-bottom': button.click }" class="hidden" />
                    </button>
                    <div class="content border-radius h-[235px] min-w-[220px]"
                        v-if="button.click && button.name === 'category'">
                        <SectionFilterDesktopItemsCategory :categories="props.categories"
                            @close="toggleClick(button.text)" />
                    </div>
                    <div class="content h-[206px]" v-if="button.click && button.name === 'difficulty'">
                        <SectionFilterDesktopItemsDifficulty @close="toggleClick(button.text)" />
                    </div>
                    <div class="content border-radius h-[230px] min-w-[280px]"
                        v-if="button.click && button.name === 'questions'">
                        <SectionFilterDesktopItemsQuestions @close="toggleClick(button.text)" />
                    </div>
                    <div class="content border-radius h-[230px] min-w-[280px]"
                        v-if="button.click && button.name === 'duration'">
                        <SectionFilterDesktopItemsDuration @close="toggleClick(button.text)" />
                    </div>
                </div>
            </div>
        </div>
        <SectionFilterDesktopItemsSorting1 />
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    categories: {
        type: Object,
        required: true
    }
})

const buttonsArray = reactive([
    { "text": "Kategoria", "name": "category", "click": false },
    { "text": "Poziom trudności", "name": "difficulty", "click": false },
    { "text": "Pytania", "name": "questions", "click": false },
    { "text": "Czas", "name": "duration", "click": false },
    { "text": "Sorting", "name": "sorting", "click": false },

])

const toggleClick = (name: string) => {
    const activeButton = buttonsArray.find(button => button.click === true);
    const clickedButton = buttonsArray.find(button => button.text === name);

    if (activeButton && activeButton === clickedButton) {
        activeButton.click = false;
    } else {
        if (activeButton) {
            activeButton.click = false;
        }
        if (clickedButton) {
            clickedButton.click = true;
        }
    }
}
</script>
    
<style scoped lang="scss">
@import "@/assets/style/variables.scss";

$borderColor: black;

.rotate {
    transform: rotate(180deg);
    transition: transform 0.1s ease;
}

.search-icon {
    transition: transform 0.1s ease;
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

.content {
    background-color: white;
    position: absolute;
    z-index: 10;
    border: 2px solid $borderColor;
    border-radius: 0px 0px 8px 8px;
    width: 100%;
    padding: 6px 20px 12px 20px;
}

.border-radius {
    border-radius: 0px 8px 8px 8px !important;
}

.border-bottom {
    display: flex !important;
    border: 4px solid white;
    z-index: 20;
    position: absolute;
    bottom: -7px;
    width: 100%
}
</style>
