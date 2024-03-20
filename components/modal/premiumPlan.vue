<template>
    <div class="fixed z-50 left-0 bottom-0 w-full">
        <div class="blur-background-update"></div>
        <div class="modal-view-update">    
            <div class="px-5 py-7 grid ">
              <div >
                <p class="text-[22px] text-center font-semibold">Brak dostępu</p>            
                <p class="edit-message-modal">Ta sekcja wymaga pakietu Premium. Dołącz już teraz i ciesz się pełnymi możliwościami</p>            
              </div>
            </div>    
          <div class="flex justify-between mx-5 mb-7">
            <button class="okej" @click="$emit('close')">Zamknij</button>
            <!-- Wklieć link do wszystkich pakietów -->
            <NuxtLink to="/panel/pakiety">
                <button class="button-primary-small">Zobacz pakiety</button>
            </NuxtLink>
        </div>
          </div>
        </div>

</template>
<script setup lang="ts">
const emit = defineEmits<{
  (e: "close", value: any): void;
}>();

const isOpen = ref(false)
</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";
.okej{
    letter-spacing: 0.05em;
    font-size: 15px;
    color: $primary;
    font-weight: 600;
    margin-left: 17px;
}
.edit-message-modal{
margin-top: 10px;
line-height: 24px;
font-weight: 500;
font-size: 15px;
text-align: center;
}
</style>

