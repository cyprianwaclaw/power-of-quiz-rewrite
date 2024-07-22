<template>
  <div class="-mb-[80px]">
    <div @click="goToBack()" class="flex place-items-center -mt-[1px] mb-[28px]">
      <Icon name="ph:caret-right-bold" size="22" class="primary-color back-arrow" />
      <p class="go primary-color">{{ props?.arrowText }}</p>
    </div>
    <h1 class="text-[27px] font-medium color-[#212427]">{{ props?.title }}</h1>
    <div class="mt-[16px]">
      <slot />
    </div>
  </div>
</template>


<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const props = defineProps({
  arrowText: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  }
})

const trimmedPath = ref<string[]>([]);

// Inicjalizacja trimmedPath na podstawie pełnej ścieżki
onMounted(() => {
  const pathArray = route.fullPath.split('/');
  pathArray.pop(); // Usuwa ostatni element
  trimmedPath.value = pathArray;
});

const goToBack = () => {
  const pathArray = [...trimmedPath.value]; // Kopiuj wartość tablicy
  const url = pathArray.join('/');
  router.push(url);
}

</script>


<style scoped lang="scss">
@import "@/assets/style/variables.scss";

.go {
  font-weight: 500;
  font-size: 17px;
  line-height: 22px;
  margin-left: 4px;
}

.back-arrow {
  transform: rotate(180deg);
  margin-left: -4px;
}
</style>
