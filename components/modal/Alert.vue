<template>
  <Transition>
    <div class="fixed z-50 left-0 bottom-0 w-full">
      <div class="blur-background-update" v-if="props.modalActive"></div>
      <Transition 
      @before-enter="onBefore"
      >
        <div 
        class="modal-view-update" 
        :class="[
          props.name=='singleQuiz' ? 'w-[900px] relative h-[550px]':'md:w-[400px] lg:w-[500px] 2xl:w-[600px] w-[300px]',
          ]"
        v-if="props.modalActive">
        <div class="flex justify-end pr-3 pt-2">
          <Icon
          name="carbon:close"
          size="32"
          class="close w-8 h-8 border-transparent rounded-[6px] absolute cursor-pointer"
          @click="$emit('close')"
          />
        </div>
        <!-- {{ props.status }} -->
        <div class="flex justify-center md:mt-11 md:-mb-2 w-full -mb-8 mt-10">
          <Icon v-if="props.status=='error'" name="ph:x-circle-light"  class="red" size="75"/>
          <Icon v-if="props.status=='success'" name="ph:check-circle-light"  size="75" class="green"/>
          <Icon v-if="props.status=='alert'" name="ph:warning-circle-light"  size="75" class="wait"/>
        </div>
        <div class="px-5"
        :class="[props.name=='singleQuiz' ? '':'pb-2 md:pb-6  md:pt-4 pt-10 grid']"
        >
            <p class="text-[21px] md:text-[24px] text-center font-semibold md:mb-1 ">{{ props.title }}</p>
            <slot name="content" />
              <p class="edit-message-modal">{{ props.des }}</p>
          </div>
          <div class="flex mx-7 mb-8 place-items-center gap-6 justify-end" v-if="props?.name=='Premium'">
            <p class="primary-color action-button cursor-pointer" @click="$emit('close')">
              {{ props.closeButton }}
            </p>
            <div v-if="props.actionButton == 'Zobacz pakiety'">
              <button class="button-primary-small hover:cursor-pointer" @click="changePage()">{{ props.actionButton }}</button>
            </div>
            <NuxtLink :to="props.redirect" class="cursor-pointer" v-else>
                <p class="button-primary-small hover:cursor-pointer">{{ props.actionButton }}</p>
            </NuxtLink>
          </div>
          <div class="flex md:mx-7 md:mb-6 mb-5 mx-5 place-items-center gap-6 justify-end" v-else>
            <NuxtLink :to="props.redirect" v-if="props.redirect" class="cursor-pointer">
                <p class="action-button primary-color">{{ props.actionButton }}</p>
            </NuxtLink>
            <div @click="$emit('action')" v-else class="action-button">           
              <p :class="[props.actionButtonClass ? props.actionButtonClass : 'primary-color']">
                {{ props.actionButton }}
              </p>
            </div>
            <p v-if="props.closeButton" class="button-primary-small cursor-pointer" @click="$emit('close')">
              {{ props.closeButton }}
            </p>
          </div> 
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import gsap from 'gsap'
const emit = defineEmits(['close', 'action']);
const props = defineProps({
  title: {
    type: String,
    required: false,
  },
  des: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    required: false,
  },
  closeButton: {
    type: String,
    required: true,
  },
  closeButtonClick: {
    type: String,
    required: false,
  },
  modalActive: {
    type: Boolean,
    required: true,
  },
  actionButton: {
    type: String,
    required: false,
  },
  actionButtonClass: {
    type: String,
    required: false,
  },
  redirect: {
    type: String,
    required: false,
  },
});

const onBefore = (el:any)=>{
  gsap.to(el,{
    y: -20,
    duration: 0.2,
  })
}
const router = useRouter()
const changePage = () => {
  if (window.screen.width <= 900) {
    router.push('/panel/pakiety')
  }else{
    router.push('/panel/konto')
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";

.action-button {
  letter-spacing: 0.05em;
  font-size: 15px;
  font-weight: 600;
}

.edit-message-modal {
  margin: 10px 8px 0px 8px;
  line-height: 24px;
  font-weight: 500;
  font-size: 15px;
  text-align: center;
}

.close {
  color: rgb(194, 194, 194);
}

/* tło do modala */
.v-enter-active,
.v-leave-active {
  transition: opacity 0s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
@media only screen and (min-width: 1024px){
  .modal-view-update {
    background-color: white;
    border: solid transparent;
    border-radius: 24px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
  }
  .edit-message-modal {
    margin: 5px 10px 24px 10px;
    line-height: 27px;
    font-weight: 400;
    font-size: 17px;
    text-align: center;
  }
  
}

@media only screen and (max-width: 1024px){
  .modal-view-update {
    background-color: rgb(243, 239, 239);
    border: solid transparent;
    border-radius: 12px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
  }
  .edit-message-modal {
    margin: 6px 14px 24px 14px;
    line-height: 25px;
    font-weight: 400;
    font-size: 16px;
    text-align: center;
  }
  
}
</style>
