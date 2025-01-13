<template>
  <!-- <ModalShowCompetition :modalActive="openCompetition" @close="isClick" :competition="currentCompetition" /> -->
  <!-- <ModalStandardPackage :modalActive="openAlert" @close="isClick" /> -->
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
    <div class="grid xl:grid-cols-2 gap-6 md:gap-y-[12px] md:gap-x-[34px] w-full cursor-default">
      <div v-for="(competition, index) in props.competitions" :key="index">
        <div class="bg-white w-full h-[300px] md:h-[140px] p-[18px] rounded-2xl md:flex" @click="isClick(competition)">
          <img :src="competition.image" class="image-class h-[155px] md:h-[120px] w-full md:w-[160px]" />
          <!-- {{ competition.image }} -->
          <div class="details md:ml-[18px]">
            <h3 class="title text-[19px] md:text-[18px] font-medium md:font-semibold hover:underline-offset-4">{{ truncateText(competition.title, 25) }}</h3>
            <div class="flex mt-3 md:mt-[12px] gap-3 float-left mb-[4px]">
              <p class="des text-nowrap">{{ competition.time.date }} od {{ competition.time.start_format }} do {{
                competition.time.end_format }}</p>
            </div>
            <div v-show="competitionCountdown[0]?.isTime">
              {{ startCountdown(index, competition.time.start, competition.time.end) }}
              <p class="correct">
                Do końca:
                {{ competitionCountdown[0].time }} min
              </p>
            </div>
            <div v-if="competition.is_finished" class="flex gap-[16px] mt-[8px] md:mt-[4px]">
              <div class="flex place-items-center gap-[6px]">
                <Icon name="ph:crown-simple-fill" class="text-yellow-500 text-[23px] md:text-[19px] mb-[3px]"  />
                <p class="prize text-nowrap text-[16px] md:text-[15px]">
                  {{ competition.place }} miejsce
                </p>
              </div>
              <p class="correct text-nowrap text-[16px] md:text-[15px]">
                Poprawne: {{ competition.correct_answers }}
              </p>
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
const competitionCountdown = ref<Record<number, { isTime: boolean; time: string | null }>>({});

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

const startCountdown = (index: string | any, startTime: string, endTime: string) => {
  const startDate = new Date(startTime).getTime();
  const endDate = new Date(endTime).getTime();

  if (endDate < startDate) {
    competitionCountdown.value[index] = { isTime: false, time: null };
    return;
  }

  const updateCountdown = () => {
    const now = Date.now();
    const timeRemaining = endDate - now;

    if (timeRemaining <= 0) {
      clearInterval(interval);
      competitionCountdown.value[index] = { isTime: false, time: null };
      return;
    }

    const minutes = Math.floor((timeRemaining / (1000 * 60)) % 60).toString().padStart(2, '0');
    const seconds = Math.floor((timeRemaining / 1000) % 60).toString().padStart(2, '0');

    competitionCountdown.value[index] = {
      isTime: true,
      time: `${minutes}:${seconds}`,
    };
  };

  const interval = setInterval(updateCountdown, 1000);
  updateCountdown()
};
</script>

<style scoped lang="scss">
.bg-image {
  position: relative;
  height: 240px;
}

.details {
  margin-top: 13px;
  display: flex;
  flex-direction: column;
}

.correct {
  color: #21a67a;
  font-weight: 500;
}

.prize {
  color: #202221;
  font-weight: 500;
}

.image-class {
  // width: 100%;
  border-radius: 12px;
}

.title {
  color: rgb(87, 87, 87);
  line-height: 25px;
}

.des {
  color: rgb(87, 87, 87);
  font-weight: 500;
  font-size: 15px;
  line-height: 22px;
}

.vl {
  color: rgb(87, 87, 87);
  border: 1px solid rgb(87, 87, 87);
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
