<!-- <template>
    <div class="dropdown-container">
        <h3 class="title">Wybierz opcję:</h3>
        <Dropdown v-model="selectedOption" :options="options" optionLabel="label" placeholder="Wybierz opcję" filter
            filterPlaceholder="Szukaj..." class="dropdown" />
        <p class="selected-option">Wybrana opcja: {{ selectedOption ? selectedOption.label : 'Brak wybranej opcji' }}</p>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Dropdown from 'primevue/dropdown';

const options = ref([
    { label: 'Opcja 1', value: '1' },
    { label: 'Opcja 2', value: '2' },
    { label: 'Opcja 3', value: '3' },
    { label: 'Opcja 4', value: '4' },
    { label: 'Opcja 5', value: '5' }
]);

const selectedOption = ref(null);
</script>

<style scoped lang="scss">
/* Nadpisywanie domyślnych kolorów PrimeVue */
.p-dropdown {
    border-color: #007bff;
    /* Zmiana koloru obramowania na niebieski */
}

.p-dropdown .p-dropdown-label {
    color: #333;
    /* Zmiana koloru tekstu etykiety na ciemnoszary */
}

.p-dropdown .p-dropdown-trigger {
    background-color: #007bff;
    /* Kolor tła przycisku rozwijania na niebieski */
    border: 1px solid #007bff;
    /* Kolor obramowania przycisku rozwijania */
}

.p-dropdown-panel {
    background-color: #ffffff;
    /* Tło rozwijanej listy */
}

.p-dropdown-item {
    color: #333;
    /* Kolor tekstu elementów listy */
}
.p-dropdown-item.p-highlight {
    background-color: #007bff !important;
    /* Kolor tła wybranego elementu */
    color: #ffffff !important;
    /* Kolor tekstu wybranego elementu */
}

.dropdown-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
}

.title {
    margin-bottom: 10px;
    color: #333;
}

.dropdown {
    width: 100%;
    margin-bottom: 15px;
}

.selected-option {
    font-weight: bold;
    color: #666;
}
</style>


 -->

 <!-- <template>
     <div>
         <h1>Przykład PrimeVue Dropdown z Pass-Through i niestandardowymi stylami</h1>

         Dropdown z Pass-Through i niestandardowymi stylami
         <Dropdown v-model="selectedOption" :options="options" option-label="label" placeholder="Wybierz opcję"
             :pt="{ 'data-dropdown-id': 'custom-dropdown', 'aria-label': 'Lista rozwijana użytkownika' }"
             class="custom-dropdown" @change="handleChange" />

         Wyświetlanie wybranej opcji
         <div v-if="selectedOption">
             <h3>Wybrana opcja:</h3>
             <p>{{ selectedOption.label }}</p>
         </div>
     </div>
</template>

<script lang="ts" setup>
// import { ref } from 'vue';
// import { Dropdown } from 'primevue/dropdown';

// Definicja typów dla opcji
interface Option {
    label: string;
    value: number;
}

// Lista opcji dla Dropdown
const options = ref<Option[]>([
    { label: 'Opcja 1', value: 1 },
    { label: 'Opcja 2', value: 2 },
    { label: 'Opcja 3', value: 3 },
]);

// Wybrana opcja
const selectedOption = ref<Option | null>(null);

// Obsługa zmiany opcji
const handleChange = (event: { value: Option }) => {
    console.log('Wybrana opcja:', event.value);
};
</script>

<style>
/* Niestandardowe style dla Dropdown */
.custom-dropdown .p-dropdown {
    border: 2px solid #007ad9;
    border-radius: 4px;
    padding: 5px;
    font-size: 16px;
    box-shadow: none;
    /* Usuń cień fokusu */
}

.custom-dropdown .p-dropdown .p-dropdown-label {
    color: #333;
}

.custom-dropdown .p-dropdown .p-dropdown-trigger {
    border-color: #007ad9;
}

.custom-dropdown .p-dropdown .p-dropdown-panel {
    border: 2px solid #007ad9;
}

/* Stylizacja focus */
.custom-dropdown .p-dropdown:focus {
    outline: none;
    /* Usuń domyślną obwódkę */
}

.custom-dropdown .p-dropdown .p-dropdown-trigger:focus {
    border-color: #004b6f;
    /* Ustaw kolor obramowania podczas fokusu */
    box-shadow: none;
    /* Usuń cień fokusu */
}
</style> -->


<template>
    <div>
        <h1>Przykład PrimeVue Dropdown z Pass-Through i niestandardowymi stylami</h1>

        <!-- Dropdown z Pass-Through i niestandardowymi stylami -->
        <Dropdown v-model="selectedItems" :options="categories" option-label="name" placeholder="Wybierz opcję" filter
            filter-placeholder="Szukaj..." :pt="{
                root: {
                    class: 'my-class-panel',
                    style: 'border:1px solid white !important'
                },
                filterIcon:{
                      style: 'width: 27px; margin-top:-7px;  margin-right:2px; background-color:white; padding-left:8px;'
                }
            }" />
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
// import { Dropdown } from 'primevue/dropdown';

// Lista opcji dla Dropdown
const categories = ref([
    { name: 'Opcja 1', value: 1 },
    { name: 'Opcja 2', value: 2 },
    { name: 'Opcja 3', value: 3 },
]);

// Wybrane opcje
const selectedItems = ref([]);
</script>

<style>
:root {
    --p-focus-ring-color: transparent;
}
</style>
