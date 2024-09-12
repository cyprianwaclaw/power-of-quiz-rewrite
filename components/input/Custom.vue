<template>
    <div>
        <label :for="name">{{ label }}</label>
        <input v-bind="$attrs" :id="name" v-model="modelValue" @input="$emit('update:modelValue', $event.target.value)"
            @blur="validate" />
        <ErrorMessage :name="name" class="error" />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useField, ErrorMessage } from 'vee-validate';

const props = defineProps({
    name: String,
    type: String,
    label: String,
    mode: {
        type: String,
        default: 'lazy' // default mode
    }
});

const { value: modelValue, errorMessage, validate } = useField(props.name, props.mode) as any

const error = computed(() => errorMessage.value);
</script>

<style>
.error {
    color: red;
    font-size: 0.9em;
}
</style>
