<template>
    <div>
    <div class="mt-2">
        <div v-if="!hasPremium">
          <ModalAlert
          :modalActive="isOpen"
          name="Premium"
          title="Brak dostępu"
          des="Ta sekcja wymaga pakietu Premium. Dołącz już teraz i ciesz się pełnymi możliwościami"
          closeButton="Zamknij"
          actionButton="Zobacz pakiety"
          @close="isClose"
          />
          <!-- redirect="/panel/pakiety" -->
                <div class="flex columns-2 w-full mb-2 place-items-center" @click="isClose()">
                  <Icon
                    name="ph:lightning-fill"
                    color="D19D38"
                    size=""
                    class="gold circle-icon"
                  />
                  <p class="ml-5 text-base">Nowy quiz</p>
                </div>
        </div>
        <div v-else>
          <NuxtLink to="/panel/quiz/dodaj-nowy">
            <div class="flex columns-2 w-full mb-2 place-items-center">
            <Icon
              name="ph:lightning-fill"
              color="D19D38"
              size=""
              class="gold circle-icon"
            />
            <p class="ml-5 text-base">Nowy quiz</p>
          </div>
        </NuxtLink>
      </div>
      </div>
      <div class="mt-5" @click="copyToken">
        <div class="flex columns-2 w-full mb-2 place-items-center">
          <Icon
            name="ph:user-circle-plus-fill"
            color="26AB22"
            size=""
            class="green circle-icon"
          />
          <p class="ml-5 text-base">Skopiuj link polecający</p>
          <div class="tooltip" v-if="tooltip">
            <span ref="tooltip" class="tooltiptext family">
              Skopiowano kod polecający
            </span>
          </div>
        </div>
      </div>
      <div class="mt-5"  @click="$emit('close')">
        <NuxtLink to="/panel/konto/srodki">
          <div class="flex columns-2 w-full mb-2 place-items-center">
            <Icon
              name="ph:wallet-fill"
              color="2B3BC7"
              size=""
              class="blue circle-icon"
            />
            <p class="ml-5 text-base">Wypłać środki</p>
          </div>
        </NuxtLink>
      </div>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useUser } from "@/store/useUser";

const tooltip = ref<boolean>();


const {invitationToken} = storeToRefs(useUser());
// TODO: Do jednego copy a potem do utils
const copyToken = async()=> {
  await useUser().getInvitationToken()
  let token:any = invitationToken.value;
  navigator.clipboard.writeText(token);
  tooltip.value = !tooltip.value;
  // tooltip.value = true
  setTimeout(() => (tooltip.value = false), 1700);
}
const emit = defineEmits<{
  (e: "close", value: any): void;
}>();

const { hasPremium } = storeToRefs(useUser())
const isOpen = ref(false)
const isClose = ()=>{
    isOpen.value =! isOpen.value
}
</script>
<style scoped>

.circle-icon {
    border: solid transparent;
    width: 47px;
    height: 47px;
    padding: 8px;
    border-radius: 100%;
  }
  .nav-icon{
    width: 100%
  }
  .green {
    background: rgba(43, 181, 40, 0.25);
  }
  .gold {
    background: rgba(209, 157, 56, 0.25);
  }
  .blue {
    background: rgba(43, 59, 199, 0.17);
  }
  
.tooltip {
  position: absolute;
  display: inline-block;
}
.tooltip .tooltiptext {
  visibility: hidden;
  width: 165px;
  background-color: #433d3d;
  color: #fff;
  font-size: 14px;
  font-weight: 300;
  text-align: center;
  border-radius: 8px;
  padding-top: 8px;
  padding-bottom: 10px;
  position: absolute;
  z-index: 1;
  margin: 21px;
  bottom: 1%;
  margin-left: 70px;
  margin-bottom: 26px;
  opacity: 0;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
  transition: opacity 0.4s;
}
.tooltip .tooltiptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 45%;
  margin-left: 0px;
  border-width: 6px;
  border-style: solid;
  border-color: #433d3d transparent transparent transparent;
}
.tooltip .tooltiptext {
  visibility: visible;
  opacity: 1;
}
</style>