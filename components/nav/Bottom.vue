<!-- <template> -->
  <!-- <ModalDown :modalActive="isOpen" title="Wybierz akcję" @close="isClose">
    <template #content>
      <ModalContentSelectAction @close="isClose" />
    </template>
  </ModalDown> -->
  <!-- <div
    class=" md:hidden px-2 py-2 border-t border-gray-200 fixed left-0 bottom-0 z-30 grid grid-cols-5 w-full h-70 bg-white justify-items-center"
  >
    <div class="w-full grid justify-center">
      <div v-if="routeName == 'home'">
        <Icon name="ph:house-fill" size="36" class="nav-icon primary-color" />
      </div>
      <div class="w-full flex" v-else>
        <NuxtLink to="/panel">
          <Icon name="ph:house-light" size="36" class="nav-icon" />
        </NuxtLink>
      </div>
    </div>
    <div class="w-full grid justify-center">
      <div v-if="routeName == 'quiz'">
        <Icon name="ph:game-controller-fill" size="36" class="nav-icon primary-color" />
      </div>
      <div class="w-full grid justify-center" v-else>
        <NuxtLink to="/panel/quiz">
          <Icon name="ph:game-controller-light" size="36" class="nav-icon" />
        </NuxtLink>
      </div>
    </div>
    <div class="w-full grid justify-center" @click="isClose()">
      <Icon name="ph:plus-circle-light" size="36" class="nav-icon" />
    </div>
    <div class="w-full grid justify-center">
      <div v-if="routeName == 'invite'">
        <Icon name="ph:users-fill" size="36" class="nav-icon primary-color" />
      </div>
      <div class="w-full grid justify-center" v-else>
        <NuxtLink to="/panel/zaproszeni">
          <Icon name="ph:users-light" size="36" class="nav-icon" />
        </NuxtLink>
      </div>
    </div>
    <div class="w-full grid justify-center">
      <div v-if="routeName == 'account'">
        <Icon name="ph:user-circle-fill" size="36" class="nav-icon primary-color" />
      </div>
      <div class="w-full grid justify-center" v-else>
        <NuxtLink to="/panel/konto">
          <Icon name="ph:user-circle-light" size="36" class="nav-icon" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
// import { RouteChange } from "@/utils/function";
const route = useRoute();

const isOpen = ref(false);

// TODO:wyodrębnić do jednej funkcji w utils
// i zmienić nazwę na isModal

const isClose = () => {
  isOpen.value = !isOpen.value;
};
// const routeName = RouteChange(route.path);
</script>
<style scoped lang="scss">
@import "@/assets/style/variables.scss";
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style> -->
<template>
  <div>
dsdsd
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>