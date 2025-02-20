<template>
  <NuxtLayout name="auth">
    <div class="auth-background" @click="auth.nullError()">
      <div class="width-login sm:shaddow-effect">
        <div v-if="isChangePasswordSucess">
          <Icon name="ph:check-circle-light" size="75" class="green" />
          <p class="text-[22px] font-semibold mt-[8px]">Zmieniono hasło</p>
          <p class="mt-[3px]">Twoje hasło zostało zaaktualizowane</p>
          <div class="w-[160px] mt-[21px]">
            <NuxtLink to="/">
              <p class="button-primary">Strona główna</p>
            </NuxtLink>
          </div>
        </div>
        <div v-else>
          <h2 class="mb-[19px] text-[28px] font-semibold">Przypomnij hasło</h2>
          <div v-if="isChangePassword">
            <Form @submit="changePassword" :validation-schema="changePasswordSchema" v-slot="{ errors }">
              <div class="flex flex-col gap-[10px]">
                <div class="flex justify-between">
                  <div class="flex flex-col sm:gap-[10px] mb-7 w-[150px]">
                    <InputBase name="verification_code" placeholder="Kod"
                      :hasError="errors?.code || errorValue" />
                  </div>
                  <p class="text-[15px] pt-[21px]"
                    :class="resentCodeText == 'Wyślij ponownie' ? ' hover:underline primary-color cursor-pointer' : ' font-medium text-[#21a67a]'"
                    @click="resentCode()">{{ resentCodeText }}</p>
                </div>
                <div class="flex flex-col gap-[10px] -mt-[28px] mb-8">
                  <div class="relative w-full">
                    <Icon :name="iconTypePassword" @click="changeType('password')"
                      class="bg-transparent px-[10px] w-[50px] right-[8px] absolute z-50 top-[16px] text-[#b7b6b6] hover:text-[#5f5f5f] hover:duration-150 cursor-pointer"
                      size="23" />
                    <InputBase name="password" placeholder="Nowe hasło" :type="typePassword"  customType="password"
                      :hasError="errors?.password" />
                  </div>
                  <div class="relative w-full">
                    <Icon :name="iconTypeConfirmPassword" @click="changeType('confirmPassword')"
                      class=" bg-transparent px-[10px] w-[50px] right-[8px] top-[16px] absolute z-50  text-[#b7b6b6] hover:text-[#5f5f5f] hover:duration-150 cursor-pointer"
                      size="23" />
                    <InputBase name="confirmPassword" placeholder="Powtórz hasło" :type="typeConfirmPassword"  customType="password"
                      :hasError="errors?.confirmPassword" />
                  </div>
                </div>
              </div>
              <ButtonLoading isLoading="false" :loading="isLoadingButton" text="Zmień hasło" />
            </Form>
          </div>
          <div v-else>
            <Form @submit="sentVerificationCode" :validation-schema="validateEmailSchema" v-slot="{ errors }">
              <div class="flex flex-col gap-[10px] mb-6">
                <InputBase name="email" placeholder="E-mail" type="text" :hasError="errors?.email || errorValue" />
              </div>
              <ButtonLoading isLoading="false" :loading="isLoadingButton" text="Dalej" />
            </Form>
            <div
              class="flex flex-row w-full justify-start mt-12 pt-8 border-t-[1px] border-[#dddddd] gap-[6px]">
              <p class="text-[15px]">Nie masz konta?</p>
              <NuxtLink to="/rejestracja">
                <p class="text-[15px] font-medium hover:underline primary-color">Zarejestruj się</p>
              </NuxtLink>
            </div>
            <div class="flex flex-row w-full justify-start mt-2 gap-[6px]">
              <p class="text-[15px]">Masz już konto?</p>
              <NuxtLink to="/">
                <p class="text-[15px] font-medium hover:underline primary-color">Zaloguj się</p>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
<script setup lang="ts">
import axios from 'axios'
import * as yup from "yup";
import { Form } from "vee-validate";
import { useAuth } from "@/stores/useAuth";

