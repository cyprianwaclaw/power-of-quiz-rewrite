<template>
  <NuxtLayout name="auth">
    <div  @click="auth.nullError()" class="auth-background">
      <div class="width-login">
        <div v-if="router.currentRoute.value.query?.email && router.currentRoute.value.query?.verification_code">
            <Icon name="ph:check-circle-light" size="75" class="green"/>
            <p class="text-[22px] font-semibold mt-[8px]">Adres e-mail potwierdzony</p>
            <p class="mt-[3px]">Za chwile zostaniesz przekierowany na strone główną</p>
            <div class="w-[160px] mt-[21px]">
              <NuxtLink to="/"><p class="button-primary">Strona główna</p></NuxtLink>
            </div>
            <!-- test1.png -->
          </div>
          <!-- fixed -->
          <div v-else>
            <div v-if="loggedIn || token?.length ? false : true">
              <h2 class="mb-[19px] text-[28px] font-semibold">Rejestracja</h2>
            <Form @submit="registerUser" @click="auth.nullError()" :validation-schema="schema"
              v-slot="{ meta, values, errors }">
              <div class="flex flex-col sm:gap-[10px] md:mb-7 mb-4">
                <div class="sm:flex gap-[10px]">
                  <InputBase name="name" placeholder="Imię" type="text" :hasError="errors?.name" class="mb-3 md:mb-0" />
                  <InputBase name="surname" placeholder="Nazwisko" type="text" class="mb-3 md:mb-0"
                    :hasError="errors?.surname" />
                </div>
                <InputBase name="email" placeholder="E-mail" type="text" class="mb-3 md:mb-0"
                  :hasError="errors?.email || errorValue?.errors?.email[0]" />
                <InputBase name="confirmEmail" placeholder="Potwierdz  e-mail" type="text" class="mb-3 md:mb-0"
                  :hasError="errors?.confirmEmail" />
                <div class="sm:flex gap-[10px]">
                  <div class="relative w-full">
                    <Icon :name="iconTypePassword" @click="changeType('password')"
                      class=" bg-transparent px-[10px] w-[50px] right-[8px] top-[16px] absolute z-50  text-[#b7b6b6] hover:text-[#5f5f5f] hover:duration-150 cursor-pointer"
                      size="23" />
                    <InputBase name="password" placeholder="Hasło" :type="typePassword" :hasError="errors?.password" customType="password"
                      class="mb-3 md:mb-0" />
                  </div>
                  <div class="relative w-full">
                    <Icon :name="iconTypeConfirmPassword" @click="changeType('confirmPassword')"
                      class=" bg-transparent px-[10px] w-[50px] right-[8px] top-[16px] absolute z-50  text-[#b7b6b6] hover:text-[#5f5f5f] hover:duration-150 cursor-pointer"
                      size="23" />
                    <InputBase name="confirmPassword" placeholder="Potwierdz hasło" :type="typeConfirmPassword"  customType="password"
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
                !values.surname ||
                values.surname.length === 0 ||
                !values.email ||
                values.email.length === 0 ||
                !values.confirmEmail ||
                values.confirmEmail.length === 0 ||
                !values.confirmPassword ||
                values.confirmPassword.length === 0
                " isLoading="false" :loading="isLoadingButton" text="Potwierdź adres e-mail" />
            </Form>
            <div
              class="flex flex-row  w-full justify-start mt-9 pt-7 border-t-[1px] border-[#dddddd] gap-[6px]">
              <p class="text-[15px]">Masz już konto?</p>
              <NuxtLink to="/">
                <p class="text-[15px] font-medium hover:underline primary-color">Zaloguj się</p>
              </NuxtLink>
            </div>
          </div>
          <div v-else>
            <div class="flex w-full justify-between">
              <p class="text-[17px] font-medium w-[300px]">Wpisz kod, który został wysłany na Twój adres e-mail</p>
              <p class="text-[15px]"
                :class="resentCodeText == 'Wyślij ponownie' ? ' hover:underline primary-color cursor-pointer' : ' font-medium text-[#21a67a]'"
                @click="resentCode()">{{ resentCodeText }}</p>
            </div>
            <Form @submit="verifyEmailAddress" @click="auth.nullError()" class="mt-6">
              <div class="flex flex-col sm:gap-[10px] mb-7 w-[220px]">
                <InputBase name="code" placeholder="Kod weryfikacyjny" type="text" :hasError="errorValue?.message" />
              </div>
              <ButtonLoading :disable="false" isLoading="false" :loading="isLoadingButton" text="Gotowe" />
            </Form>
          </div>
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
});

