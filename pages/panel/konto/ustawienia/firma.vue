<template>
    <ModalUpdateSettings :modalActive="isAlert" @close="showAlert()" />
    <NuxtLayout name="account" arrowText="Ustawienia" title="Dane do faktury">
        <div class="white-retangle px-[21px] mt-6" @click="handleClick()">
            <Form @submit="updateCompany" :initial-values="mappedSettingsData()" class=" flex gap-[10px] flex-col mt-[3px]">
                <InputSettings name="company_name" placeholder="Nazwa działalności"
                    :hasError="showError?.company_name || showError?.errors?.company_name?.message" />
                <InputSettings name="nip" placeholder="Numer NIP" :hasError="showError?.nip" />
                <InputSettings name="regon" placeholder="Numer REGON"
                    :hasError="showError?.regon || showError?.errors?.regon?.message" />
                <p class="mt-6 mb-1 text-[17px] font-medium">Siedziba firmy</p>
                <InputSettings name="postcode" placeholder="Kod pocztowy"
                    :hasError="showError?.postcode || showError?.errors?.address_postcode?.message" />
                <InputSettings name="city" placeholder="Miejscowość"
                    :hasError="showError?.city || showError?.errors?.city?.message" />
                <InputSettings name="street" placeholder="Ulica"
                    :hasError="showError?.street || showError?.errors?.street?.message" />
                <InputSettings name="building_number" placeholder="Numer budynku"
                    :hasError="showError?.building_number || showError?.errors?.building_number?.message" />
                <InputSettings name="house_number" placeholder="Numer lokalu"
                    :hasError="showError?.house_number || showError?.errors?.house_number?.message" />
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
const userState = useUser()
const { settings } = storeToRefs(userState) as any;
const showError = ref<boolean | any>(false)

const mappedSettingsData = () => {
    return {
        "company_name": settings.value.company.name,
        "nip": settings.value.company.nip,
        "regon": settings.value.company.regon,
        "postcode": settings.value.company.address.postcode,
        "city": settings.value.company.address.city,
        "street": settings.value.company.address.street,
        "building_number": settings.value.company.address.building_number,
        "house_number": settings.value.company.address.house_number,

    }
}

const schemaCompany = yup.object().shape({
    company_name: yup
        .string()
        .test("valid-name", "Nieprawidłowa nazwa działalności", (value) => {
            if (!value) return true;
            const nameRegex = /^[A-ZĄĆĘŁŃÓŚŹŻ][a-zA-ZĄĆĘŁŃÓŚŹŻąćęłńóśźż0-9\s]*$/u;
            return nameRegex.test(value);
        })
        .max(100, "Nazwa działalności nie może mieć więcej niż 100 znaków")
        .required("Pole wymagane"),
    nip: yup
        .string()
        .matches(/^[0-9 ]*$/, "Dozwolone tylko cyfry")
        .min(10, "NIP ma 10 cyfr")
        .max(10, "NIP ma 10 cyfr")
        .required("Pole wymagane"),
    regon: yup
        .string()
        .required("Pole wymagane")
        .matches(/^[0-9 ]*$/, "Dozwolone tylko cyfry")
        .min(9, "REGON ma 9 cyfr")
        .max(9, "REGON ma 9 cyfr"),
    postcode: yup
        .string()
        .test("valid-name", "Nieprawidłowy kod pocztowy", (value) => {
            if (!value) return true;
            const nameRegex = /^[0-9]{2}-[0-9]{3}$/;
            return nameRegex.test(value);
        })
        .required("Pole wymagane"),
    street: yup.string().required("Pole wymagane").test("valid-name", "Nieprawidłowa nazwa ulicy", (value) => {
        if (!value) return true;
        const nameRegex = /^[A-ZĄĆĘŁŃÓŚŹŻ0-9][a-zA-ZĄĆĘŁŃÓŚŹŻąćęłńóśźż0-9\s]*$/u;
        return nameRegex.test(value);
    }),
    city: yup
        .string()
        .test("valid-name", "Nieprawidłowa nazwa miejscowości", (value) => {
            if (!value) return true;
            const nameRegex = /^[A-ZĄĆĘŁŃÓŚŹŻ][a-zA-ZĄĆĘŁŃÓŚŹŻąćęłńóśźż\s]*$/u;
            return nameRegex.test(value);
        })
        .required("Pole wymagane")
        .max(20, "Nazwa miescowości nie może mieć więcej niż 20 znaków"),
    building_number: yup.string().required("Pole wymagane"),
    // house_number: yup
});

const updateCompany = async (values: any) => {
    handleClick()
    if (JSON.stringify(settings.value.company) !== JSON.stringify(values)) {
        isLoadingButton.value = true
        setTimeout(async () => {
            schemaCompany.validate(values, { abortEarly: false })
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
