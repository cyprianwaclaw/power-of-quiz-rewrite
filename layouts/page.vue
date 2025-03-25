<template>
  <div class="w-full">
    <div v-if="!['rejestracja', 'przypomnij-hasło', 'index'].includes(router?.currentRoute.value.name)">
      <NavUser />
    </div>
    <div class="min-h-screen page-background own-container">
      <slot />
    </div>
    <div v-if="!['rejestracja', 'przypomnij-hasło', 'index'].includes(router?.currentRoute.value.name)">

      <div class="md:hidden fixed bottom-0 z-30 w-full">
        <NavBottom />
      </div>
      <div class="hidden md:flex">
        <NavBottomDesktop />
      </div>
    </div>
    <div class="bg-white h-[62px] flex place-items-center p-[24px]">
      <div class="gap-[18px] flex w-full justify-end">
        <NuxtLink class="text-slate-400 hover:text-slate-800 transition-all duration-200" to="/regulamin">Regulamin</NuxtLink>
        <NuxtLink class="text-slate-400 hover:text-slate-800 transition-all duration-200" to="/polityka-prywatności">Polityka Prywatności</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter() as any

// const isQuizGamePage = router.currentRoute.value.matched[0].name === "panel-quiz-id" ? true : false;
</script>

<style scoped>
.own-container {
  margin-left: 24px;
  margin-right: 24px;
  padding-top: 100px;
  padding-bottom: 200px;
}

.game-container {
  margin-left: 24px;
  margin-right: 24px;
  padding-top: 64px;
}

@media (min-width: 640px) {
  .own-container {
    padding-left: 30px;
    padding-right: 30px;
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
