<template>
  <Transition>
    <div class="fixed z-50 left-0 bottom-0 w-full">
      <div class="blur-background-update" v-if="props.modalActive"></div>
      <Transition
        @before-enter="onBeforeEnter"
        @enter="onEnter"
        @after-enter="onAfterEnter"
        @enter-cancelled="onEnterCancelled"
        @before-leave="onBeforeLeave"
        @leave="onLeave"
        @after-leave="onAfterLeave"
        @leave-cancelled="onLeaveCancelled"
        :css="false"
      >
        <div class="modal-down" v-if="props.modalActive">
          <div class="justify-center flex -mt-[17px]">
            <hr class="w-9 close border-[2px] rounded-2xl" />
          </div>
          <div class="flex columns-2 w-full justify-between mb-7 mt-[13px] place-items-center">
            <p class="font-medium text-2xl">{{ title }}</p>
            <Icon
              name="carbon:close"
              size="30"
              class="close w-8 h-8 border-transparent rounded-[6px]"
              @click="$emit('close')"
            />
          </div>
          <div class="">
            <slot name="content" />
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import gsap from 'gsap'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  modalActive: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['close'])

const onBeforeEnter = (el: any) => {
  // gsap.set(el, { opacity: 0, y: 50 })
}

// const onEnter = (el: any, done: any) => {
//   gsap.from(el, {
//     // opacity: 1,
//     y: 300,
//     duration: 0.3,
//     onComplete: done,
//   })
// }


const onEnter = (el:any, done:any) => {
  let elementHeight = el.offsetHeight;
  gsap.from(el, {
    ease: "power1.out",
    y: elementHeight,
    duration: 0.3,
    onComplete: done,
  });
};

const onAfterEnter = (el: any) => {
  // Do something after enter animation
}

const onEnterCancelled = (el: any) => {
  // Handle cancelled enter animation
}

const onBeforeLeave = (el: any) => {
  // Do something before leave animation
}

const onLeave = (el: any, done: any) => {
  let elementHeight = el.offsetHeight;
  gsap.to(el, {
    ease: "power1.out",
    y: elementHeight,
    duration: 0.3,
    onComplete: done,
  })
}

const onAfterLeave = (el: any) => {
  // Do something after leave animation
}

const onLeaveCancelled = (el: any) => {
  // Handle cancelled leave animation
}
</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";

.okej {
  letter-spacing: 0.05em;
  font-size: 15px;
  color: $primary;
  font-weight: 600;
  margin-left: 17px;
}

.edit-message-modal {
  margin-top: 10px;
  line-height: 24px;
  font-weight: 500;
  font-size: 15px;
  text-align: center;
}

// .modal-down {
// background-color: white;
// border: solid transparent;
//   border-radius: 16px 16px 0px 0px;
//   padding: 24px 24px 12px 24px;
//   position: relative;
//   z-index: 100;
// }

.modal-down{

 background-color: white;
 border: solid transparent;
   border-radius: 16px 16px 0px 0px;
   padding: 24px 24px 12px 24px;
  // margin-left: 64px;
  // margin-right: 64px;
  position: absolute;
  // left: 0;
  // right: 0;
  // top: 40%;
  bottom: 0px;
  width: 100%;
  z-index: 100;
}

.close {
  color: rgb(209, 209, 209);
}

/* tło do modala */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.v-enter-from {
  opacity: 0;
  transform: translateY(50px);
}

.v-leave-to {
  opacity: 0;
  transform: translateY(50px);
}

.list-enter-active,
.list-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateY(50px);
}

.list-leave-to {
  opacity: 0;
  transform: translateY(50px);
}
</style>
