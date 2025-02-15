<template>
    <div class="md:mt-6">
        <div class="md:flex md:place-items-start md:w-full md:justify-between">
            <h1 class="text-[32px] font-medium color-[#212427]">Odkryj pełnię możliwości <br>w pakiecie <span
                    class="primary-color">Premium</span></h1>
            <div class="bg-white p-[20px] w-[300px] rounded-[18px] md:mt-0 mt-[21px]">
                <p class="font-semibold text-[19px] mb-[14px]">
                    Dostęp miesięczny
                </p>
                <button class="button-primary" @click="goToPayment">Zapłać teraz</button>
            </div>
            <!-- {{ plans }} -->
        </div>
        <div class="bg-white p-7 rounded-[18px] mt-[34px]">
            <div class="flex gap-[24px] w-full justify-end">
                <p class="text-[17px] font-semibold primary-color">Premium</p>
                <p class="text-[17px] font-semibold">Standard</p>
            </div>
            <div v-for="(details, index) in planDetailsArray" :key="index"
                class="pt-[24px] flex w-full justify-between place-items-center"
                :class="index + 1 == planDetailsArray.length ? '' : 'border-b border-gray-200'">
                <div class="flex flex-col">
                    <p class="text-[16px] font-semibold primary-color">{{ details.title }}</p>
                    <p class="pr-6 mb-5 text-gray-600 mt-[2px] md:w-full w-[140px]">
                        {{ details.description }}
                    </p>
                </div>
                <div class="flex gap-[12px]  justify-between w-[118px] mr-[28px]">
                    <Icon name="ph:check-circle-fill" size="26"
                        :class="details.premium == true ? 'active-plan' : 'non-active-plan'" />
                    <Icon name="ph:check-circle-fill" size="26"
                        :class="details.standard == true ? 'active-plan' : 'non-active-plan'" />
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { useUser } from "@/stores/useUser";
const axiosInstance = useNuxtApp().$axiosInstance as any;

const router = useRouter()

definePageMeta({
    middleware: "auth",
})

useSeoMeta({
    title: 'Pakiet premium',
    ogTitle: 'Pakiet premium',
    // description: 'This is my amazing site, let me tell you all about it.',
    // ogDescription: 'This is my amazing site, let me tell you all about it.',
    // ogImage: 'https://example.com/image.png',
    twitterCard: 'summary_large_image',
})

const plans = ref()

const planDetailsArray = [
    {
        title: "cxcx", description: "saerwre re wr ewr ewr we rew rew r wr ewrewrer", premium: true, standard: false
    },
    {
        title: "cxcx", description: "dsdasd", premium: true, standard: false
    },
    {
        title: "cxcx", description: "dsdasd", premium: true, standard: false
    },
    {
        title: "cxcx", description: "dsdasd", premium: true, standard: false
    }
]


onMounted(async () => {
    const res = await axiosInstance.get('/plans')
    plans.value = res.data
})

const goToPayment = async () => {
    // window.open(router.resolve('/dsdd').href, '_blank')
    await axiosInstance.post('/buy-plan', {
        "plan": 3
    })

}

// https://www.google.com/search?q=%7B%22message%22%3A%22Client+error%3A+%60POST+https%3A%5C%2F%5C%2Fsandbox.przelewy24.pl%5C%2Fapi%5C%2Fv1%5C%2Ftransaction%5C%2Fregister%60+resulted+in+a+%60401+Unauthorized%60+response%3A%5Cn%7B%5C%22error%5C%22%3A%5C%22Incorrect+authentication%5C%22%2C%5C%22code%5C%22%3A401%7D%5Cn%22%7D&rlz=1C5CHFA_enPL1074PL1074&oq=%7B%22message%22%3A%22Client+error%3A+%60POST+https%3A%5C%2F%5C%2Fsandbox.przelewy24.pl%5C%2Fapi%5C%2Fv1%5C%2Ftransaction%5C%2Fregister%60+resulted+in+a+%60401+Unauthorized%60+response%3A%5Cn%7B%5C%22error%5C%22%3A%5C%22Incorrect+authentication%5C%22%2C%5C%22code%5C%22%3A401%7D%5Cn%22%7D&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBBzM2MmowajeoAgCwAgA&sourceid=chrome&ie=UTF-8

</script>
<style lang="scss" scoped>
.active-plan {
    color: #33B970;
}

.non-active-plan {
    color: #dadada
}
</style>
