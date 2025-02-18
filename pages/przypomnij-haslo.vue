<template>
  <NuxtLayout name="auth">
    <div class="auth-background" @click="auth.nullError()">
      <div class="width-login sm:shaddow-effect">
        <h2 class="mb-[19px] text-[28px] font-semibold">Przypomnij hasło</h2>
        <div v-if="errorValue?.errors?.notExist ? true : false"
          class="text-red-500 text-[14px] mb-4 mt-1 flex place-items-center gap-[6px]">
          <Icon name="ph:warning" size="20" />
          {{ errorValue?.errors?.notExist[0] }}
        </div>
        <Form @submit="login" class="mt-7">
          <div class="flex flex-col gap-[10px] mb-6">
            <InputBase name="email" placeholder="E-mail" type="text" :hasError="errorValue?.errors?.email
              ? errorValue?.errors?.email[0]
              : errorValue?.errors?.notExist
                ? 'notShow'
                : false
              " />
            <!-- <div class="relative">
              <Icon :name="iconType" @click="changeType(loginType)"
                class="bg-white px-[10px] w-[50px] right-[8px] absolute z-50 top-[20px] text-[#b7b6b6] hover:text-[#5f5f5f] hover:duration-150 cursor-pointer"
                size="23" />
              <InputBase name="password" placeholder="Hasło" :type="loginType" :hasError="errorValue?.errors?.password
                ? errorValue?.errors?.password[0]
                : errorValue?.errors?.notExist
                  ? 'notShow'
                  : false
                " />
            </div> -->
          </div>
          <ButtonLoading isLoading="false" :loading="isLoadingButton" text="Dalej" />
        </Form>
        <div class="flex sm:flex-row flex-col w-full justify-start mt-12 pt-8 border-t-[1px] border-[#dddddd] gap-[6px]">
          <p class="text-[15px]">Nie masz konta?</p>
          <NuxtLink to="/rejestracja">
            <p class="text-[15px] font-medium hover:underline primary-color">Zarejestruj się</p>
          </NuxtLink> 
        </div>
        <div class="flex sm:flex-row flex-col w-full justify-start mt-2 gap-[6px]">
                   <p class="text-[15px]">Masz już konto?</p>
              <NuxtLink to="/">
                <p class="text-[15px] font-medium hover:underline primary-color">Zaloguj się</p>
              </NuxtLink>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import * as Yup from "yup";
import { Form } from "vee-validate";
import { useAuth } from "@/stores/useAuth";

definePageMeta({
  middleware: "user",
});

const auth = useAuth();

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
  auth.login(values.email, values.password);
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
    padding: 55px;
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
