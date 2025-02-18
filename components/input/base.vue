<template>
  <div class="relative flex flex-col w-full">
    <input v-on="handlers" :value="value" :type="type" :placeholder="placeholder" :label="label"  :class="props.hasError ? 'isError' : null"  />
    <p v-if="props?.hasError && props?.hasError !== 'notShow'" class="text-red-500 text-[13px] bg-white mt-1">
      {{ props?.hasError }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { useField } from "vee-validate";
import { modes } from "@/functions";
const color = ref("#9B9B9B") as any;

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
  }

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
  })

  return on
})

</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";

input {
  display: flex;
  font-size: 16px;
  width: 100%;
  border: 2px solid $input-border;
  height: 55px;
  overflow: hidden;
  border-radius: 10px;
  padding: 10px 18px !important;
  font-weight: 400;
  transition: border-color 0.3s ease;

    &:hover {
    border: 2px solid #d4d4d4;
  }

  &:focus {
    border: 2px solid $primary;
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
}

.isError {
  border: 2px solid $color-error;

  &:focus {
    border: 2px solid $color-error;
    transition: border 0.3s ease-in, transform 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55);
  }
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
</style>
