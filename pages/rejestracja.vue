<template>
  <div class="auth-background" @click="auth.nullError()">
    <div class="width-login sm:shaddow-effect">
      <h2 class="mb-[18px] text-[28px] font-semibold">Rejestracja</h2>
      {{ errorValue?.errors }}
      <p v-if="errorValue?.errors?.otherError ? true : false" class="text-red-500 text-[14px] mb-4 -mt-4">
        {{ errorValue?.errors?.otherError }}
      </p>
      <Form @submit="registerUser" @click="auth.nullError()" :validation-schema="schema"
        v-slot="{ meta, values, errors }">
        <div class="flex flex-col sm:gap-[16px] mb-7">
          <div class="sm:flex gap-[24px]">
            <InputBase name="name" placeholder="Imię i nazwisko" type="text" :hasError="errors?.name"
              class="mb-3 md:mb-0" />
            <InputBase name="email" placeholder="E-mail" type="text" class="mb-3 md:mb-0"
              :hasError="errors?.email || errorValue?.errors?.email[0]" />
          </div>
          <InputBase name="invitationCode" placeholder="Kod polecajacy" type="text" class="mb-3 md:mb-0"
            :hasError="errorValue?.errors" />
          <!-- <div class="relative"> -->
          <div class="sm:flex gap-[24px]">
            <Icon :name="iconType" @click="changeType(loginType)"
              class="absolute z-50 top-[16px] right-[24px] text-[#b7b6b6] hover:text-[#878787] hover:duration-150 cursor-pointer"
              size="23" />
            <!-- <div> -->

            <div class="relative w-full">
              <Icon :name="iconTypePassword" @click="changeType('password')"
                class="absolute z-50 top-[16px] right-[24px] text-[#b7b6b6] hover:text-[#878787] hover:duration-150 cursor-pointer"
                size="23" />
              <InputBase name="password" placeholder="Hasło" :type="typePassword" :hasError="errors?.password"
                class="mb-3 md:mb-0" />
            </div>
            <!-- </div> -->
            <div class="relative w-full">
              <Icon :name="iconTypeConfirmPassword" @click="changeType('confirmPassword')"
                class="absolute z-50 top-[16px] right-[24px] text-[#b7b6b6] hover:text-[#878787] hover:duration-150 cursor-pointer"
                size="23" />
              <InputBase name="confirmPassword" placeholder="Potwierdz hasło" :type="typeConfirmPassword"
                :hasError="errors?.confirmPassword" class="mb-3 md:mb-0" />
            </div>
          </div>
        </div>
        <ButtonLoading :disable="!meta.valid ||
          errorValue ||
          !values.password ||
          values.password.length === 0 ||
          !values.name ||
          values.name.length === 0 ||
          !values.email ||
          values.email.length === 0 ||
          !values.confirmPassword ||
          values.confirmPassword.length === 0
          " isLoading="false" :loading="isLoadingButton" text="Zarejestruj się" />
      </Form>
      <div class="flex sm:flex-row flex-col w-full justify-center mt-10 pt-3 border-t-[1px] border-[#E6E8EA]">
        <p class="text-des mr-2">Masz konto?</p>
        <NuxtLink to="/"><span class="navigate">Zaloguj się</span></NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as Yup from "yup";
import { useAuth } from "@/stores/useAuth";
import * as yup from "yup";
import { Form, Field, useForm, ErrorMessage, useField } from "vee-validate";
const axiosInstance = useNuxtApp().$axiosInstance;
const auth = useAuth();

definePageMeta({
  middleware: "user",
});

const { isLoadingButton, errorValue } = storeToRefs(auth);

const error = ref("") as any;
const success = ref("") as any;
const loginData = ref("") as any;

const typePassword = ref<string>("password");
const typeConfirmPassword = ref<string>("password");

const iconTypePassword = ref<string>("ph:eye");
const iconTypeConfirmPassword = ref<string>("ph:eye");

const changeType = (typeName: string) => {
  if (typeName === "password") {
    typePassword.value = typePassword.value === "password" ? "text" : "password";
    iconTypePassword.value =
      typePassword.value === "password" ? "ph:eye" : "ph:eye-slash";
  } else {
    typeConfirmPassword.value =
      typeConfirmPassword.value === "password" ? "text" : "password";
    iconTypeConfirmPassword.value =
      typeConfirmPassword.value === "password" ? "ph:eye" : "ph:eye-slash";
  }
};

const schema = yup.object({
  name: yup.string().test("valid-name", "Nieprawidłowe imię i nazwisko", (value) => {
    if (!value) return true;
    const nameRegex = /^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]+\s[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]+$/;
    return nameRegex.test(value);
  }),
  email: yup.string().test("valid-email", "Nieprawidłowy adres e-mail", (value) => {
    if (!value || value === "") return true;
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(value);
  }),
  password: yup
    .string()
    .test("valid-password", "Nieprawidłowe hasło", (value) => {
      if (!value || value === "") return true;
      if (!/[a-z]/.test(value)) {
        throw new yup.ValidationError(
          "Hasło musi zawierać co najmniej jedną małą literę.",
          null,
          "password"
        );
      }
      if (!/[A-Z]/.test(value)) {
        throw new yup.ValidationError(
          "Hasło musi zawierać co najmniej jedną dużą literę.",
          null,
          "password"
        );
      }
      if (!/\d/.test(value)) {
        throw new yup.ValidationError(
          "Hasło musi zawierać co najmniej jedną cyfrę.",
          null,
          "password"
        );
      }
      if (!/[ @$\\!%*?&()#<>^\-_=+;:"/'|[\]{}]/.test(value)) {
        throw new yup.ValidationError(
          "Hasło musi zawierać co najmniej jeden znak specjalny.",
          null,
          "password"
        );
      }

      return true;
    })
    .max(20, "Hasło nie może mieć więcej niż 20 znaków"),

  confirmPassword: yup.string().oneOf([yup.ref("password")], "Hasła nie są identyczne"),
});

const registerUser = async (values: any) => {
  await new Promise((resolve) => setTimeout(resolve, 600));
  await auth.register(
    values.name,
    values.email,
    values.invitationCode,
    values.password,
    values.confirmPassword
  );
};
onMounted(() => {
  auth.nullError();
});
</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";

@media only screen and (max-width: 880px) {
  .width-login {
    max-width: 500px;
    position: relative;
    top: 50%;
    left: 50%;
    width: 84%;
    transform: translate(-50%, -50%);
    background: white;
    border-radius: 16px;
    padding: 28px;
  }
}

@media only screen and (min-width: 880px) {
  .width-login {
    position: absolute;
    width: 700px;
    background: white;
    border-radius: 16px;
    padding: 55px;
    top: 50%;
    left: 67%;
    transform: translate(-50%, -50%);
  }
}
</style>
