<template>
  <ModalShowQuiz :modalActive="openQuiz" @close="isClick" :quiz="currentQuiz" />
  <ModalStandardPackage :modalActive="openAlert" @close="isClick" />
  <div v-if="props.isLoading">
    <div class="grid grid-cols-2 gap-x-4 gap-y-[26px] w-full">
      <div v-for=" item in props.n" :key="item">
        <div class="is-loading">
          <div class="image" />
          <p class="p1"/>
          <p class="p2"/>
        </div>
      </div> 
    </div> 
  </div>
  <div v-else>
    <div class="grid grid-cols-2 gap-x-4 gap-y-[26px] w-full">
      <div v-for="(quiz, index) in props.quizes" :key="index" @click="isClick(quiz)">
        <img :src="quiz.image" class="bg-image" />
        <h3 class="title hover:underline-offset-4">{{ quiz.title }}</h3>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  quizes: {
    type: Object,
    required: true,
  },
  plan: {
    type: String,
    required: true,
  },
  isLoading: {
    type: Boolean,
    required: true,
  },
  n: {
    type: Number,
    required: true,
  },
});

const openAlert = ref(false);
const openQuiz = ref(false);
const currentQuiz = ref() as any;

const isClick = (quiz: any) => {
  currentQuiz.value = quiz
  if (!props.plan) {
    openQuiz.value = !openQuiz.value;
  } else {
    openAlert.value = !openAlert.value;
  }
};
</script>

<style scoped lang="scss">
.bg-image {
  position: relative;
  height: 154px;
  width: 100%;
  border-radius: 10px;
  ;
  background: linear-gradient(27.47deg,
      rgba(0, 0, 0, 0.77) 31.09%,
      rgba(0, 0, 0, 0) 79.45%);
}


.title {
  color: rgb(40, 39, 39);
  font-weight: 500;
  margin-top: 6px;
  font-size: 15px;
  line-height: 22px;
}

.is-loading {

  .image,p   {
    background: linear-gradient(110deg, #c7c7c7 8%, #d4d4d4 18%, #c7c7c7 33%);
    background-size: 300% 100%;
    animation: 1.6s shine linear infinite;
  }

  .image {
    height: 154px;
    width: 100%;
    border-radius: 10px;
  }
  .p1 {
    height: 19px;
    margin-top: 10px;
    border-radius: 4px;
    margin-right: 48px;
  }
  .p2 {
    height: 19px;
    margin-top: 4px;
    border-radius: 4px;
    margin-right: 18px;

  }
}

@keyframes shine {
  to {
    background-position-x: -200%;
  }
}
</style>
