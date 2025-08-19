<template>
    <ModalUpdateSettings :modalActive="isAlert" @close="showAlert()" />
    <ModalChangeImage :modalActive="isModal" @close="isModalShow1" />
    <h2 class="text-3xl flex place-items-center font-medium cursor-default select-none">
        Ustawienia
    </h2>
    <div class="mt-[28px]">
        <ButtonLink :array="buttonsArray" query="pageName" :isLoading="isLoadingButtonSkeleton" :n="4" />
    </div>
    <div class="flex gap-[21px] select-none">
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
                            class=" flex gap-[10px] flex-col w-[550px]">
                            <div class="flex gap-[10px]">
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
                <div v-if="router.currentRoute.value.query?.section === 'true'" class="px-[12px]" @click="handleClick()">
                    <p class="font-semibold text-[20px] mt-[12px] mb-2">Zmień adres e-mail</p>
                    <div class="white-retangle">
                        <div v-if="!isDataChangeEmail?.success">
                            <Form @submit="sentChangeEmailCode" class=" flex gap-[10px] flex-col w-[550px]">
                                <InputSettings name="new_email" placeholder="Nowy adres e-mail"
                                    :hasError="showError?.new_email ? showError?.new_email : false || isDataChangeEmailError?.message" />
                                <InputSettings name="confirm_email" placeholder="Powtórz e-mail"
                                    :hasError="showError?.confirm_email ? showError?.confirm_email : false" />
                                <div class="flex w-full justify-start mt-4 mb-5">
                                    <div class="w-[140px]">
                                        <ButtonLoading isLoading="false" :loading="isLoadingButton" text="Dalej" />
                                    </div>
                                </div>
                            </Form>
                        </div>
                        <div v-else>
                            <div class="flex w-[500px] justify-between mb-[24px] -mt-[6px]">
                                <p class="text-[16px] font-medium w-[300px]">Wpisz kod, który został wysłany na nowy adres
                                    e-mail</p>
                                <p class="text-[15px]"
                                    :class="resentCodeText == 'Wyślij ponownie' ? ' hover:underline primary-color cursor-pointer' : ' font-medium text-[#21a67a]'"
                                    @click="resentCode()">{{ resentCodeText }}</p>
                            </div>
                            <Form @submit="changeEmail" class=" flex gap-[10px] flex-col w-[220px]">
                                <InputSettings name="code" placeholder="Kod weryfikacyjny"
                                    :hasError="showError?.data?.messageError ? showError?.data?.messageError : false" />
                                <div class="flex w-full justify-start mt-4 mb-5">
                                    <div class="w-[140px]">
                                        <ButtonLoading isLoading="false" :loading="isLoadingButton" text="Gotowe" />
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>


                <!-- Change current password -->
                <div v-if="router.currentRoute.value.query?.section === 'false'" class="px-[12px]" @click="handleClick">
                    <p class="font-semibold text-[20px] mt-[14px] mb-2">Zmień hasło</p>
                    <div class="white-retangle " @click="handleClick()">
                        <Form @submit="updatePassword" class=" flex gap-[10px] flex-col w-[550px]">
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
                        <div class="flex gap-[10px]">
                            <InputSettings name="nip" placeholder="Numer NIP" :hasError="showError?.nip" />
                            <InputSettings name="regon" placeholder="Numer REGON"
                                :hasError="showError?.regon || showError?.errors?.regon?.message" />
                        </div>
                        <p class="mt-10 mb-1 text-[20px] font-medium">Siedziba firmy</p>
                        <div class="flex gap-[10px] mt-[7px]">

                            <InputSettings name="postcode" placeholder="Kod pocztowy"
                                :hasError="showError?.postcode || showError?.errors?.address_postcode?.message" />
                            <InputSettings name="city" placeholder="Miejscowość"
                                :hasError="showError?.city || showError?.errors?.city?.message" />

                        </div>
                        <InputSettings name="street" placeholder="Ulica"
                            :hasError="showError?.street || showError?.errors?.street?.message" />
                        <div class="flex gap-[10px]  w-full">
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
                        class=" flex flex-col mt-[3px] gap-[10px]">
                        <InputSettings name="iban" placeholder="Numer konta"
                            :hasError="showError?.iban || showError?.errors?.iban?.message" />
                        <!-- <InputSettings name="bank_name" placeholder="Nazwa banku" :hasError="showError?.bank_name" /> -->
                        <!-- <InputSettings name="swift" placeholder="Numer SWIFT"
                           :hasError="showError?.swift || showError?.errors?.swift?.message" /> -->
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
import { useAuth } from "@/stores/useAuth";
import { useUser } from "@/stores/useUser"
import * as yup from "yup";
import { Form, Field, useForm, ErrorMessage, useField } from "vee-validate";
const auth = useAuth();
const { token } = storeToRefs(auth)
const axiosInstance = useNuxtApp().$axiosInstance as any

