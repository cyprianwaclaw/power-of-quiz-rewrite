<template>
  <div class="overflow-y-scroll h-[275px] right-8 left-8 pr-4">
    <p class="mb-4 text-lg font-bold">Wybierz układ</p>
    <QuizSortAll @stateView="view" />
    <div class="mb-8">
      <p class="mb-2.5 text-lg font-bold">Liczba na stronie</p>
      <InputSingleRange :max="60" :min="2" v-model="perPage" />
    </div>
    <!-- <p class="mb-4 text-lg font-bold">Inne opcje sortowania</p>
    <div v-for="(single, index) in otherSorting1" :key="index">
      <label class="flex w-full mt-2">
        <input
          type="checkbox"
          class="w-5 flex mb-[4px]"
          v-model="single.checked"
          @change="handleChange1(index)"
        />
        <p class="ml-2">{{ single.label }}</p>
      </label>
    </div>
    <div v-for="(single, index) in otherSorting2" :key="index">
      <label class="flex w-full mt-2">
        <input
          type="checkbox"
          class="w-5 flex mb-[4px]"
          v-model="single.checked"
          @change="handleChange2(index)"
        />
        <div class="flex gap-[6px]">
          <p class="ml-2">{{ single.label }} </p>
          <p class="text-gray-400 text-[13px] mt-[4px]">{{ single.des }}</p>
        </div>
      </label>
    </div> -->
    <button class="button-primary w-full mt-9 mb-5" @click="saveChanges">
      Zapisz zmiany
    </button>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();

const emit = defineEmits<{
  (e: "state", value: string): void;
  (e: "close"): void;
  (e: "change"): void;
}>();

const otherSorting1 = ref([
  { value: "sort", label: "Czas rosnąco", checked: false },
  { value: "sort", label: "Czas malejąco", checked: false },
]);

const otherSorting2 = ref([
  { value: "sort", label: "Trudność", des: "(łatwe, trudne)", checked: false },
  { value: "sort", label: "Trudność",des: "(trudne, łatwe)", checked: false },
]);

const handleChange1 = (selected: any) => {
  otherSorting1.value.forEach((single: any, index: any) => {
    if (index !== selected) {
      single.checked = false;
    }
  });
};

const handleChange2 = (selected: any) => {
  otherSorting2.value.forEach((single: any, index: any) => {
    if (index !== selected) {
      single.checked = false;
    }
  });
};

const currentView = ref();
const view = (value: string) => {
  currentView.value = value;
};

const perPage = ref();
const perPageParams = Number(router.currentRoute.value.query.per_page);
perPage.value = perPageParams ? perPageParams : "15";

const saveChanges = () => {

  const routeParams = { ...router.currentRoute.value.query }; // Skopiowanie obiektu, aby uniknąć mutacji oryginalnego obiektu

  const updatedQueryParams = { ...routeParams, per_page: perPage.value, page:1, view: currentView.value };

  const check1 = () => {
    if (routeParams) {
      return updatedQueryParams;
    } else {
      return { per_page: perPage.value, page:1, view: currentView.value };
    }
  };

  router.push({ query: check1() });

  if (currentView.value) {
    localStorage.setItem("listView", currentView.value);
  }
  console.log(currentView.value);

  emit("close");
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/variables.scss";
</style>