const { isLoadingButton, errorValue, token, loggedIn, email } = storeToRefs(auth)
const isQueryVerify = ref(false)
const resentCodeText = ref("Wyślij ponownie")
const router = useRouter()
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
  name: yup.string()
    .test("valid-name", "Nieprawidłowe imię", (value) => {
      if (!value) return true;
      const nameRegex = /^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż\s]*$/u;
      return nameRegex.test(value);
    })
    .max(20, "Imię nie może mieć więcej niż 20 znaków"),
  surname: yup.string()
    .test("valid-name", "Nieprawidłowe nazwisko", (value) => {
      if (!value) return true;
      const nameRegex = /^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż\s]*$/u;
      return nameRegex.test(value);
    }),
  email: yup.string().test("valid-email", "Nieprawidłowy adres e-mail", (value) => {
    if (!value || value === "") return true;
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(value);
  }),
  confirmEmail: yup.string().oneOf([yup.ref("email")], "E-mail nie są identyczne"),
  password: yup
    .string()
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

  confirmPassword: yup.string().oneOf([yup.ref("password")], "Hasła nie są identyczne"),
});

const registerUser = async (values: any) => {
  await auth.register(
    values.name,
    values.surname,
    values.email,
    values.confirmEmail,
    values.password,
    values.confirmPassword
  )

}

const verifyEmailAddress = async (values: any) => {
  try {
    await auth.verifyEmail(values.code, null)

    setTimeout(async () => {
      await userState.currentUser(token.value)
      await userState.getUserSettings(token.value)
      await userState.userPlan(token.value)
      window.location.reload()
      router.push("/panel")
    }, 300)
  } catch (error) {
    console.error("Błąd podczas weryfikacji e-maila:", error)
  }
}

const resentCode = async () => {
  resentCodeText.value = "Wysłano"
  await auth.sendNewCode("rejestracja")
  setTimeout(() => {
    resentCodeText.value = "Wyślij ponownie"
  }, 1600)
}

onMounted(async () => {
  auth.nullError()
  if (router.currentRoute.value.query.email && router.currentRoute.value.query.verification_code) {
    await auth.verifyEmail(router.currentRoute.value.query.verification_code, router.currentRoute.value.query.email)
    setTimeout(async () => {
      await userState.currentUser(token.value)
      await userState.getUserSettings(token.value)
      await userState.userPlan(token.value)
    }, 200)
    setTimeout(async () => {
      router.push("/panel")
    }, 600)
  }
})
useSeoMeta({
  title: 'Power of quiz - rejestracja',
  ogTitle: 'Power of quiz - rejestracja',
  twitterCard: 'summary_large_image',
})

</script>
<style scoped lang="scss">
@import "@/assets/style/variables.scss";

@media only screen and (max-width: 880px) {
  .width-login {
    max-width: 500px;
    // position: relative;
    margin-top: 300px;
    margin-bottom: 300px;
    margin: 0 auto;
    // margin-top: 320px !important;
    // top: 1000%;
    // left: 50%;
    // width: 84%;
    // transform: translate(-50%, -50%);
    background: white;
    border-radius: 16px;
    padding: 35px;
  }
}

@media only screen and (min-width: 880px) {
  .width-login {
    position: absolute;
    width: 520px;
    background: white;
    border-radius: 16px;
    padding: 46px;
    top: 50%;
    right: 0%;
    transform: translate(-50%, -50%);
  }
}
</style>
