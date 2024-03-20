<template>
  <div class="lg:hidden">
    <div @click="openMenu">
      <Icon name="ph:equals-light" size="42" class="close w-8 h-8" color="#C4C4C4" />
    </div>
    <Transition>
    <div class="fixed z-50 left-0 bottom-0 w-full">
      <div class="blur-background-update z-50" v-if="isOpen"></div>
      <Transition @before-enter="onBefore">
        <div
          class="absolute bg-white top-0 right-0 w-[350px] h-screen pt-10 px-5"
          v-if="isOpen"
        >
          <Icon
            name="carbon:close"
            size="32"
            class="close w-8 h-8 top-2 absolute right-4"
            color="#C4C4C4"
            @click="openMenu"
            v-on-click-outside="openMenu"
          />
          <div class="flex flex-col gap-5">
            <div v-for="(page, index) in links" :key="index">
              <NuxtLink :to="page.link">
                <p
                  class="text-[#464646] font-semibold whitespace-nowrap hover:text-black"
                >
                {{ page.name }}
                </p>
              </NuxtLink>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</div>
</template>
<script setup lang="ts">
import gsap from "gsap";
// import { vOnClickOutside } from "@vueuse/components";
const emit = defineEmits(["close"]);
const props = defineProps({
  closeButton: {
    type: String,
    required: true,
  },
  modalActive: {
    type: Boolean,
    required: true,
  },
});

const isOpen = ref(false);
const openMenu = () => {
  isOpen.value = !isOpen.value;
};

const links = [
  { name: "Zaproś znajomych", link: "/panel/zaproszeni" },
  { name: "Moje konto", link: "/panel/konto" },
  { name: "Moje quizy", link: "/panel/quiz/dodaj-nowy" },
  { name: "Ustawienia", link: "/panel/quiz/dodaj-nowy" },
  { name: "Dodaj nowy quiz", link: "/panel/quiz/dodaj-nowy" },
  { name: "Zaproś znajomych", link: "/panel/quiz/dodaj-nowy" },
  { name: "Ustawienia", link: "/panel/quiz/dodaj-nowy" },
  { name: "Przeglądaj quizy", link: "/panel/quiz/dodaj-nowy" },
];

const onBefore = (el: any) => {
  gsap.from(el, {
    x: 400,
    duration: 0.35,
  });
};
</script>
<style scoped lang="scss">
@import "@/assets/style/variables.scss";

.v-enter-active,
.v-leave-active {
  transition: opacity 0s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
