<template>
  <div class="fixed z-50 left-0 bottom-0 w-full">
    <Transition @enter="EnterBg" @leave="LeaveBg" :css="false">
      <div class="blur-background-update" @click="$emit('close')" v-if="props.modalActive" />
    </Transition>
    <div class="flex sm:hidden">
      <Transition @enter="onEnterMobile" @leave="onLeaveMobile" :css="false">
        <div class="modal-down" v-if="props.modalActive">
          <div class="justify-center flex -mt-[17px]">
            <hr class="w-9 close border-[2px] rounded-2xl" />
          </div>
          <div class="flex columns-2 w-full justify-between mb-4 mt-[17px] place-items-start gap-[24px]">
            <p class="font-medium text-2xl">{{ title }}</p>
            <Icon name="carbon:close" size="30" class="close w-8 h-8 border-transparent rounded-[6px]"
              @click="$emit('close')" />
          </div>
          <div v-if="!currentContent" class="content">
            <div v-for="(single, index) in itemsArray" :key="index">
              <div class="flex columns-2 w-full mb-4 place-items-center" @click="takeAction(index)">
                <div :style="{ backgroundColor: single.bg }" class="border rounded-full">
                  <Icon :name="single.iconName" :color="single.iconColor" class="circle-icon" />
                </div>
                <p class="ml-4 text-[17px] font-medium"
                  :class="isCopied && index === 1 ? 'text-[#339340] font-bold' : ' '">{{ single.text }}</p>
              </div>
            </div>
          </div>
          <div v-if="currentContent === 'Standard'" class="mb-9 mt-5">
            <Icon name="ph:x-circle-light" size="74" class="-ml-2 red" />
            <p class="mt-2.5 text-gray-600 mr-9">Dodawanie quizów jest dostępne wyłącznie dla użytkowników z
              pakietem Premium. Wykup subskrypcję
              aby zyskać dostęp do tej sekcji</p>
            <button class="button-primary w-[200px] mt-7">
              <NuxtLink to="/panel/quiz/${quiz?.id}">
                <p class="text-center">Przejdź na Premium</p>
              </NuxtLink>
            </button>
          </div>
          <div v-if="currentContent === 'Withdraw'" class="mb-9 mt-5">
            <div :class="success ? 'content-new-w' : 'content-w'">
              <div v-if="!success">
                <p class="mb-3">Twoje saldo: <span class="primary-color">{{ user.points }} zł</span></p>
                <input class="input-widthdraw" type="number" min="1" v-model="amount" placeholder="Kwota do wypłaty" />
                <p class="text-[13px] mt-[3px] text-gray-400 mb-[23px]">
                  Minimalna kwota do wypłaty to 1 zł
                </p>
                <ButtonLoading isLoading="false" :loading="isLoadingButton" text="Wypłacam" @click="widthdrawFunds" />
              </div>
              <div v-else class="flex w-full justify-center items-center flex-col text-center mt-3">
                <Icon name="ph:check-circle-light" color="#4BB21A" size="64" />
                <p class="text-[15px] text-gray-600 leading-[23px] px-[20px] mt-[6px]">Przyjęto wypłatę, wkrótce
                  środki zaksięgują się na Twoim koncie</p>
                <p class="font-semibold text-[28px] mb-[24px] mt-[15px]">{{ amount }} zł</p>
                <button class="button-primary w-full" @click="$emit('close')">Gotowe</button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
    <!-- <div class="sm:flex hidden">
      <Transition @enter="onEnterDesktop" :css="false">
        <div class="modal-desktop" v-if="props.modalActive">
          <div class="flex w-full justify-end">
            <Icon name="carbon:close" size="30" class="close w-8 h-8 border-transparent rounded-[6px]"
              @click="$emit('close')" />
          </div>
          <div class="flex flex-col items-center text-center justify-center">
            <Icon name="ph:x-circle-light" size="70" class="red mb-3" />
            <p class="font-medium text-2xl">Brak dostępu</p>
            <p class="mt-2 text-gray-600 mx-4">Ta część serwisu jest dostępna wyłącznie dla użytkowników z
              pakietem Premium. Wykup subskrypcję
              aby zyskać dostęp do tej sekcji</p>
            <button class="button-primary w-[200px] mt-6">
              <NuxtLink to="/panel/quiz/${quiz?.id}">
                <p class="text-center">Przejdź na Premium</p>
              </NuxtLink>
            </button>
          </div>
        </div>
      </Transition>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import gsap from 'gsap'
const axiosInstance = useNuxtApp().$axiosInstance as any
import { useUser } from "@/stores/useUser"
const router = useRouter()
const userState = useUser()
const { user } = storeToRefs(userState)