definePageMeta({
  middleware: "user",
})

const auth = useAuth()
const isChangePassword = ref(false)
const { isLoadingButton, errorValue, token, loggedIn, email } = storeToRefs(auth)
const isChangePasswordSucess = ref(false)

const resentCodeText = ref("Wyślij ponownie")

const validateEmailSchema = yup.object({
  email: yup.string().required("Wpisz e-mail swojego konta")
})
const API_URL = useRuntimeConfig().public.API_URL


const changePasswordSchema = yup.object({
  verification_code: yup.string().required("Wpisz kod"),
  password: yup
    .string()
    .required("Wpisz nowe hasło")
    .test("valid-password", "Nieprawidłowe hasło", (value) => {
      if (!value || value === "") return true;
      if (!/[a-z]/.test(value)) {
        throw new yup.ValidationError(
          "Hasło musi zawierać co najmniej jedną małą literę",
          null,
          "password"
        );
      }
      if (!/[A-Z]/.test(value)) {
        throw new yup.ValidationError(
          "Hasło musi zawierać co najmniej jedną dużą literę",
          null,
          "password"
        );
      }
      if (!/\d/.test(value)) {
        throw new yup.ValidationError(
          "Hasło musi zawierać co najmniej jedną cyfrę",
          null,
          "password"
        );
      }
      if (!/[ @$\\!%*?&()#<>^\-_=+;:"/'|[\]{}]/.test(value)) {
        throw new yup.ValidationError(
          "Hasło musi zawierać co najmniej jeden znak specjalny",
          null,
          "password"
        );
      }

      return true;
    })
    .max(24, "Hasło nie może mieć więcej niż 24 znaki"),

  confirmPassword: yup.string().required("Powtórz hasło").oneOf([yup.ref("password")], "Hasła nie są identyczne"),
})

const changePassword = async (values: any) => {

  try {
    isLoadingButton.value = true
    const res = await axios.post(`${API_URL}/reset-password`, {
      email: email.value,
      verification_code: values.verification_code,
      password: values.password,
      confirm_password: values.confirmPassword,
    })
    isLoadingButton.value = false
    isChangePasswordSucess.value = true
    setTimeout(() => {
      auth.login(email.value, values.password);
    }, 900)
  } catch (error: any) {
    setTimeout(() => {
      isLoadingButton.value = false
      errorValue.value = error.response.data.messageError
    }, 400)
    isChangePasswordSucess.value = false
    console.error("Błąd wysyłania kodu weryfikacyjnego");
  }

}


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
}

const sentVerificationCode = async (values: any) => {
  try {
    isLoadingButton.value = true
    const res = await axios.post(`${API_URL}/reset-password-code`, {
      email: values.email
    })
    email.value = values.email
    isLoadingButton.value = false
    isChangePassword.value = true
  } catch (error: any) {
    setTimeout(() => {
      isLoadingButton.value = false
      errorValue.value = error.response.data.message
    }, 400)
    isChangePassword.value = false
    console.error("Błąd wysyłania kodu weryfikacyjnego");
  }

}

const resentCode = async () => {
  resentCodeText.value = "Wysłano"
  await auth.sendNewCode(null)
  setTimeout(() => {
    resentCodeText.value = "Wyślij ponownie"
  }, 1600)
}

onMounted(() => {
  auth.nullError()
  token.value = ""
  loggedIn.value = false
});

useSeoMeta({
  title: 'Power od quiz - przypomnij hasło',
  ogTitle: 'Power od quiz - przypomnij hasło',
  twitterCard: 'summary_large_image',
})


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
    padding: 35px;
  }
}

@media only screen and (min-width: 880px) {
  .width-login {
    position: absolute;
    width: 440px;
    background: white;
    border-radius: 16px;
    padding: 46px;
    top: 50%;
    right: 0%;
    transform: translate(-50%, -50%);
  }
}
</style>
