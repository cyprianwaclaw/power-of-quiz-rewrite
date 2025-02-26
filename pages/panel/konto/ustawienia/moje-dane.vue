<template>
    <ModalUpdateSettings :modalActive="isAlert" @close="showAlert()" />
    <ModalChangeImage :modalActive="isModal" @close="isModalShow1" />
    <NuxtLayout name="account" arrowText="Ustawienia">
        <div class="w-full flex flex-col items-center mt-12 mb-10">
            <div class="relative mb-[8px]">
                <SectionUserAvatar :size="112" :avatar="avatar" />
                <div class="absolute right-0 bottom-3 bg-[#6b7280] w-8 h-8 rounded-full" @click="isModalShow()">
                    <div class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <Icon name="ph:camera" size="22" color="white" class="-mt-[3px]" />
                    </div>
                </div>
            </div>
            <p class="font-medium text-[19px] text-center  mb-4px]">{{ user.user_name }} {{ user.user_surname }}</p>
            <p class="text-gray-500 text-[14px] text-center">{{ user.user_email }}</p>
        </div>
        <div class="white-retangle px-[21px] mt-6" @click="handleClick()">
            <Form @submit="updatePersonal" :initial-values="settings.personal" class=" flex gap-[10px] flex-col mt-[3px]">
                <InputSettings name="name" placeholder="Imię" :hasError="showError?.name" />
                <InputSettings name="surname" placeholder="Nazwisko" :hasError="showError?.surname" />
                <InputSettings name="phone" placeholder="Numer telefonu" :hasError="showError?.phone" />
                <div class="flex w-full justify-end mt-4 mb-5">
                    <div class="w-[140px]">
                        <ButtonLoading isLoading="false" :loading="isLoadingButton" text="Gotowe" />
                    </div>
                </div>
            </Form>
        </div>

            <p class="font-semibold text-[20px] mt-10 mb-5">Zmień adres e-mail</p>

             <!-- <div v-if="router.currentRoute.value.query?.section === 'true'" class="px-[12px]" @click="handleClick()"> -->
                              <div class="white-retangle px-[21px]" @click="handleClick()">

                            <div v-if="!isDataChangeEmail?.success">
                                <Form @submit="sentChangeEmailCode" class=" flex gap-[10px] flex-col">
                                    <InputSettings name="new_email" placeholder="Nowy adres e-mail"
                                        :hasError="showError?.new_email ? showError?.new_email : false || isDataChangeEmailError?.message" />
                                    <InputSettings name="confirm_email" placeholder="Powtórz e-mail"
                                        :hasError="showError?.confirm_email ? showError?.confirm_email : false" />
                                    <div class="flex w-full justify-start mt-4 mb-5">
                                        <div class="w-[140px]">
                                            <ButtonLoading isLoading="false" :loading="isLoadingButtonEmail" text="Dalej" />
                                        </div>
                                    </div>
                                </Form>
                            </div>
                            <div v-else>
                                <div class=" mb-[24px] mt-[6px]">
                                    <p class="text-[15px] font-medium mr-[80px]">Wpisz kod, który został wysłany na nowy adres
                                        e-mail</p>
                                    <p class="text-[15px] mt-[10px]"
                                        :class="resentCodeText == 'Wyślij ponownie' ? ' hover:underline primary-color cursor-pointer' : ' font-medium text-[#21a67a]'"
                                        @click="resentCode()">{{ resentCodeText }}</p>
                                </div>
                                <Form @submit="changeEmail" class=" flex gap-[10px] flex-col w-[220px]">
                                    <InputSettings name="code" placeholder="Kod weryfikacyjny"
                                        :hasError="showError?.data?.messageError ? showError?.data?.messageError : false" />
                                    <div class="flex w-full justify-start mt-4 mb-5">
                                        <div class="w-[140px]">
                                            <ButtonLoading isLoading="false" :loading="isLoadingButtonEmail" text="Gotowe" />
                                        </div>
                                    </div>
                                </Form>
                            </div>
                        </div>


        <p class="font-semibold text-[20px] mt-10 mb-5">Zmień hasło</p>
        <div class="white-retangle px-[21px]" @click="handleClick()">
            <Form @submit="updatePassword" class=" flex gap-[10px] flex-col w-full">
                <InputPassword name="current_password" placeholder="Aktualne hasło"
                    :hasError="showError?.current_password ? showError?.current_password : false || showError?.data?.messageError" />
                <InputPassword name="password" placeholder="Nowe hasło"
                    :hasError="showError?.password ? showError?.password : false" />
                <InputPassword name="confirm_password" placeholder="Powtórz hasło"
                    :hasError="showError?.confirm_password ? showError?.confirm_password : false" />
                <div class="flex w-full justify-start mt-4 mb-5">
                    <div class="w-[140px]">
                        <ButtonLoading isLoading="false" :loading="isLoadingButtonPassword" text="Zmień" />
                    </div>
                </div>
            </Form>
        </div>

    </NuxtLayout>
