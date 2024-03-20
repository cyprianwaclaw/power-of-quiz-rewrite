<template>
  <div class="relative flex flex-col w-full">
    <input
      v-on="handlers"
      :value="value"
      :type="type"
      :placeholder="placeholder"
      :label="label"
      @focus="inputFocus"
      @blur="inputBlur"
      :class="props.hasError ? 'isError' : null"
    />
    <p
      v-if="props?.hasError && props?.hasError !== 'notShow'"
      class="text-red-500 text-[13px] bg-white mt-1"
    >
      {{ props?.hasError }}
    </p>
    <!-- :style="{ 'border-color': color }" -->
    <!-- <p v-if="props.hasError" class="text-red-500 text-[13px] bg-white mt-1">
      {{ errorMessage }}
    </p> -->
  </div>
</template>

<script setup lang="ts">
import { useField } from "vee-validate";
import { modes } from "@/functions";
const color = ref("#9B9B9B") as any;

// const hasError = ref(false);
// const inputFocus = () => {
//   color.value = "#2BB069";
// };

// const inputBlur = () => {
//   color.value = "#9B9B9B";
// };

const props = defineProps({
  name: {
    type: String,
  },
  error: {
    type: Boolean || null,
  },
  type: {
    type: String,
  },
  icon: {
    type: String,
  },
  placeholder: {
    type: String,
  },
  hasError: {
    type: String,
    // default: true,
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
);
const handlers = computed(() => {
  const on: Record<string, any> = {
    blur: handleBlur,
    input: [(e: any) => handleChange(e, false)],
  };

  // const isError = (err: boolean, color: string) => {
  //   if (!err) {
  //     return "red";
  //   } else {
  //     return color;
  //   }
  // };

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
// watch(props as any, (newValue) => {
//   if (newValue.error == true) {
//     color.value = "#ef4444";
//   } else {
//     color.value = "#9B9B9B";
//   }
// });
</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";

//.success input {
//  color: #212427;
//  background: white;
//}

input {
  display: flex;
  font-size: 16px;
  width: 100%;
  border: 2px solid $input-border;
  height: 54px;
  overflow: hidden;
  border-radius: 10px;
  padding: 9px 16px;
  font-weight: 400;
  transition: border-color 0.3s ease;
}

.isError {
  border: 2px solid $color-error;
}

.isError:focus {
  border: 2px solid $color-error;
  transition: border 0.3s ease-in, transform 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

label {
  margin-bottom: 15px;
  position: relative;
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

input:focus {
  display: flex;
  font-size: 16px;
  width: 100%;
  border: 2px solid $primary;
  height: 54px;
  overflow: hidden;
  border-radius: 10px;
  padding: 9px 16px;
  font-weight: 400;
}
</style>
