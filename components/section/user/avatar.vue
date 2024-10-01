<template>
  <div @click="$emit('clicked')">
    <!-- {{ avatarImage }} -->
    <div v-if="isLoading" class="is-loading" :style="{ width: props.size + 'px', height: props.size + 'px' }">
      <div class="image" />
    </div>
    <!-- fsdfdf -->
    <!-- {{ avatarImage }} -->
    <div v-else>
       <img v-if="avatarImage" :src="avatarImage" :style="{ width: props.size + 'px', height: props.size + 'px' }"
        class="border-[#EDEDED] rounded-full" @load="isLoading = false" @error="isLoading = false" />
      <div v-else :style="{ width: props.size + 'px', height: props.size + 'px' }">
        <svg width="100%" height="100%" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M34.0299 31.5319C36.0046 ... z" fill="#B6C4E9" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const isLoading = ref(true);
const props = defineProps({
  size: {
    required: true,
    type: Number,
  },
  avatar: {
    required: true,
    type: String,
  },
});

const avatarImage = ref(props.avatar)

onMounted(() => {
  avatarImage.value = props.avatar;
   isLoading.value = false;
  loadAvatarImage(props.avatar)
})

watch(() => props.avatar, (newValue) => {
  isLoading.value = true;
  avatarImage.value = newValue; 
  loadAvatarImage(newValue);
});


function loadAvatarImage(url: string) {
  const img = new Image()
  img.src = url;
  img.onload = () => {
    isLoading.value = false
  }
}
</script>
<style scoped lang="scss"> .is-loading {
   .image {
     background: linear-gradient(110deg, #c7c7c7 8%, #d4d4d4 18%, #c7c7c7 33%);
     background-size: 200% 100%; // Upewnij się, że animacja ma miejsce na "przesuwanie"
     animation: shine 1.6s linear infinite;
     height: 100%;
     width: 100%;
     border-radius: 999px;
   }
 }

 @keyframes shine {
   from {
     background-position: 200% 0;
   }

   to {
     background-position: -200% 0;
   }
 }
</style>
