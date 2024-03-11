<template>
  <div class="auth-background" @click="auth.nullError()">
    <div class="width-login sm:shaddow-effect">
      <h2 class="mb-[18px] text-[28px] font-semibold">Logowanie</h2>
      <p
        v-if="errorValue?.errors?.otherError ? true : false"
        class="text-red-500 text-[14px] mb-4 -mt-4"
      >
        {{ errorValue?.errors?.otherError }}
      </p>
      <Form @submit="login">
        <div class="flex flex-col gap-[16px] mb-7">
          <InputBase
            name="email"
            placeholder="E-mail"
            type="text"
            :hasError="
              errorValue?.errors?.email
                ? errorValue?.errors?.email[0]
                : errorValue?.errors?.otherError
                ? 'notShow'
                : false
            "
          />
          <div class="relative">
            <Icon
              :name="iconType"
              @click="changeType(loginType)"
              class="absolute z-50 top-[16px] right-[24px] text-[#b7b6b6] hover:text-[#878787] hover:duration-150 cursor-pointer"
              size="23"
            />
            <InputBase
              name="password"
              placeholder="Password"
              :type="loginType"
              :hasError="
                errorValue?.errors?.password
                  ? errorValue?.errors?.password[0]
                  : errorValue?.errors?.otherError
                  ? 'notShow'
                  : false
              "
            />
          </div>
          <div class="flex justify-end -mt-1">
            <NuxtLink
              to="/przypomnij-haslo"
              class="text-[13px] hover:text-gray-500 text-gray-800"
            >
              Nie pamiętam hasła
            </NuxtLink>
          </div>
        </div>
        <ButtonLoading isLoading="false" :loading="isLoadingButton" text="Zaloguj się" />
      </Form>
      <div
        class="flex sm:flex-row flex-col w-full justify-center mt-10 pt-3 border-t-[1px] border-[#E6E8EA]"
      >
        <p class="text-des mr-2">Nie masz konta?</p>
        <NuxtLink to="/rejestracja"
          ><span class="navigate">Zarejestruj się</span></NuxtLink
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as Yup from "yup";
import { Form } from "vee-validate";
import { useAuth } from "@/stores/useAuth";

definePageMeta({
  middleware: "user",
});

const auth = useAuth();

const { isLoadingButton, errorValue } = storeToRefs(auth);

const error = errorValue as any;
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
    padding: 55px;
  }
}

@media only screen and (min-width: 880px) {
  .width-login {
    position: absolute;
    width: 400px;
    background: white;
    border-radius: 16px;
    padding: 55px;
    top: 50%;
    right: 5%;
    transform: translate(-50%, -50%);
  }
}
</style>
