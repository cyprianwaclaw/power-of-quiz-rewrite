<template>
    <div class="select -ml-2" id="element1">
        <div id="element1" class="mx-[1px] pt-0" @click="toggleDropdown">
            <input id="element1" type="text" v-model="filter" :placeholder="props.placeholder" class="filter-input" />
        </div>
        <div v-if="dropdownOpen" class="list-container" id="element1">
            <div class="options-list" id="element1">
                <div v-for="item in filteredItems" :key="item.id" id="element1" @click="selectItem(item)"
                    style="cursor: pointer;">
                    {{ item.name }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    options: Array,
    modelValue: Number,
    placeholder: String,
})

const emit = defineEmits(['update:modelValue', 'change'])

const selectedItem = ref(props.modelValue);
const filter = ref('');
const dropdownOpen = ref(false);

const filteredItems = computed(() => {
    if (filter.value) {
        return props.options.filter(option =>
            option.name.toLowerCase().includes(filter.value.toLowerCase())
        )
    }
    return props.options
})

const selectItem = (item) => {
    selectedItem.value = item.id
    filter.value = item.name
    dropdownOpen.value = false
    emit('update:modelValue', selectedItem.value)
    emit('change', { value: selectedItem.value })
}

const toggleDropdown = () => {
    dropdownOpen.value = !dropdownOpen.value;
    if (dropdownOpen.value) {
        filter.value = ''
    }
};

watch(selectedItem, (newValue) => {
    emit('update:modelValue', newValue);
})
</script>




<style scoped lang="scss">
.select {
    width: 100%;
    position: relative;
}

.filter-input {
    margin-top: 1px;
    width: 100%;
    padding: 5px;
    border-radius: 0px;
    border-color: transparent;
    cursor: pointer;
    position: relative;
}

input:focus {
    border-color: transparent;

    &:placeholder {
        color: black;
    }
}


.list-container {
    top: 42px;
    /* max-height: 200px; */
    border-width: 0px 1px 1px 1px;
    /* Top, Right, Bottom, Left */
    border-style: solid;
    /* Define a border style */
    border-color: #ddd;
    /* Define a border color */
    border-radius: 0px 0px 4px 4px;
    padding: 10px 10px 10px 10px;
    background-color: #fff;
    position: absolute;
    width: 100%;
    z-index: 1;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.options-list {
    overflow-y: auto;
    max-height: 200px;
}

.options-list div {
    margin: 5px 0;
}
</style>