<template>
  <NuxtLayout name="auth">
    <div class="auth-background" @click="auth.nullError()">
      <div class="width-login sm:shaddow-effect">
        <h2 class="mb-[19px] text-[28px] font-semibold">Logowanie</h2>
        <div v-if="errorValue?.errors?.notExist ? true : false"
          class="text-red-500 text-[14px] mb-4 mt-1 flex place-items-center gap-[6px]">
          <Icon name="ph:warning" size="20" />
          {{ errorValue?.errors?.notExist[0] }}
        </div>
        <Form @submit="login">
          <div class="flex flex-col gap-[10px] mb-6">
            <InputBase name="email" placeholder="E-mail" type="text" :hasError="errorValue?.errors?.email
              ? errorValue?.errors?.email[0]
              : errorValue?.errors?.notExist
                ? 'notShow'
                : false
              " />
            <div class="relative">
              <Icon :name="iconType" @click="changeType(loginType)"
                class="bg-transparent px-[10px] w-[50px] right-[8px] absolute z-50 top-[16px] text-[#b7b6b6] hover:text-[#5f5f5f] hover:duration-150 cursor-pointer"
                size="23" />
              <InputBase name="password" placeholder="Hasło" :type="loginType"  customType="password" :hasError="errorValue?.errors?.password
                ? errorValue?.errors?.password[0]
                : errorValue?.errors?.notExist
                  ? 'notShow'
                  : false
                " />
            </div>
            <div class="flex justify-end mt-[2px]">
              <NuxtLink to="/przypomnij-haslo" class="text-[14px] hover:text-gray-500 hover:underline text-gray-800">
                Nie pamiętam hasła
              </NuxtLink>
            </div>
          </div>
          <ButtonLoading isLoading="false" :loading="isLoadingButton" text="Zaloguj się" />
        </Form>
        <div class="flex flex-row w-full justify-start mt-9 pt-7 border-t-[1px] border-[#dddddd] gap-[6px]">
          <p class="text-[15px]">Nie masz konta?</p>
          <NuxtLink to="/rejestracja">
            <p class="text-[15px] font-medium hover:underline primary-color">Zarejestruj się</p>
          </NuxtLink>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useAuth } from "@/stores/useAuth";
import { useUser } from "@/stores/useUser"
import * as yup from "yup";
import { Form, Field, useForm, ErrorMessage, useField } from "vee-validate";
const auth = useAuth();
const userState = useUser()
const { user } = storeToRefs(userState)

definePageMeta({
  middleware: "user",
})

const { isLoadingButton, errorValue, token, loggedIn } = storeToRefs(auth);

const loginType = ref<string>("password");
const iconType = ref<string>("ph:eye");

const changeType = (typeName: string) => {
  if (typeName == "password") {
    loginType.value = "text";
    iconType.value = "ph:eye-slash";
  } else {
    loginType.value = "password";
    iconType.value = "ph:eye";
  }
};
const login = (values: any) => {
  auth.login(values.email, values.password)

  setTimeout(async () => {
    await userState.currentUser(token.value)
    userState.getUserSettings(token.value)
    await userState.userPlan(token.value)
  }, 300)

};
onMounted(() => {
  auth.nullError()
  token.value = ""
  loggedIn.value = false
});

useSeoMeta({
  title: 'Power od quiz - logowanie',
  ogTitle: 'Power od quiz - logowanie',
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
