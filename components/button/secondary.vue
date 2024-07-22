<template>
  <div class="flex place-items-center mb-[38px] overflow-x-scroll scrollbar-hide ">
    <div v-for="(button, index) in props.array" :key="index">
      <button @click="goTo(button.link)" class="whitespace-nowrap"
        :class="{ 'active': currentSection === button.link, 'non-active': currentSection !== button.link }">
        {{ button.title }}
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
const router = useRouter();
const route = useRoute();
const props = defineProps({
  array: {
    type: Object,
    required: true,
  },
})

const currentSection = ref<string>(route.query.section as string || "")

const goTo = (url: string) => {
  const query = url === "" ? {} : { ...route.query, section: url }
  router.push({ query });
  currentSection.value = url === "" ? "/" : url;
};

onBeforeRouteUpdate((to: any) => {
  currentSection.value = to.query.section as string || "";
});
</script>
<style scoped lang="scss">
@import "@/assets/style/variables.scss";

button {
  transition: color 0.3s, background-color 0.15s;
}

.non-active {
  color: #b0b0b0;
  padding: 9px 20px;
  font-size: 15px;
  font-weight: 500;
  border-radius: 100px;
  letter-spacing: 0.4px;
}

.active {
  color: rgb(255, 255, 255);
  letter-spacing: 0.4px;
  padding: 9px 20px;
  font-size: 15px;
  font-weight: 450;
  pointer-events: none;
  border-radius: 100px;
  background-color: $primary;
}
</style>
