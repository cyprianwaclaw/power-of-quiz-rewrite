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
        <div class="white-retangle px-[21px]" @click="handleClick()">
            <Form @submit="updatePersonal1" class=" flex gap-[10px] flex-col mt-[3px]">
                <InputSettings name="company_name" placeholder="Nowy adres e-mail"
                    :hasError="showError?.company_name || showError?.errors?.company_name?.message" />
                <InputSettings name="nip" placeholder="Powtórz e-mail" :hasError="showError?.nip" />
                <div class="flex w-full justify-end mt-4 mb-5">
                    <div class="w-[140px]">
                        <ButtonLoading isLoading="false" :loading="isLoadingButton" text="Dalej" />
                    </div>
                </div>
            </Form>
        </div>
        <p class="font-semibold text-[20px] mt-10 mb-5">Zmień hasło</p>
        <div class="white-retangle px-[21px]" @click="handleClick()">
            <Form @submit="updatePassword" class=" flex gap-[10px] flex-col mt-[3px]">
                <InputPassword name="current_password" placeholder="Aktualne hasło"
                    :hasError="showError?.errors?.current_password ? showError?.errors?.current_password[0] : false || showError?.current_password" />
                <InputPassword name="new_password" placeholder="Nowe hasło"
                    :hasError="showError?.errors?.new_password ? showError?.errors?.new_password[0] : false || showError?.new_password" />
                <InputPassword name="confirm_password" placeholder="Powtórz hasło"
                    :hasError="showError?.errors?.confirm_password ? showError?.errors?.confirm_password[0] : false || showError?.confirm_password" />
                <div class="flex w-full justify-end mt-4 mb-5">
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
const axiosInstance = useNuxtApp().$axiosInstance as any

const isOpen = ref(false)
const isLoadingButton = ref(false)
const isLoadingButtonPassword = ref(false)
const isAlert = ref(false)
const userState = useUser()
const { settings, user } = storeToRefs(userState) as any;
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
    new_password: yup
        .string()
        .required("Wpisz nowe hasło")
        .test("valid-password", "Nieprawidłowe hasło", (value) => {
            if (!value || value === "") return true;
            if (!/[a-z]/.test(value)) {
                throw new yup.ValidationError(
                    "Hasło musi zawierać co najmniej jedną małą literę.",
                    null,
                    "new_password"
                );
            }
            if (!/[A-Z]/.test(value)) {
                throw new yup.ValidationError(
                    "Hasło musi zawierać co najmniej jedną dużą literę.",
                    null,
                    "new_password"
                );
            }
            if (!/\d/.test(value)) {
                throw new yup.ValidationError(
                    "Hasło musi zawierać co najmniej jedną cyfrę.",
                    null,
                    "new_password"
                );
            }
            if (!/[ @$\\!%*?&()#<>^\-_=+;:"/'|[\]{}]/.test(value)) {
                throw new yup.ValidationError(
                    "Hasło musi zawierać co najmniej jeden znak specjalny.",
                    null,
                    "new_password"
                );
            }

            return true;
        })
        .max(20, "Hasło nie może mieć więcej niż 20 znaków"),

    confirm_password: yup.string().required("Powtórz hasło").oneOf([yup.ref("new_password")], "Hasła nie zgadzają się"),
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
    // user_email: yup.string().test("valid-email", "Nieprawidłowy adres e-mail", (value) => {
    //     // if (!value) return false;
    //     if (!value || value === "") return true;
    //     const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    //     return emailRegex.test(value);
    // }),
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
                    const res = await axiosInstance.post('/user/settings/password', validData);
                    showAlert()
                    actions.setValues({
                        current_password: '',
                        new_password: '',
                        confirm_password: ''
                    })
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
        isLoadingButtonPassword.value = false
    }, 600)
}

const updatePersonal1 = () => {
    console.log('test')
}

const handleClick = () => {
    showError.value = false
}
const showAlert = () => {
    isAlert.value = !isAlert.value
}
const isClick = () => {
    isOpen.value = !isOpen.value
}

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
