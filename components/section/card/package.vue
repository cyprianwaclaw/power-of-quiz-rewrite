<template>
  <div v-if="!hasPremium" class="h-[180px]">
    <p class="text-des-mobile">Twój pakiet</p>
    <h3 class="font-medium text-2xl mb-2.5 mt-1 tracking-wide">Standard</h3>
    <div class="text pr-4 mb-[27px]">
      Aktualnie posiadasz pakiet Standard, przejdź na
      <span class="primary-color font-semibold"> PREMIUM </span>i zyskaj dodatkowe funkcję
    </div>
    <NuxtLink
      to="/konto/plan-premium"
      class="button-primary mb-2 w-[189px] place-items-center"
    >
      Dostępne pakiety <Icon name="carbon:chevron-right" class="-mr-2" size="24" />
    </NuxtLink>
  </div>
  <div v-else>
    <div class="absolute top-0 right-0">
      <svg
        width="124"
        height="124"
        viewBox="0 0 124 124"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M47 0H0.5L123.5 123.5V76.5L47 0Z" fill="#FACC57" fill-opacity="0.74" />
        <g clip-path="url(#clip0_3807_6036)">
          <path
            d="M67.555 41.9658L67.1624 54.007L70.5747 44.9854L67.555 41.9658ZM67.929 56.7742L78.4089 52.8197L71.8835 46.2943L67.929 56.7742ZM71.7994 43.8168L77.2964 42.134L74.8471 39.6847L68.5647 40.5822L71.7994 43.8168ZM70.6962 57.5408L82.7374 57.1482L79.7178 54.1285L70.6962 57.5408ZM73.1549 45.1724L79.5308 51.5483L81.2136 46.0512L78.652 43.4896L73.1549 45.1724ZM80.8864 52.9038L84.121 56.1385L85.0185 49.8561L82.5691 47.4068L80.8864 52.9038ZM86.748 49.6785L85.5514 58.055C85.5265 58.2544 85.4376 58.4243 85.2849 58.5645C85.1323 58.7047 84.9531 58.778 84.7474 58.7842L66.1994 59.3825C65.9626 59.395 65.7538 59.3109 65.5731 59.1301C65.3923 58.9494 65.3082 58.7406 65.3207 58.5037L65.919 39.9558C65.9252 39.7501 65.9984 39.5709 66.1387 39.4182C66.2789 39.2655 66.4487 39.1767 66.6482 39.1518L75.0247 37.9552C75.2989 37.9053 75.5389 37.9832 75.7445 38.1889L86.5143 48.9586C86.72 49.1643 86.7979 49.4043 86.748 49.6785Z"
            fill="white"
          />
        </g>
        <defs>
          <clipPath id="clip0_3807_6036">
            <rect
              width="27.0769"
              height="22"
              fill="white"
              transform="translate(71.5566 34) rotate(45)"
            />
          </clipPath>
        </defs>
      </svg>
    </div>
    <p class="text-des-mobile">Twój pakiet</p>
    <h3 class="font-medium text-2xl mb-2.5 mt-1 tracking-wide">Premium</h3>
    <div class="text pr-4">
      Gratulacje, Twój pakiet
      <span class="primary-color font-semibold"> PREMIUM </span> jest aktywny. Dzięki temu
      masz dostęp do pełnej wersji serwisu. 
      <!-- Koniec dostępu do wersji Premium nastąpi
      <span class="text-gray-400 font-bold">{{ date }}</span> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useUser } from "@/stores/useUser";

const userState = useUser();
const { hasPremium } = storeToRefs(userState);
// await userState.userPlan()
const date = ref("12.12.2024");
</script>

<style scoped lang="scss"></style>
