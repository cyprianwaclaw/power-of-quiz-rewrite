<template>
  <div class="relative flex flex-col w-full">
    <textarea class="scrollbar-hide" v-on="handlers" :value="textValue" row="1" :type="type" :placeholder="placeholder"
      :class="props.hasError ? 'isError' : null" wrap="soft" rows="1" ref="textarea" @input="resizeTextarea" />
    <!-- <p v-if="props?.hasError" class="text-[#c22b3a] text-[13px] bg-white mt-1"> -->
      {{ props?.hasError }}
    <!-- </p> -->
  </div>
</template>

<script setup lang="ts">
import { useField } from "vee-validate";
import { modes } from "@/functions";
import { ref, onMounted, computed } from 'vue';

const textarea = ref<HTMLTextAreaElement | null>(null);

const props = defineProps({
  name: {
    type: String,
  },
  type: {
    type: String,
  },
  placeholder: {
    type: String,
  },
  hasError: {
    type: String,
  },
  label: {
    type: String,
  },
  mode: {
    type: String,
    default: "aggressive",
  },
});

const { meta, value, errorMessage, handleChange, handleBlur } = useField(
  props.name as any,
  null as any,
  {
    validateOnValueUpdate: false,
  }
)

const textValue = ref(value) as any

const handlers = computed(() => {
  const on: Record<string, any> = {
    blur: handleBlur,
    input: [(e: any) => handleChange(e, false)],
  };

  const triggers = modes[props.mode]({
    errorMessage,
    meta,
  });

  triggers.forEach((t: any) => {
    if (Array.isArray(on[t])) {
      on[t].push(handleChange);
    } else {
      on[t] = handleChange;
    }
  });

  return on;
});


const resizeTextarea = () => {
  if (textarea.value) {
    textarea.value.style.height = 'auto';
    textarea.value.style.height = `${textarea.value.scrollHeight}px`
  }
};

onMounted(() => {
  resizeTextarea()
})
</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";

// textarea {
//   background-color: #ECECEC;
//   padding: 14px 16px;
//   width: 100%;
//   color: #211f1f;
//   font-size: 16px;
//   letter-spacing: 0.17px;
//   border: 1px solid transparent;
//   outline: none;
//   border-radius: 12px;
//   font-weight: 400;
//   transition: border-color 0.24s ease-in-out, color 0.24s ease-in-out, background-color 0.24s ease-out;
//   resize: none;
//   /* Prevents manual resizing by the user */
//   overflow-y: auto;
//   /* Allows vertical scrolling */

//   &:focus {
//     background-color: #ffffff;
//     border-color: #d0d0d0;
//     border-width: 1px;
//     color: #363636 !important;
//     letter-spacing: 0.17px;
//     font-weight: 400;
//   }

//   &::placeholder {
//     letter-spacing: 0.17px;
//     font-size: 16px;
//     font-weight: 400;
//     color: #9D9D9D;
//   }

//   &:focus::placeholder {
//     font-weight: 400;
//     color: #d9d9d9;
//   }

//   &::-ms-clear {
//     display: none;
//   }
// }

// .isError {
//   background-color: #f9e8e8;
//   color: $color-error !important;
//   letter-spacing: 0.17px;
//   font-weight: 400;
// }

// label {
//   margin-bottom: 15px;
//   position: relative;
// }

textarea {
   //   background-color: #ECECEC;
   padding: 0px;
   width: 100%;
   //   color: #211f1f;
   font-size: 16px;
   letter-spacing: 0.17px;
   // border: 1px solid #363636;
   outline: none;
   // border-radius: 12px;
   font-weight: 400;
   // transition: border-color 0.24s ease-in-out, color 0.24s ease-in-out, background-color 0.24s ease-out;
   resize: none;
   /* Prevents manual resizing by the user */
   overflow-y: auto;
   /* Allows vertical scrolling */

   &:focus {
      background-color: #ffffff;
      // border-color: #d0d0d0;
      // border-width: 1px;
      color: #363636 !important;
      letter-spacing: 0.17px;
      font-weight: 400;
   }

   &::placeholder {
      letter-spacing: 0.17px;
      font-size: 16px;
      font-weight: 400;
      color: #9D9D9D;
   }

   &:focus::placeholder {
      font-weight: 400;
      color: #d9d9d9;
   }

   &::-ms-clear {
      display: none;
   }
}

.text {
  position: absolute;
  font-size: 15px;
  top: 10px;
  left: 8px;
  padding: 0px 8px 0px 8px;
  font-size: 15px;
  color: $input-border;
  transition: 0.3s ease;
}
</style>
