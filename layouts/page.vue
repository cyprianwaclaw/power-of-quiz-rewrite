<template>
  <div
    v-if="
      router.currentRoute.value.fullPath == '/' ||
      router.currentRoute.value.fullPath == '/przypomnij-haslo' ||
      router.currentRoute.value.fullPath == '/rejestracja'
        ? false
        : true
    "
    class="md:pb-[200px] lg:relative pb-[150px]"
  >
    <NavUser />
    <div class="own-container min-h-screen page-background">
      <slot />
    </div>
    <div class="md:hidden">
      <NavBottom />
    </div>
    <div class="hidden md:flex">
      <NavBottomDesktop />
    </div>
  </div>
  <div v-else>
    <slot />
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
</script>

<style scoped>
.own-container {
  margin-left: 30px;
  margin-right: 30px;
  padding-top: 100px;
}
@media (min-width: 640px) {
  .own-container {
    margin-left: 30px;
    margin-right: 30px;
    padding-top: 100px;
  }
}
@media (min-width: 768px) {
  .own-container {
    margin-left: 30px;
    margin-right: 30px;
    padding-top: 100px;
  }
}
@media (min-width: 1024px) {
  .own-container {
    margin-left: 100px;
    margin-right: 100px;
    padding-top: 100px;
  }
}
@media (min-width: 1280px) {
  .own-container {
    width: 1150px;
    margin: auto auto;
    padding-top: 100px;
  }
}
@media (min-width: 1536px) {
  .own-container {
    width: 1280px;
    margin: auto auto;
    padding-top: 100px;
  }
}
</style>
