<template>
    <ModalUpdateSettings :modalActive="isAlert" @close="showAlert()" />
    <ModalChangeImage :modalActive="isModal" @close="isModalShow1" />
    <h2 class="text-3xl flex place-items-center font-medium cursor-default">
        Ustawienia
    </h2>
    <div class="mt-[28px]">
        <ButtonLink :array="buttonsArray" query="pageName" :isLoading="isLoadingButtonSkeleton" :n="4" />
    </div>
    <div class="flex gap-[21px]">
        <div class="w-[180px]">
            <ButtonLink :array="allButtonsArray(router.currentRoute.value.query?.pageName)" :onlyText="true" query="section"
                :n="3" :isLoading="isLoadingButtonSkeleton" />
        </div>
        <div class="w-full flex bg-white rounded-[18px] p-[30px]">
            <!-- profil -->
            <div v-if="router.currentRoute.value.query?.pageName === 'profile'" class="w-full flex-col shrink-0">
                <div v-if="router.currentRoute.value.query?.section === 'null'">
                    <div class="w-full flex mt-[12px] mb-[58px] ml-[12px] place-items-center">
                        <div class="relative mb-[8px]">
                            <SectionUserAvatar :size="87" :avatar="avatar" />
                            <div class="absolute right-0 bottom-[2px] bg-[#6b7280] w-8 h-8 rounded-full"
                                @click="isModalShow()">
                                <div class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    <Icon name="ph:camera" size="22" color="white" class="-mt-[3px]" />
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col justify-start ml-[24px]">
                            <p class="font-semibold text-[26px]">{{ user.user_name }} {{ user.user_surname }}</p>
                            <p class="text-gray-500 text-[15px]">{{ user.user_email }}</p>
                        </div>
                    </div>
                    <div class=" ml-[12px] mb-[52px] mt-6" @click="handleClick()">
                        <Form @submit="updatePersonal" :initial-values="settings.personal"
                            class=" flex gap-[16px] flex-col w-[550px]">
                            <div class="flex gap-[16px]">
                                <InputSettings name="name" placeholder="Imię" :hasError="showError?.name" />
                                <InputSettings name="surname" placeholder="Nazwisko" :hasError="showError?.surname" />
                            </div>
                            <InputSettings name="phone" placeholder="Numer telefonu" :hasError="showError?.phone" />
                            <div class="flex w-full justify-start mt-4 mb-5">
                                <div class="w-[140px]">
                                    <ButtonLoading isLoading="false" :loading="isLoadingButton" text="Gotowe" />
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
                <!-- Change email adress -->
                <div v-if="router.currentRoute.value.query?.section === 'true'" class="px-[12px]">
                    <p class="font-semibold text-[20px] mt-[14px] mb-3.5">Zmień adres e-mail</p>
                    <div class="white-retangle" @click="handleClick()">
                        <Form @submit="updatePersonal1" class=" flex gap-[16px] flex-col w-[550px]">
                            <InputSettings name="company_name" placeholder="Nowy adres e-mail"
                                :hasError="showError?.company_name || showError?.errors?.company_name?.message" />
                            <InputSettings name="nip" placeholder="Powtórz e-mail" :hasError="showError?.nip" />
                            <div class="flex w-full justify-start mt-4 mb-5">
                                <div class="w-[140px]">
                                    <ButtonLoading isLoading="false" :loading="isLoadingButton" text="Dalej" />
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
                <!-- Change current password -->
                <div v-if="router.currentRoute.value.query?.section === 'false'" class="px-[12px]">
                    <p class="font-semibold text-[20px] mt-[14px] mb-3.5">Zmień hasło</p>
                    <div class="white-retangle " @click="handleClick()">
                        <Form @submit="updatePassword" class=" flex gap-[12px] flex-col w-[550px]">
                            <InputPassword name="current_password" placeholder="Aktualne hasło"
                                :hasError="showError?.errors?.current_password ? showError?.errors?.current_password[0] : false || showError?.current_password" />
                            <InputPassword name="new_password" placeholder="Nowe hasło"
                                :hasError="showError?.errors?.new_password ? showError?.errors?.new_password[0] : false || showError?.new_password" />
                            <InputPassword name="confirm_password" placeholder="Powtórz hasło"
                                :hasError="showError?.errors?.confirm_password ? showError?.errors?.confirm_password[0] : false || showError?.confirm_password" />
                            <div class="flex w-full justify-start mt-4 mb-5">
                                <div class="w-[140px]">
                                    <ButtonLoading isLoading="false" :loading="isLoadingButtonPassword" text="Zmień" />
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
            <!-- pageName=invoices -->
            <div v-if="router.currentRoute.value.query?.pageName === 'invoices'" class="flex-col shrink-0  w-[550px]">
                <div class="white-retangle px-[21px] -mt-1" @click="handleClick()">
                    <p class="mb-6 text-[20px] font-medium">Nazwa działalności</p>
                    <Form @submit="updateCompany" :initial-values="mappedSettingsData()"
                        class=" flex gap-[10px] flex-col mt-[3px]">
                        <InputSettings name="company_name" placeholder="Nazwa działalności"
                            :hasError="showError?.company_name || showError?.errors?.company_name?.message" />
                        <div class="flex gap-[16px] mt-[7px]">
                            <InputSettings name="nip" placeholder="Numer NIP" :hasError="showError?.nip" />
                            <InputSettings name="regon" placeholder="Numer REGON"
                                :hasError="showError?.regon || showError?.errors?.regon?.message" />
                        </div>
                        <p class="mt-10 mb-1 text-[20px] font-medium">Siedziba firmy</p>
                        <div class="flex gap-[16px] mt-[7px]">

                            <InputSettings name="postcode" placeholder="Kod pocztowy"
                                :hasError="showError?.postcode || showError?.errors?.address_postcode?.message" />
                            <InputSettings name="city" placeholder="Miejscowość"
                                :hasError="showError?.city || showError?.errors?.city?.message" />

                        </div>
                        <InputSettings name="street" placeholder="Ulica"
                            :hasError="showError?.street || showError?.errors?.street?.message" />
                        <div class="flex gap-[16px] mt-[7px] w-full">
                            <InputSettings name="building_number" placeholder="Numer budynku"
                                :hasError="showError?.building_number || showError?.errors?.building_number?.message" />
                            <InputSettings name="house_number" placeholder="Numer lokalu"
                                :hasError="showError?.house_number || showError?.errors?.house_number?.message" />
                        </div>
                        <div class="flex w-full justify-start mt-4 mb-5">
                            <div class="w-[140px]">
                                <ButtonLoading isLoading="false" :loading="isLoadingButton" text="Gotowe" />
                            </div>
                        </div>
                    </Form>
                </div>
            </div>


            <!-- pageName=founds -->
            <div v-if="router.currentRoute.value.query?.pageName === 'founds'" class="flex-col shrink-0  w-[550px]">
                <div class="white-retangle px-[21px] -mt-1" @click="handleClick()">
                    <p class="mb-6 text-[20px] font-medium">Dane bankowe</p>
                    <Form @submit="updateFinancial" :initial-values="settings.financial"
                        class=" flex flex-col mt-[3px] gap-[14px]">
                        <InputSettings name="iban" placeholder="Numer IBAN"
                            :hasError="showError?.iban || showError?.errors?.iban?.message" />
                        <InputSettings name="bank_name" placeholder="Nazwa banku" :hasError="showError?.bank_name" />
                        <InputSettings name="swift" placeholder="Numer SWIFT"
                            :hasError="showError?.swift || showError?.errors?.iban?.message" />
                        <div class="flex w-full justify-start mt-4 mb-5">
                            <div class="w-[140px]">
                                <ButtonLoading isLoading="false" :loading="isLoadingButton" text="Gotowe" />
                            </div>
                        </div>
                    </Form>
                </div>
            </div>


        </div>
    </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from "pinia"