const props = defineProps({
  modalActive: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['close'])

const title = ref('Wybierz akcje') as any
const currentContent = ref(false) as any
const isCopied = ref<boolean>(false)
const isLoadingButton = ref(false)
const amount = ref()
const success = ref(false)

const itemsArray = reactive([{
  text: "Nowy quiz", iconName: "ph:lightning-fill", iconColor: "D19D38", bg: "rgba(209, 157, 56, 0.25)"
},
{
  text: "Skopiuj link polecający", iconName: "ph:user-circle-plus-fill", iconColor: "26AB22", bg: "rgba(43, 181, 40, 0.25)"
},
{
  text: "Wypłać środki", iconName: "ph:wallet-fill", iconColor: "2B3BC7", bg: "rgba(43, 59, 199, 0.17)"
},
])

const takeAction = (index: number) => {
  if (index === 0) {
    // !Zmienic po tetsach na premium
    if (user.value?.plan === "Standard") {
      emit('close');
      router.push('/panel/quiz/dodaj-nowy');
    } else {
      currentContent.value = 'Standard';
      title.value = "Brak dostępu"
    }
  }
  if (index === 1) {
    isCopied.value = true
    itemsArray[index].text = "Skopiowano kod!"
    navigator.clipboard.writeText(user.value.invitation_token);
    setTimeout(() => {
      isCopied.value = false
      itemsArray[index].text = "Skopiuj link polecający"
    }, 1600)
  }
  if (index === 2) {
    currentContent.value = 'Withdraw';
    title.value = "Wypłata środków"
  }
}


const widthdrawFunds = async () => {
  isLoadingButton.value = true;

  if (!amount.value) {
    success.value = false;
  } else {
    try {
      const res = await axiosInstance.post('/payouts', {
        points: amount.value,
      });
      success.value = res.data.success || false;
    } catch (error) {
      success.value = false;
      console.error('Error during withdrawal:', error);
    }
  }

  setTimeout(() => {
    isLoadingButton.value = false;
  }, 440);
};


watch(props, async (newValue: any) => {
  if (newValue.modalActive === false) {
    title.value = "Wybierz akcje"
    amount.value = ""
    currentContent.value = false
    success.value = false
    isCopied.value = false
    setTimeout(async () => {
      await userState.login();
    }, 100)
  }

})

const onEnterDesktop = (el: any) => {
  gsap.from(el, {
    duration: 0.28,
    y: 24,
  });
};


const onEnterMobile = (el: any, done: any) => {
  let elementHeight = el.offsetHeight;
  gsap.from(el, {
    ease: "power1.out",
    y: elementHeight,
    duration: 0.3,
    onComplete: done,
  });
};

const onLeaveMobile = (el: any, done: any) => {
  let elementHeight = el.offsetHeight;
  gsap.to(el, {
    ease: "power1.out",
    y: elementHeight,
    duration: 0.3,
    onComplete: done,
  })
}

const EnterBg = (el: any) => {
  gsap.to(el, {
    opacity: 1,
    duration: 0.6,
  });
};

const LeaveBg = (el: any) => {
  gsap.to(el, {
    opacity: 0,
    duration: 1.4,
  });
  gsap.set(el, {
    delay: 0.4,
    display: "none",
  });
};
</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";

.circle-icon {
  border: solid transparent;
  width: 47px;
  height: 47px;
  padding: 8px;
  border-radius: 100px;
}

.modal-down {
  background-color: white;
  border: solid transparent;
  border-radius: 16px 16px 0px 0px;
  padding: 24px 24px 0px 24px;
  position: absolute;
  bottom: 0px;
  width: 100%;
  z-index: 100;
}

.close {
  color: rgb(209, 209, 209);

  &:hover {
    color: rgb(131, 131, 131);
    background-color: #c7c7c71d;
    cursor: pointer;
  }
}

.content {
  height: 224px;
  padding-top: 14px;
}

.modal-desktop {
  background-color: white;
  border: solid transparent;
  border-radius: 12px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  width: 500px;
  height: 380px;
  padding: 21px;
}


.content-w {
  height: 200px;
  padding-top: 4px;
}

.content-new-w {
  height: 261px;
  padding-top: 3px;
}

.input-widthdraw {
  background-color: #ECECEC;
  padding: 15px 57px 15px 18px;
  width: 100%;
  font-size: 16px;
  letter-spacing: 0.17px;
  border: 2px solid transparent;
  outline: none;
  border-radius: 12px;
  font-weight: 500;
  transition: border-color 0.15s ease-in-out, color 0.15s ease-in-out, background-color 0.15s ease-in-out;

  &:focus {
    background-color: #ffffff;
    border-color: #d0d0d0;
    border-width: 2px;
    color: #363636 !important;
    letter-spacing: 0.17px;
    font-weight: 500;
  }

  &::placeholder {
    letter-spacing: 0.17px;
    font-size: 16px;
    font-weight: 500;
    color: #9D9D9D;
  }

  &:focus::placeholder {
    font-size: 0px;
  }

  &::-ms-clear {
    display: none; // Ukrycie przycisku w IE
  }
}
</style>
