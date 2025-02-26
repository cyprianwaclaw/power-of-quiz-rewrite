<template>
  <ModalBottomMobile :modalActive="isOpen" @close="isClose" />
  <div
    class="md:hidden px-2 py-2 border-t border-gray-200 fixed left-0 bottom-0 z-20 grid grid-cols-5 w-full h-70 bg-white justify-items-center">
    <div class="w-full grid justify-center">
      <NuxtLink to="/panel" active-class="active">
        <Icon name="ph:house" size="35" class="nav-icon" />
      </NuxtLink>
    </div>
    <div class="w-full grid justify-center">
      <NuxtLink to="/panel/quiz" :class="route.fullPath == '/panel/quiz' ? 'active' : ''">
        <Icon name="ph:game-controller" size="36" class="nav-icon" />
      </NuxtLink>
    </div>
    <div class="w-full grid justify-center" @click="isClose()">
      <Icon name="ph:plus-circle" size="36" class="nav-icon" />
    </div>
    <div class="w-full grid justify-center">
      <NuxtLink to="/panel/quiz?section=konkursy"
        :class="route.fullPath == '/panel/quiz?section=konkursy' ? 'active' : ''">
        <Icon name="ph:shooting-star" size="36" class="nav-icon" />
      </NuxtLink>
    </div>
    <div class="w-full grid justify-center">
      <NuxtLink to="/panel/konto" active-class="active">
        <Icon name="ph:user-circle" size="36" class="nav-icon" />
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const isOpen = ref(false)

const isClose = () => {
  isOpen.value = !isOpen.value;
}

</script>

<style lang="scss" scoped>
@import "@/assets/style/variables.scss";

.nav-icon {
  transition: color 0.3s;
}

.active .nav-icon {
  color: $primary;
}
</style>