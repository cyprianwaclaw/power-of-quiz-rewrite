<template>
    <div v-if="props.isLoading">
        <div class=" flex flex-col gap-[12px] w-full md:grid md:grid-cols-3  md:gap-x-[24px] md:gap-y-[24px]">
            <div v-for="item in props.n" :key="item">
                <div class="is-loading" :class="[item != 1 ? 'border-t pt-[16px]' : '']">
                    <div class="flex place-items-center justify-between w-full">
                        <div class="flex gap-[6px] place-items-start flex-col">
                            <div class="image" />
                            <p class="p1" />
                        </div>
                        <p class="p2" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        <div class="w-full">
            <div v-for="(single, index) in props.payments" :key="index">
                <div class="flex place-items-center justify-between w-full py-[10px] md:bg-white md:px-5 md:py-3 md:rounded-[10px]"
                    :class="[index != '0' ? 'border-t pt-[16px]' : '']">
                    <div class="flex flex-col w-full">
                        <p class="text-[15px] text-[#BEBEBE]">{{ single.date }}</p>
                        <p class="text-[21px] font-semibold">{{ single.price }} zł</p>
                    </div>
                    <div class="flex place-items-center gap-[12px]">
                        <p class="font-medium whitespace-nowrap" :class="{
                            'text-[#E21313]': single?.status_text === 'Błąd płatności',
                            'text-[#4BB21A]': single?.status_text === 'Zrealizowano',
                            'text-[#E1A817]': single?.status_text === 'Oczekująca'
                        }">{{ single?.status_text }} </p>
                        <div v-if="!single?.ifirma_invoices" @click="downloadInvoice(single?.ifirma_invoices)"
                            class="download-invoice">
                            <Icon name="ph:download-simple" size="26" class="text-[#618CFB]" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    payments: {
        type: Object,
        required: true,
    },
    isLoading: {
        type: Boolean,
        required: true,
    },
    n: {
        type: Number,
        required: true,
    },
});

const downloadInvoice = async (invoice_id: any) => {
    console.log("Download some invoice")
}

</script>

<style scoped lang="scss">
.title {
    color: rgb(40, 39, 39);
    font-weight: 500;
    margin-top: 6px;
    font-size: 15px;
    line-height: 22px;
}

.download-invoice {
    cursor: pointer;
    padding: 11px 12px;
    border-radius: 500px;
    background-color: rgb(255, 255, 255);
    transition: all 0.14s ease;

    &:hover {
        background-color: rgb(245, 245, 245);
    }
}

.is-loading {
    display: flex;
    width: 100%;

    .image,
    p {
        background: linear-gradient(110deg, #c7c7c7 8%, #d4d4d4 18%, #c7c7c7 33%);
        background-size: 300% 100%;
        animation: 1.6s shine linear infinite;
    }

    .image {
        height: 20px;
        width: 70px;
        border-radius: 7px;
    }

    .p1 {
        height: 30px;
        width: 54px;
        border-radius: 7px;
    }

    .p2 {
        height: 34px;
        width: 108px;
        border-radius: 7px;
    }
}

@keyframes shine {
    to {
        background-position-x: -200%;
    }
}</style>
