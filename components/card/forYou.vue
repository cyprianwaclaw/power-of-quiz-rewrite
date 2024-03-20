<template>
  <ModalAlert :modalActive="openAlert" name="Premium" title="Brak dostępu" status="error"
    des="Ta część serwisu jest dostępna wyłącznie dla użytkowników z pakietem Premium. Wykup subskrypcję aby zyskać dostęp do tej sekcji"
    closeButton="Zamknij" @close="isAlert" actionButton="Zobacz pakiety" />
  <!-- <ModalAlert :modalActive="isOpenDesktop" name="singleQuiz" @close="isCloseDesktop()">
      <template #content>
        <ModalContentSingleQuizAlert :quiz="quiz" />
      </template>
    </ModalAlert>

    <ModalDown :modalActive="isOpenMobile" title="Quiz" @close="isCloseMobile">
      <template #content>
        <ModalContentSingleQuiz :quiz="quiz" />
      </template>
    </ModalDown> -->
  <div v-if="props.plan" class="border-transparent rounded-[24px] lg:rounded-[12px] w-[260px] lg:w-full"
    :style="`background-image: url(${props.quizes.image}); background-size: cover`" @click="isModal()">
    <div class="bg-image w-[260px] lg:w-full rounded-[24px] lg:rounded-[12px] cursor-pointer">
      <div class="details">
        <h3 class="title hover:underline-offset-4">{{ props.quizes.title }}</h3>
        <div class="flex mt-3 gap-3 float-left">
          <p class="des">{{ props.quizes.time }} min</p>
          <div class="vl"></div>
          <p class="des">{{ props.quizes.difficulty }}</p>
          <div class="vl"></div>
          <p class="des">{{ props.quizes.category }}</p>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="border-transparent rounded-[24px] lg:rounded-[12px] w-[260px] lg:w-full"
    :style="`background-image: url(${props.quizes.image}); background-size: cover`" @click="isAlert()">
    <div class="bg-image w-[260px] lg:w-full rounded-[24px] lg:rounded-[12px] cursor-pointer">
      <div class="details">
        <p class="des">
          nie ma premium
        </p>
        <h3 class="title hover:underline-offset-4">{{ props.quizes.title }}</h3>
        <div class="flex mt-3 gap-3 float-left">
          <p class="des">{{ props.quizes.time }} min</p>
          <div class="vl"></div>
          <p class="des">{{ props.quizes.difficulty }}</p>
          <div class="vl"></div>
          <p class="des">{{ props.quizes.category }}</p>
        </div>
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
});

const openAlert = ref(false);
const isOpenMobile = ref(false);
const isOpenDesktop = ref(false);

const isModal = () => {
  if (window.screen.width <= 900) {
    isOpenMobile.value = true;
    // console.log(window.screen.width);
  } else {
    isOpenDesktop.value = true;
  }
};

const isCloseMobile = () => {
  isOpenMobile.value = false;
};
const isCloseDesktop = () => {
  isOpenDesktop.value = false;
};
const isAlert = () => {
  openAlert.value = !openAlert.value;
};
</script>

<style scoped>
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
</style>