</template>
<script lang="ts" setup>
import { storeToRefs } from "pinia"
import * as yup from "yup"
import { Form } from "vee-validate"
import { useUser } from "@/stores/useUser"
import { useAuth } from "@/stores/useAuth";
const axiosInstance = useNuxtApp().$axiosInstance as any

const auth = useAuth();
const { token } = storeToRefs(auth)
const isOpen = ref(false)
const isLoadingButton = ref(false)
const isLoadingButtonPassword = ref(false)
const isLoadingButtonEmail = ref(false)
const resentCodeText = ref("Wyślij ponownie")
const isAlert = ref(false)
const userState = useUser()
const { settings, user, changeEmailData, isDataChangeEmail, isDataChangeEmailError } = storeToRefs(userState) as any;
const showError = ref<boolean | any>(false)

const avatar = ref(user.value.avatar) as any

const isModal = ref(false)
const isModalShow = () => {
    isModal.value = !isModal.value
}

const isModalShow1 = async (value: any) => {
    isModalShow()
    if (value) {
        const formData = new FormData()
        formData.append("avatar", value)
        try {
            const res = await axiosInstance.post('/user/uploadAvatar', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
            userState.updateUserAvatarState(res.data.avatar_url);
            avatar.value = res.data.avatar_url
        } catch (error) {
            console.error('Błąd podczas przesyłania awatara:', error);
        }
    }
}

const schemaChangePassword = yup.object().shape({
    current_password: yup
        .string()
        .required("Wpisz aktualne hasło"),
    password: yup
        .string()
        .required("Wpisz nowe hasło")
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

    confirm_password: yup.string().required("Powtórz hasło").oneOf([yup.ref("password")], "Hasła nie zgadzają się"),
})



const schemaPersonal = yup.object().shape({
    name: yup
        .string()
        .test("valid-name", "Nieprawidłowe imię", (value) => {
            if (!value) return true;
            const nameRegex = /^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż\s]*$/u;
            return nameRegex.test(value);
        })
        .max(20, "Imię nie może mieć więcej niż 20 znaków"),
    surname: yup
        .string()
        .required("Nazwisko jest wymagane")
        .test("valid-surname", "Nieprawidłowe nazwisko", (value) => {
            if (!value) return false;
            const surnameRegex = /^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż\s]*$/u;
            return surnameRegex.test(value);
        })
        .max(20, "Nazwisko nie może mieć więcej niż 20 znaków"),
    phone: yup.string().test("valid-phone", "Błędny format numeru telefonu", (value) => {
        if (!value || value === "") return true;
        const phoneRegex = /^\d{9}$/;
        return phoneRegex.test(value) && parseInt(value) > 0;
    }),
});

const updatePersonal = async (values: any) => {
    handleClick()
    if (JSON.stringify(settings.value.personal) !== JSON.stringify(values)) {
        isLoadingButton.value = true
        setTimeout(async () => {
            schemaPersonal.validate(values, { abortEarly: false })
                .then(async (validData) => {
                    try {
                        const res = await axiosInstance.post('/user/settings', validData);
                        showAlert()
                        setTimeout(async () => {
                            await userState.getUserSettings()
                            await userState.login()

                        }, 120)
                    } catch (error: any) {
                        showError.value = error.response.data
                    }
                })
                .catch((err) => {
                    if (err.inner) {
                        showError.value = err.inner.reduce((acc: any, error: any) => {
                            if (!acc[error.path]) {
                                acc[error.path] = error.message
                            }
                            return acc;
                        }, {})
                    }
                });
            isLoadingButton.value = false
        }, 600)
    }

}

