<template>
  <div v-if="props.isLoading">
    <div v-if="!onlyText">
      <div class=" flex gap-[16px] w-full mb-[37px]">
        <div v-for="item in props.n" :key="item">
          <div class="is-loading place-items-center">
            <div class="image" />
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class=" flex flex-col gap-[11px] w-full">
        <div v-for="item in props.n" :key="item">
          <div class="is-loading place-items-center">
            <div class="image1" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <div v-if="!onlyText" class="flex place-items-center mb-[38px] overflow-x-scroll scrollbar-hide ">
      <div v-for="(button, index) in props.array" :key="index">
        <button @click="goTo(button.link)" class="whitespace-nowrap"
          :class="{ 'active': route.query.pageName == button.link.split('-')[1], 'non-active': currentSection !== button.link.split('-')[1] }">
          {{ button.title }}
        </button>
      </div>
    </div>
    <div v-else>
      <div class="flex place-items-start flex-col gap-[9px]">
        <div v-for="(button, index) in props.array" :key="index">
          <p @click="goTo(button.link)" class="whitespace-nowrap cursor-default"
            :class="{ 'active-text': currentSection === button.link.split('-')[0], 'non-active-text': currentSection !== button.link.split('-')[0] }">
            {{ button.title }}
          </p>
        </div>
      </div>
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
  isLoading: {
    type: Boolean,
    required: true,
  },
  n: {
    type: Number,
    required: true,
  },
})

const currentSection = ref<string>(route.query.section as string || "")

const goTo = (url: string) => {
  if (route.query.pageName !== url.split('-')[1] || route.query.section !== url.split('-')[0]) {
    const query = url === "" ? {} : { ...route.query, section: url.split('-')[0], pageName: url.split('-')[1], page: 1 }
    router.push({ query })
  } else {
    const query = url === "" ? {} : { ...route.query, section: url.split('-')[0], pageName: url.split('-')[1], }
    router.push({ query })
  }
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

.is-loading {
  display: flex;
  width: 100%;

  .image {
    background: linear-gradient(110deg, #c7c7c7 8%, #d4d4d4 18%, #c7c7c7 33%);
    background-size: 300% 100%;
    animation: 1.6s shine linear infinite;
  }

  .image {
    height: 42px;
    width: 120px;
    border-radius: 999px;
  }

  .image1 {
    background: linear-gradient(110deg, #c7c7c7 8%, #d4d4d4 18%, #c7c7c7 33%);
    background-size: 300% 100%;
    animation: 1.6s shine linear infinite;
  }

  .image1 {
    height: 24px;
    width: 120px;
    border-radius: 6px;
  }

}

@keyframes shine {
  to {
    background-position-x: -200%;
  }
}
</style>
