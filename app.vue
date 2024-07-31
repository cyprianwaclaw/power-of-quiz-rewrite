<template>
  <div class="page-background family">
    <NuxtLayout name="page">
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { useUser } from "@/stores/useUser"
const userState = useUser()
const { user} = storeToRefs(userState)
await userState.login()
await userState.getUserSettings()

</script>

<style scoped lang="scss">


</style>