const updatePassword = (values: any, actions: any) => {
    isLoadingButtonPassword.value = true
    setTimeout(async () => {
        schemaChangePassword.validate(values, { abortEarly: false })
            .then(async (validData) => {
                try {
                    const res = await axiosInstance.post('/change-password', validData);
                    showAlert()
                    actions.setValues({
                        current_password: '',
                        password: '',
                        confirm_password: ''
                    })
                } catch (error: any) {
                    showError.value = error.response
                }
            })
            .catch((err) => {
                if (err.inner) {
                    showError.value = err.inner.reduce((acc: any, error: any) => {
                        if (!acc[error.path]) {
                            acc[error.path] = error.message
                        }
                        return acc;
                    }, {})
                }
            });
        isLoadingButtonPassword.value = false
    }, 600)
}

const schemaChangeEmail = yup.object().shape({

    new_email: yup.string().required("Wpisz nowy adres e-mail").test("valid-email", "Nieprawidłowy adres e-mail", (value) => {
        if (!value || value === "") return true;
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        return emailRegex.test(value);
    }),
    confirm_email: yup.string().required("Powtórz adres e-mail").oneOf([yup.ref("new_email")], "E-mail nie są identyczne"),
})

const sentChangeEmailCode = (values: any, actions: any) => {
    isLoadingButtonEmail.value = true
    setTimeout(async () => {
        schemaChangeEmail.validate(values, { abortEarly: false })
            .then(async (validData) => {
                isLoadingButtonEmail.value = true
                await userState.sendNewCodeChangeEmail("change-email", "109|s9RcTMlSb3j8GKAqr5uWhrLbL1gKiRUzKrH04IRN", validData?.new_email)
                changeEmailData.value = validData?.new_email
                isLoadingButtonEmail.value = false
            })
            .catch((err) => {
                if (err.inner) {
                    showError.value = err.inner.reduce((acc: any, error: any) => {
                        if (!acc[error.path]) {
                            acc[error.path] = error.message
                        }
                        return acc;
                    }, {})
                }
            });
        isLoadingButtonEmail.value = false
    }, 600)
}


const resentCode = async () => {
    resentCodeText.value = "Wysłano"
    await userState.sendNewCodeChangeEmail("change-email", token.value, changeEmailData.value)
    setTimeout(() => {
        resentCodeText.value = "Wyślij ponownie"
    }, 1600)
}

const changeEmail = async (values: any) => {

    try {
        const res = await axiosInstance.post('/change-email', {
            new_email: changeEmailData.value,
            confirm_email: changeEmailData.value,
            code: values.code,
        })
        showAlert()
        await userState.currentUser(token.value)
        isDataChangeEmail.value = null
        changeEmailData.value = null
        isDataChangeEmailError.value = null

    } catch (error: any) {
        showError.value = error.response
    }
}


const handleClick = () => {
    showError.value = false
    isDataChangeEmailError.value = null
}

const showAlert = () => {
    isAlert.value = !isAlert.value
}
const isClick = () => {
    isOpen.value = !isOpen.value
}


onMounted(async () => {
     isDataChangeEmail.value = null
    changeEmailData.value = null
    isDataChangeEmailError.value = null
})

definePageMeta({
    middleware: "auth",
})

useSeoMeta({
    title: 'Ustawienia - moje dane',
    ogTitle: 'Ustawienia - moje dane',
    twitterCard: 'summary_large_image',
})

</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";

.image {
    border: 1px solid $border;
    border-radius: 12px;
    margin-bottom: 32px;
    margin-top: 22px;
    object-fit: cover;
    width: 100%;
    height: 220px;

    @media only screen and (min-width: 640px) {
        height: 100%;
    }
}

.is-loading {

    .image {
        background: linear-gradient(110deg, #c7c7c7 8%, #d4d4d4 18%, #c7c7c7 33%);
        border-radius: 12px;
        background-size: 300% 100%;
        animation: 1.6s shine linear infinite;
    }

    .image {
        border-radius: 12px;
        width: 100%;
        height: 220px;

        @media only screen and (min-width: 640px) {
            height: 538px;
        }
    }
}

@keyframes shine {
    to {
        background-position-x: -200%;
    }
}
</style>