const userState = useUser()
const { settings, user, changeEmailData, isDataChangeEmail, isDataChangeEmailError } = storeToRefs(userState) as any;

const cookie = useCookie("auth") as any

userState.getUserSettings(cookie.value?.token);

const route = useRoute()
const isLoading = ref(true)
const isLoadingButtonSkeleton = ref(true)
const resentCodeText = ref("Wyślij ponownie")
const router = useRouter()
const userQuizzes = ref() as any
// const competitionData = ref() as any
const allPayouts = ref() as any
const isOpen = ref(false)


const showError = ref<boolean | any>(false)
const isLoadingButton = ref(false)
const isLoadingButtonPassword = ref(false)

const isWithdraw = ref(false)

const avatar = ref(user.value.avatar) as any


const handleClick = () => {
    showError.value = false
    isDataChangeEmailError.value = null

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
                            await userState.getUserSettings(token)
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
const schemaChangeEmail = yup.object().shape({

    new_email: yup.string().required("Wpisz nowy adres e-mail").test("valid-email", "Nieprawidłowy adres e-mail", (value) => {
        if (!value || value === "") return true;
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        return emailRegex.test(value);
    }),
    confirm_email: yup.string().required("Powtórz adres e-mail").oneOf([yup.ref("new_email")], "E-mail nie są identyczne"),
})


const sentChangeEmailCode = (values: any, actions: any) => {
    isLoadingButton.value = true
    setTimeout(async () => {
        schemaChangeEmail.validate(values, { abortEarly: false })
            .then(async (validData) => {
                isLoadingButton.value = true
                await userState.sendNewCodeChangeEmail("change-email", token.value, validData?.new_email)
                changeEmailData.value = validData?.new_email
                isLoadingButton.value = false
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

const mappedSettingsData = () => {
    return {
        "company_name": settings.value?.company?.name,
        "nip": settings.value?.company?.nip,
        "regon": settings.value?.company?.regon,
        "postcode": settings.value?.company?.address?.postcode,
        "city": settings.value?.company?.address?.city,
        "street": settings.value?.company?.address?.street,
        "building_number": settings.value?.company?.address?.building_number,
        "house_number": settings.value?.company?.address?.house_number,
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
})

const updateCompany = async (values: any) => {
    handleClick()
    if (JSON.stringify(settings.value.company) !== JSON.stringify(values)) {
        isLoadingButton.value = true
        setTimeout(async () => {
            schemaCompany.validate(values, { abortEarly: false })
                .then(async (validData) => {
                    try {
                        const res = await axiosInstance.post('/user/settings', validData,
                            {
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Accept': 'application/json',
                                    Authorization: `Bearer ${token.value}`,
                                },
                            });
                        showAlert()
                        setTimeout(async () => {
                            await userState.getUserSettings(token)
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
    // bank_name: yup
    //     .string()
    //     .test("valid-name", "Nieprawidłowa nazwa banku", (value) => {
    //         if (!value) return true;
    //         const nameRegex = /^[A-ZĄĆĘŁŃÓŚŹŻ0-9][a-zA-ZĄĆĘŁŃÓŚŹŻąćęłńóśźż0-9\s]*$/u;
    //         return nameRegex.test(value);
    //     })
    //     .required("Pole wymagane"),
    iban: yup
        .string()
        .test("valid-account", "Nieprawidłowy numer konta", (value) => {
            if (!value || value === "") return true;
            const polishAccountRegex = /^\d{26}$/; // tylko 26 cyfr
            return polishAccountRegex.test(value);
        })
        .required("Pole wymagane"),
    // swift: yup
    //     .string()
    //     .test("valid-swift", "Nieprawidłowy numer SWIFT", (value) => {
    //         if (!value || value === "") return true;
    //         const swiftRegex = /^[A-Z]{2}[A-Z0-9]{4}([A-Z0-9]{2})?$/;
    //         return swiftRegex.test(value);
    //     })
    //     .required("Pole wymagane"),
})

const updateFinancial = async (values: any) => {
    handleClick()
    if (JSON.stringify(settings.value.financial) !== JSON.stringify(values)) {
        isLoadingButton.value = true
        setTimeout(async () => {
            schemaFinancial.validate(values, { abortEarly: false })
                .then(async (validData) => {
                    try {
                        const res = await axiosInstance.post('/user/settings', validData,
                            {
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Accept': 'application/json',
                                    Authorization: `Bearer ${token.value}`,
                                },
                            }
                        );
                        showAlert()
                        setTimeout(async () => {
                            await userState.getUserSettings(token.value)
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
    isDataChangeEmail.value = null
    changeEmailData.value = null
    isDataChangeEmailError.value = null

    if (route.query.pageName == undefined) {
        router.push({ query: { pageName: 'profile', section: 'null' } })
    }

    isLoading.value = false
    isLoadingButtonSkeleton.value = false
})


</script>
<style lang="css" scoped></style>