<template>
    <ModalUpdateSettings :modalActive="isAlert" @close="showAlert()" />

    <NuxtLayout name="account" arrowText="Ustawienia" title="Dane bankowe do wypłaty środków">
        <div class="white-retangle px-[21px] mt-6" @click="handleClick()">
            <Form @submit="updateFinancial" :initial-values="settings.financial" class=" flex gap-[10px] flex-col">
                <InputSettings name="iban" placeholder="Numer IBAN"
                    :hasError="showError?.iban || showError?.errors?.iban?.message" />
                <InputSettings name="bank_name" placeholder="Nazwa banku" :hasError="showError?.bank_name" />
                <InputSettings name="swift" placeholder="Numer SWIFT"
                    :hasError="showError?.swift || showError?.errors?.iban?.message" />
                <div class="flex w-full justify-end mt-4 mb-5">
                    <div class="w-[140px]">
                        <ButtonLoading isLoading="false" :loading="isLoadingButton" text="Gotowe" />
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

const isLoadingButton = ref(false)
const isAlert = ref(false)
const userState = useUser();
const { settings } = storeToRefs(userState);
const showError = ref<boolean | any>(false)


const schemaFinancial = yup.object().shape({
    bank_name: yup
        .string()
        .test("valid-name", "Nieprawidłowa nazwa banku", (value) => {
            if (!value) return true;
            const nameRegex = /^[A-ZĄĆĘŁŃÓŚŹŻ0-9][a-zA-ZĄĆĘŁŃÓŚŹŻąćęłńóśźż0-9\s]*$/u;
            return nameRegex.test(value);
        })
        .required("Pole wymagane"),
    iban: yup
        .string()
        .test("valid-iban", "Nieprawidłowy numer IBAN", (value) => {
            if (!value || value === "") return true;
            const polishIbanRegex = /^[A-Z]{2}\d{26}$/;
            return polishIbanRegex.test(value);
        })
        .required("Pole wymagane"),
    swift: yup
        .string()
        .test("valid-swift", "Nieprawidłowy numer SWIFT", (value) => {
            if (!value || value === "") return true;
            const swiftRegex = /^[A-Z]{2}[A-Z0-9]{4}([A-Z0-9]{2})?$/;
            return swiftRegex.test(value);
        })
        .required("Pole wymagane"),
})

const updateFinancial = async (values: any) => {
    handleClick()
    if (JSON.stringify(settings.value.financial) !== JSON.stringify(values)) {
        isLoadingButton.value = true
        setTimeout(async () => {
            schemaFinancial.validate(values, { abortEarly: false })
                .then(async (validData) => {
                    try {
                        const res = await axiosInstance.post('/user/settings', validData);
                        showAlert()
                        setTimeout(async () => {
                            await userState.getUserSettings()
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

const handleClick = () => {
    showError.value = false
}
const showAlert = () => {
    isAlert.value = !isAlert.value
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
