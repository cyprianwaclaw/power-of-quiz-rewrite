<template>
  <ModalShowQuiz :modalActive="openQuiz" @close="isClick" :quiz="currentQuiz" />
  <ModalStandardPackage :modalActive="openAlert" @close="isClick" />
  <div v-if="props.isLoading">
    <div
      class="-ml-[24px] -mr-[24px] md:grid lg:static md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 lg:mx-0 lg:px-0 lg:gap-8 gap-8 flex flex-row overflow-auto overflow-x-scroll  scrollbar-hide">
      <div v-for=" (item, index) in props.n" :key="item" :class="[
        index + 1 === 1 ? 'pl-[24px] md:pl-[0px]' : '',
        index + 1 === props.n ? 'pr-[24px] md:pr-[0px]' : '',
      ]">
        <div class="card is-loading">
          <div class="image" />
        </div>

      </div>
    </div>
  </div>
  <div v-else>
    <div
      class=" -ml-[24px] -mr-[24px] md:grid  lg:static md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 lg:mx-0 lg:px-0 lg:gap-8 gap-8 flex flex-row overflow-auto overflow-x-scroll  scrollbar-hide">
      <div v-for="(quiz, index) in props.quizes" :key="index" :class="[
        Number(index) + 1 === 1 ? 'pl-[24px] md:pl-[0px]' : '',
        Number(index) + 1 === Number(props.quizes.length) ? 'pr-[24px] md:pr-[0px]' : '',
      ]">
        <div class="border-transparent rounded-[12px] lg:rounded-[12px] w-[260px]"
          :style="`background-image: url(${quiz.image}); background-size: cover`" @click="isClick(quiz)">
          <div class="bg-image  w-[260px] rounded-[12px] lg:rounded-[12px] cursor-pointer">
            <div class="details">
              <h3 class="title hover:underline-offset-4">{{ quiz.title }}</h3>
              <div class="flex mt-2 gap-3 float-left">
                <p class="des">{{ quiz.time }} min</p>
                <div class="vl"></div>
                <p class="des">{{ quiz.difficulty }}</p>
                <div class="vl"></div>
                <p class="des">{{ quiz.category }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  quizes: {
    type: Object as any,
  },
  plan: {
    type: Boolean,
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
  if (props.plan) {
    openQuiz.value = !openQuiz.value;
  } else {
    openAlert.value = !openAlert.value;
  }
}
</script>

<style scoped lang="scss">
.bg-image {
  position: relative;
  height: 260px;
  background: linear-gradient(27.47deg,
      rgba(0, 0, 0, 0.77) 31.09%,
      rgba(0, 0, 0, 0) 79.45%);
}

.details {
  position: absolute;
  bottom: 24px;
  margin-left: 24px;
  margin-right: 24px;
}

.title {
  color: white;
  font-weight: 500;
  font-size: 18px;
  line-height: 27px;
}

.des {
  color: white;
  font-weight: 300;
  font-size: 14px;
  line-height: 22px;
}

.vl {
  border-left: 1px solid white;
  margin-top: 3px;
  margin-bottom: 3px;
}


.card.is-loading {

  .image,
  h2,
  p {
    background: #eee;
    background: linear-gradient(110deg, #c7c7c7 8%, #d4d4d4 18%, #c7c7c7 33%);
    border-radius: 5px;
    background-size: 300% 100%;
    animation: 1.6s shine linear infinite;
  }

  .image {
    height: 260px;
    width: 260px;
    border-radius: 12px;
  }

  h2 {
    height: 30px;
  }

  p {
    height: 70px;
  }
}

@keyframes shine {
  to {
    background-position-x: -200%;
  }
}
</style>
