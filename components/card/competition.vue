<template>
  <ModalShowCompetition :modalActive="openCompetition" @close="isClick" :competition="currentCompetition" />
  <ModalStandardPackage :modalActive="openAlert" @close="isClick" />
  <div v-if="props.isLoading">
    <div class="grid md:grid-cols-2 gap-6 w-full">
      <div v-for=" item in props.n" :key="item">
        <div class="card is-loading">
          <div class="image" />
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="grid md:grid-cols-2 gap-6 w-full">
      <div v-for="(competition, index) in props.competitions" :key="index">
        <div class="bg-white w-full h-[314px] p-[18px] rounded-2xl" @click="isClick(competition)">
          <img :src="competition.image" class="image-class" />
          <div class="details">
            <h3 class="title hover:underline-offset-4">{{ truncateText(competition.title, 30) }}</h3>
            <div class="flex mt-4 gap-2.5 float-left">
              <p class="des">{{ competition.date }}</p>
              <div class="vl"></div>
              <p class="des">{{ competition.time }} min</p>
            </div>
            <div class="flex mt-1.5 gap-2.5 float-left">
              <p class="des">{{ competition.category }}</p>
              <div class="vl"></div>
              <p class="des">{{ competition.difficulty }}</p>
              <div class="vl"></div>
              <p class="des">Pytania: {{ competition.questions_count }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  competitions: {
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
const openCompetition = ref(false);
const currentCompetition = ref() as any;
// !przekazac plan w propsie !props.plan
const isClick = (competition: any) => {
  currentCompetition.value = competition
  if (!false) {
    openCompetition.value = !openCompetition.value;
    console.log(competition)
    currentCompetition.value = competition
  } else {
    openAlert.value = !openAlert.value;
  }
};
</script>

<style scoped lang="scss">
.details {
  margin-top: 13px;
  display: flex;
  flex-direction: column;
}


.image-class {
  height: 164px;
  width: 100%;
  border-radius: 12px;
}

.title {
  color: rgb(87, 87, 87);
  font-weight: 500;
  font-size: 19px;
  line-height: 27px;
}

.des {
  color: rgb(87, 87, 87);
  font-weight: 500;
  font-size: 15px;
  line-height: 22px;
}

.vl {
  color: rgb(166, 166, 166);
  border: 1px solid rgb(166, 166, 166);
  margin-top: 3px;
  margin-bottom: 3px;
}

.is-loading {

  .image,
  h2,
  p {
    background: #eee;
    background: linear-gradient(110deg, #c7c7c7 8%, #d4d4d4 18%, #c7c7c7 33%);
    border-radius: 12px;
    background-size: 300% 100%;
    animation: 1.6s shine linear infinite;
  }

  .image {
    height: 240px;
    width: 100%;
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
