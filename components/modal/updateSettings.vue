<template>
  <div class="fixed z-50 left-0 bottom-0 w-full">
    <div class="blur-background-update" v-if="props.modalActive" @click="$emit('close')" />
    <Transition @enter="onEnter" @leave="onLeave" :css="false">
      <div class="modal" v-if="props.modalActive">
        <div class="flex  w-full justify-end">
          <Icon name="carbon:close" size="30" class="close w-8 h-8 border-transparent rounded-[6px]"
            @click="$emit('close')" />
        </div>
        <div class="flex w-full justify-center items-center flex-col text-center mb-[25px] -mt-[10px]">
          <Icon name="ph:check-circle-light" color="#4BB21A" size="64" />
          <p class="font-medium text-[20px] text-center mt-[8px]">Zapisano</p>
          <p class="text-center mt-[4px]">Twoje ustawienia zostały poprawnie zapisane</p>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import gsap from 'gsap'

const props = defineProps({
  modalActive: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['close'])

const onEnter = (el: any, done: any) => {
  let elementHeight = el.offsetHeight;
  gsap.from(el, {
    ease: "power1.out",
    y: elementHeight,
    duration: 0.3,
    onComplete: done,
  });
};


const onLeave = (el: any, done: any) => {
  let elementHeight = el.offsetHeight;
  gsap.to(el, {
    ease: "power1.out",
    y: elementHeight,
    duration: 0.3,
    onComplete: done,
  })
}

</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";

.modal {
  background-color: #f6f6f6;
  border-radius: 12px;
  padding: 24px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: calc(100% - 64px);
  max-width: 460px;
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

</style>