import * as yup from "yup"
import { Form } from "vee-validate"
import { useUser } from "@/stores/useUser"
const axiosInstance = useNuxtApp().$axiosInstance as any


const userState = useUser()
const { settings, user } = storeToRefs(userState) as any;


const route = useRoute()
const isLoading = ref(true)
const isLoadingButtonSkeleton = ref(true)
const router = useRouter()
const userQuizzes = ref() as any
const competitionData = ref() as any
const allPayouts = ref() as any
const isOpen = ref(false)


const showError = ref<boolean | any>(false)
const isLoadingButton = ref(false)
const isLoadingButtonPassword = ref(false)

const isWithdraw = ref(false)

const avatar = ref(user.value.avatar) as any


const handleClick = () => {
    showError.value = false
}

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

const updatePersonal1 = () => {
    console.log('test')
}

const isAlert = ref(false)
const showAlert = () => {
    isAlert.value = !isAlert.value
}

const isClose = (value: any) => {
    isOpen.value = !isOpen.value;
}
const modalWithdraw = async (value: any) => {
    isWithdraw.value = !isWithdraw.value;
}

const allButtonsArray = (routeName: any) => {
    if (routeName == 'profile') {
        return [
            {
                title: "Mój profil",
                link: `null-profile`

            },
            {
                title: "Zmiana e-mail",
                link: "true-profile"
            },
            {
                title: "Zmiana hasła",
                link: "false-profile"
            }
        ]
    }
    if (routeName == 'invoices') {
        return [
            {
                title: "Dane działalności",
                link: "null-invoices"
            },
        ]
    }
    if (routeName == 'founds') {
        return [
            {
                title: "Dane do wypłaty",
                link: "null-founds"
            }
        ]
    }
}

const buttonsArray = ref([
    {
        title: "Profil",
        link: `null-profile`
    },
    {
        title: "Dane do faktury",
        link: "null-invoices"
    },
    {
        title: "Wypłata środków",
        link: "null-founds"
    }
])



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


onMounted(async () => {

    if (route.query.pageName == undefined) {
        // console.log("route.query.pageName")
        router.push({ query: { pageName: 'profile', section: 'null' } })
    }

    setTimeout(() => {
        isLoading.value = false
        isLoadingButtonSkeleton.value = false
    }, 340)
})


</script>
<style lang="css" scoped></style>