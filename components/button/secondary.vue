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
const router = useRouter()
const route = useRoute()
const props = defineProps({
  array: {
    type: Object,
    required: true,
  },
  onlyText: {
    type: Boolean,
    required: false,
  },
  query: {
    type: String,
    required: false,
    default: "section",
  },
})

const currentSection = ref<string>(route.query.section as string || "")

const goTo = (url: string) => {
  const query = url === "" ? {} : { ...route.query,  [props.query]: url }
  router.push({ query });
  currentSection.value = url === "" ? "/" : url
}

onBeforeRouteUpdate((to: any) => {
  currentSection.value = to.query[props.query] as string || ""
})
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

  &:hover {
    color: #787878;
    cursor: pointer;
  }
}

.active {
  color: rgb(255, 255, 255);
  letter-spacing: 0.4px;
  padding: 9px 20px;
  font-size: 15px;
  font-weight: 500;
  pointer-events: none;
  border-radius: 100px;
  background-color: $primary;
}

.non-active-text {
  color: #9d9d9d;
  font-size: 15px;
  font-weight: 400;
  letter-spacing: 0.4px;

  &:hover {
    color: #787878;
    cursor: pointer;
  }
}

.active-text {
  letter-spacing: 0.4px;
  font-size: 15px;
  font-weight: 600;
  color: $primary;
}
</style>
