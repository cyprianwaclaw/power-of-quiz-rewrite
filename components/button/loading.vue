
<template>
  <div v-if="props.loading" class="button-primary h-[54px] loading-button w-full">
    <div class="spinner-container">
      <svg class="spinner" width="24px" height="24px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
        <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
      </svg>
    </div>
  </div>
  <button v-else :disabled="props.disable" :class="props.disable ? 'button-primary-disabled' : 'button-primary'
    " class="w-full h-[54px]">
    {{ props.text }}
  </button>
</template>
<script setup lang="ts">
const props = defineProps({
  loading: {
    type: Boolean,
    required: false,
  },
  text: {
    type: String,
    required: true,
  },
  disable: {
    type: Boolean,
    required: false,
    default: false,
  },
})
</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";

.loading-button {
  display: flex;
  align-items: center;
  justify-content: center;
}

.button-primary-disabled {
  cursor: not-allowed !important;
  background-color: #aec5ff !important;
  padding: 10px 23px !important;
  color: $white !important;
  font-style: normal !important;
  font-weight: 500 !important;
  font-size: 15px !important;
  line-height: 22px !important;
  letter-spacing: 0.05em !important;
  display: block !important;
  border-radius: 8px !important;
}

.spinner-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

$offset: 187;
$duration: 1.2s;

.spinner {
  animation: rotator $duration linear infinite;
}

@keyframes rotator {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(270deg);
  }
}

.path {
  stroke-dasharray: $offset;
  stroke-dashoffset: 0;
  transform-origin: center;
  animation: dash $duration ease-in-out infinite,
    colors ($duration * 4) ease-in-out infinite;
}

@keyframes colors {
  0% {
    stroke: white;
  }

  25% {
    stroke: white;
  }

  50% {
    stroke: white;
  }

  75% {
    stroke: white;
  }

  100% {
    stroke: white;
  }
}

@keyframes dash {
  0% {
    stroke-dashoffset: $offset;
  }

  50% {
    stroke-dashoffset: calc(#{$offset} / 4);
    transform: rotate(135deg);
  }

  100% {
    stroke-dashoffset: $offset;
    transform: rotate(450deg);
  }
}
</style>
