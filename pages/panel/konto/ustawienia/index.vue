<template>
    <div class="hidden md:flex flex-col">
        <SectionPageElementsUserSettingsDesktop />
    </div>
    <div class="md:hidden flex flex-col">
        <NuxtLayout name="account" arrowText="Twoje konto" title="Ustawienia">
            <div class="white-retangle">
                <NuxtLink to="/panel/konto/ustawienia/moje-dane">
                    <div class="row-table-end flex place-items-center justify-between">
                        <div class="flex place-items-center mb-3 gap-[12px]">
                            <SectionUserAvatar :size="52" :avatar="user?.avatar" />
                            <div class="flex flex-col">
                                <p class="font-semibold text-[17px]">{{ user?.user_name }} {{ user?.user_surname }}</p>
                                <p class=" text-gray-500 text-[14px]">{{ user?.user_email }}</p>
                            </div>
                        </div>
                        <Icon name="ph:caret-right-light" size="20" class="text-gray mb-2" />
                    </div>
                </NuxtLink>
            </div>
            <p class="text-[20px] font-medium mt-9 mb-4">Dane do faktury</p>
            <div class="white-retangle">
                <div class="row-table-start flex place-items-center justify-between">
                    <div class="flex flex-col">
                        <p class="text-gray-500 text-[13px]">NIP</p>
                        <p class="font-semibold text-[16px]">{{ settings?.company?.nip ? settings?.company?.nip : 'Brak' }}
                        </p>
                    </div>
                </div>
                <div class="row-table-start flex place-items-center justify-between">
                    <div class="flex flex-col">
                        <p class=" text-gray-500 text-[13px]">Nazwa działalności</p>
                        <p class="font-semibold text-[16px]">{{ truncateText(settings?.company?.name ?
                            settings?.company?.name :
                            'Brak', 34) }}</p>
                    </div>
                </div>
                <NuxtLink to="/panel/konto/ustawienia/firma">
                    <div class="row-table-end flex place-items-center justify-between mt-1">
                        <p class="font-medium text-[15px]">Zobacz więcej</p>
                        <Icon name="ph:caret-right-light" size="20" class="text-gray mb-2" />
                    </div>
                </NuxtLink>
            </div>
            <p class="text-[20px] font-medium mt-9 mb-4">Dane bankowe</p>
            <div class="white-retangle">
                <div class="row-table-start flex place-items-center justify-between">
                    <div class="flex flex-col">
                        <p class="text-gray-500 text-[13px]">Numer IBAN</p>
                        <p class="font-semibold text-[16px]">{{ settings?.financial?.iban ? settings?.financial?.iban :
                            'Brak'
                        }}</p>
                    </div>
                </div>
                <div class="row-table-start flex place-items-center justify-between">
                    <div class="flex flex-col">
                        <p class=" text-gray-500 text-[13px]">Nazwa banku</p>
                        <p class="font-semibold text-[16px]">{{ truncateText(settings?.financial?.bank_name ?
                            settings?.financial?.bank_name : 'Brak', 34) }} </p>
                    </div>
                </div>
                <div class="row-table-start flex place-items-center justify-between">
                    <div class="flex flex-col">
                        <p class=" text-gray-500 text-[13px]">Numer SWIFT</p>
                        <p class="font-semibold text-[16px]">{{ settings?.financial?.swift ? settings?.financial?.swift :
                            'Brak'
                        }}</p>
                    </div>
                </div>
                <NuxtLink to="/panel/konto/ustawienia/bank">
                    <div class="row-table-end flex place-items-center justify-between mt-1">
                        <p class="font-medium text-[15px]">Edytuj</p>
                        <Icon name="ph:caret-right-light" size="20" class="text-gray mb-2" />
                    </div>
                </NuxtLink>
            </div>
        </NuxtLayout>
    </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from "pinia"
import { useUser } from "@/stores/useUser"

const userState = useUser();
const { user, settings } = storeToRefs(userState);

definePageMeta({
    middleware: "auth",
})

useSeoMeta({
    title: 'Ustawienia',
    ogTitle: 'Ustawienia',
    twitterCard: 'summary_large_image',
})

</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";
</style>
