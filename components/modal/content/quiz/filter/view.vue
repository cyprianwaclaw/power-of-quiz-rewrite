<template>
  <div class="overflow-y-scroll h-[275px] right-8 left-8 pr-4">
    <p class="mb-2 text-lg font-bold">Poziom trudności</p>
    <div v-for="(level, index) in difficulty" :key="index">
      <label class="flex w-full mt-2">
        <input
          class="w-5 flex mb-[4px]"
          type="checkbox"
          v-model="level.selected"
          @change="handleChangeLevel(difficulty)"
        />
        <p class="w-full flex ml-2">{{ level.name }}</p>
      </label>
    </div>
    <p class="mb-2 text-lg font-bold mt-9">Kategoria</p>
    <div v-for="(category, index) in allCategories" :key="index">
      <label class="flex w-full mt-2">
        <input
          class="w-5 flex mb-[4px]"
          type="checkbox"
          v-model="category.selected"
          @change="handleChange(mapCategory)"
        />
        <p class="w-full flex ml-2">{{ category.name }}</p>
      </label>
    </div>
    <p class="mb-6 text-lg font-bold mt-9">Liczba pytań</p>
    <InputRange
      :min="1"
      :max="60"
      v-model:max-value="maxAnswersRange"
      v-model:min-value="minAnswersRange"
    />
    <p class="mb-6 text-lg font-bold mt-9">
      Czas trwania<span class="text-gray text-xs font-normal ml-[5px]">( minuty )</span>
    </p>
    <InputRange
      :min="1"
      :max="60"
      v-model:min-value="minTimeRange"
      v-model:max-value="maxTimeRange"
    />
    <div class="flex columns-2 gap-4 mt-10 mb-5">
      <button class="button-remove w-full" @click="saveChanges">Wyczyść</button>
      <button class="button-primary w-full" @click="saveChanges">Zapisz</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQuiz } from "@/store/useQuiz";
import { storeToRefs } from "pinia";
const quiz = useQuiz();
const router = useRouter();
const { categories } = storeToRefs(quiz);
let category = categories.value;
const allCategories: any = ref();

const emit = defineEmits<{
  (e: "state", value: string): void;
  (e: "perPage", value: number): void;
  (e: "close"): void;
}>();

const minAnswersRange = ref();
const maxAnswersRange = ref();
const minTimeRange = ref();
const maxTimeRange = ref();
const mapCategory = ref([]) as any;

let min_count = router.currentRoute.value.query.min_count as any;
let max_count = router.currentRoute.value.query.max_count as any;
maxAnswersRange.value = max_count ? max_count : 56;
minAnswersRange.value = min_count ? min_count : 4;

let min_time = router.currentRoute.value.query.min_time as any;
let max_time = router.currentRoute.value.query.max_time as any;
maxTimeRange.value = max_time ? max_time : 56;
minTimeRange.value = min_time ? min_time : 4;
watch(maxTimeRange.value, (newValue, oldValue)=>{
console.log(newValue, oldValue);
})
mapCategory.value = allCategories.value = category.map((single: any) => ({
  id: single.id,
  name: single.name,
  selected: false,
}));

const params = router.currentRoute.value.query.cat_id as any;

const toParams = ref();

watch(mapCategory.value, (newValue) => {
  let selected = newValue.filter((single: any) => single.selected === true);
  toParams.value = selected.map((single: any) => single.id);
});

const difficulty = ref([
  { name: "Łatwy", value: "easy", selected: false },
  { name: "Średni", value: "medium", selected: false },
  { name: "Trudny", value: "hard", selected: false },
]);

const paramsDifficulty = router.currentRoute.value.query.difficulty as any;

const toParamsDifficulty = ref();

watch(difficulty.value, (newValue) => {
  let selected = newValue.filter((single: any) => single.selected === true);
  toParamsDifficulty.value = selected.map((single: any) => single.value);
});

const currentView = ref();
const currentPerPage = ref();

const view = (value: string) => {
  currentView.value = value;
};
const perPage = ref(parseInt(localStorage.getItem("perPage") as any));

watch(perPage, (newVal: any) => {
  currentPerPage.value = newVal;
});

const saveChanges = () => {
  const routeParams = { ...router.currentRoute.value.query }; // Skopiowanie obiektu, aby uniknąć mutacji oryginalnego obiektu

  const check1 = () => {
    if (routeParams && toParams.value && toParamsDifficulty.value) {
      return {
        ...routeParams,
        cat_id: toParams.value,
        difficulty: toParamsDifficulty.value,
        min_count: minAnswersRange.value,
        max_count: maxAnswersRange.value,
        max_time: maxTimeRange.value,
        min_time: minTimeRange.value,
        page:1 
      };
    } else if (routeParams && toParams.value) {
      return {
        ...routeParams,
        cat_id: toParams.value,
        min_count: minAnswersRange.value,
        max_count: maxAnswersRange.value,
        max_time: maxTimeRange.value,
        min_time: minTimeRange.value,
        page:1 
      };
    } else if (routeParams && toParamsDifficulty.value) {
      return {
        ...routeParams,
        difficulty: toParamsDifficulty.value,
        min_count: minAnswersRange.value,
        max_count: maxAnswersRange.value,
        max_time: maxTimeRange.value,
        min_time: minTimeRange.value,
        page:1 
      };
    } else {
      return {
        ...routeParams,
        min_count: minAnswersRange.value,
        max_count: maxAnswersRange.value,
        max_time: maxTimeRange.value,
        min_time: minTimeRange.value,
        page:1 
      };
    }
  };

  router.push({ query: check1() });
  emit("close");
};

onMounted(() => {
  selectItemsByParams(mapCategory, params);
  selectItemsByParams(difficulty, paramsDifficulty);

});
</script>

<style lang="scss" scoped>
@import "@/assets/style/variables.scss";
.button-remove {
  padding: 10px 23px;
  border: 1px solid $color-error;
  font-family: "Manrope", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  color: $color-error;
  line-height: 22px;
  letter-spacing: 0.05em;
  display: block;
  border-radius: 8px;
}
</style>
