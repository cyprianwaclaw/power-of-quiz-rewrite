<template>
    <div class="fixed z-50 left-0 bottom-0 w-full">
        <Transition @enter="EnterBg" @leave="LeaveBg" :css="false">
            <div class="blur-background-update" @click="emitClose()" v-if="props.modalActive" />
        </Transition>
        <div class="flex sm:hidden">
            <Transition @enter="onEnterMobile" @leave="onLeaveMobile" :css="false">
                <div class="modal-down" v-if="props.modalActive">
                    <div class="justify-center flex -mt-[17px]">
                        <hr class="w-9 close border-[2px] rounded-2xl" />
                    </div>
                    <div class="flex columns-2 w-full justify-between mb-4 mt-[17px] place-items-start gap-[24px]">
                        <p class="font-medium text-[20px] leading-[25px] ">Wypłata środków</p>
                        <Icon name="carbon:close" size="30" class="close w-8 h-8 border-transparent rounded-[6px]"
                            @click="emitClose()" />
                    </div>
                    <div :class="success ? 'content-new' : 'content'">
                        <div v-if="!success">
                            <input class="input-widthdraw" type="number" min="1" v-model="amount"
                                placeholder="Kwota do wypłaty" />
                            <p class="text-[13px] mt-[3px] text-gray-400 mb-[23px]">
                                Minimalna kwota do wypłaty to 1 zł
                            </p>
                            <ButtonLoading isLoading="false" :loading="isLoadingButton" text="Wypłacam"
                                @click="widthdrawFunds" />
                        </div>
                        <div v-else class="flex w-full justify-center items-center flex-col text-center">
                            <Icon name="ph:check-circle-light" color="#4BB21A" size="64" />
                            <p class="text-[15px] text-gray-600 leading-[23px] px-[20px] mt-[6px]">Przyjęto wypłatę, wkrótce
                                środki zaksięgują się na Twoim koncie</p>
                            <p class="font-semibold text-[28px] mb-[24px] mt-[15px]">{{ amount }} zł</p>
                            <button class="button-primary w-full" @click="emitClose()">Gotowe</button>
                        </div>
                    </div>
                </div>
            </Transition>
        </div>
        <!-- Dekstop view  -->
        <!-- <div class="sm:flex hidden">
            <Transition @enter="onEnterDesktop" :css="false">
                <div class="modal-desktop" v-if="props.modalActive">
                    <div class="w-full h-full">
                        <div v-if="isLoading">
                            <div class="is-loading">
                                <div class="image" />
                            </div>
                        </div>
                        <img v-show="!isLoading" :src="props.quiz.image" class="image" />
                    </div>
                    <div class="w-full flex flex-col">
                        <div class="flex absolute right-[21px] top-[21px]">
                            <Icon name="carbon:close" size="30" class="close w-8 h-8 border-transparent rounded-[6px]"
                                @click="$emit('close')" />
                        </div>
                        <p class="font-medium text-[20px] leading-[25px] mt-[64px] ">{{ quiz.title }}</p>

                        <div class="mt-[18px] mb-6 flex flex-col">
                            <div class="flex gap-[7px]">
                                <p class="text-gray-600">Kategoria:</p>
                                <p class="text-base primary-color font-medium">
                                    {{ quiz.category }}
                                </p>
                            </div>
                            <div class="flex gap-[7px] mt-[5px]">
                                <p class="text-gray-600">Trudność:</p>
                                <p class="text-base primary-color font-medium">
                                    {{ quiz.difficulty }}
                                </p>
                            </div>
                            <div class="flex gap-[7px] mt-[5px]">
                                <p class="text-gray-600">Pytania:</p>
                                <p class="text-base primary-color font-medium">
                                    {{ quiz.questions_count }}
                                </p>
                            </div>
                            <div class="flex gap-[7px] mt-[5px]">
                                <p class="text-gray-600">Czas trwania:</p>
                                <p class="text-base primary-color font-medium">
                                    {{ quiz.time }} min
                                </p>
                            </div>
                            <div class="flex gap-[7px] mt-[5px]">
                                <p class="text-gray-600">Dodano:</p>
                                <p class="text-base primary-color font-medium">
                                    {{ quiz.date }}
                                </p>
                            </div>
                            <p class="text-[17px] font-semibold mt-[18px]">Opis</p>
                            <p class="text pr-6 mb-5 text-gray-600 mt-[4px]">{{ quiz.description }}</p>
                            <button class="button-primary w-[260px] absolute bottom-10">
                                <NuxtLink :to="`/panel/quiz/${quiz?.id}`">
                                    <p class="text-center">Zagraj w quiz</p>
                                </NuxtLink>
                            </button>
                        </div>
                    </div>
                </div>
            </Transition>
        </div> -->
    </div>
</template>

<script setup lang="ts">
const axiosInstance = useNuxtApp().$axiosInstance;
import gsap from 'gsap'

const props = defineProps({
    modalActive: {
        type: Boolean,
        required: true,
    },
})

const emit = defineEmits(['close'])
const isLoadingButton = ref(false)
const amount = ref()
const success = ref(false)

const widthdrawFunds = async () => {
    isLoadingButton.value = true;

    if (!amount.value) {
        success.value = false;
    } else {
        try {
            const res = await axiosInstance.post('/payouts', {
                points: amount.value,
            });
            success.value = res.data.success || false;
        } catch (error) {
            success.value = false;
            console.error('Error during withdrawal:', error);
        }
    }

    setTimeout(() => {
        isLoadingButton.value = false;
    }, 440);
};

watch(props, (newVal) => {
    if (newVal.modalActive === false) {
        success.value = false
        amount.value = ""
    }
});

const emitClose = () => {
    emit('close', success.value);
};

const onEnterDesktop = (el: any) => {
    gsap.from(el, {
        duration: 0.28,
        y: 24,
    })
}

const onEnterMobile = (el: any, done: any) => {
    let elementHeight = el.offsetHeight;
    gsap.from(el, {
        ease: "power1.out",
        y: elementHeight,
        duration: 0.3,
        onComplete: done,
    });
};

const onLeaveMobile = (el: any, done: any) => {
    let elementHeight = el.offsetHeight;
    gsap.to(el, {
        ease: "power1.out",
        y: elementHeight,
        duration: 0.3,
        onComplete: done,
    })
}

const EnterBg = (el: any) => {
    gsap.to(el, {
        opacity: 1,
        duration: 0.6,
    });
};
const LeaveBg = (el: any) => {
    gsap.to(el, {
        opacity: 0,
        duration: 0.4,
    });
    gsap.set(el, {
        delay: 0.4,
        display: "none",
    });
};

</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";

.modal-down {
    background-color: white;
    border: solid transparent;
    border-radius: 16px 16px 0px 0px;
    padding: 24px 24px 0px 24px;
    position: absolute;
    bottom: 0px;
    width: 100%;
    z-index: 100;
}

.close {
    color: rgb(209, 209, 209);

    &:hover {
        color: rgb(131, 131, 131);
        background-color: #c7c7c71d;
        cursor: pointer;
    }
}


.content {
    height: 214px;
    padding-top: 9px;
}

.content-new {
    height: 295px;
    padding-top: 13px;
}

.modal-desktop {
    background-color: white;
    border: solid transparent;
    border-radius: 12px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
    width: 740px;
    height: 580px;
    padding: 21px;
    display: flex;
    gap: 28px;
    columns: 2;
}


.input-widthdraw {
    background-color: #ECECEC;
    padding: 15px 57px 15px 18px;
    width: 100%;
    font-size: 16px;
    letter-spacing: 0.17px;
    border: 2px solid transparent;
    outline: none;
    border-radius: 12px;
    font-weight: 500;
    transition: border-color 0.15s ease-in-out, color 0.15s ease-in-out, background-color 0.15s ease-in-out;

    &:focus {
        background-color: #ffffff;
        border-color: #d0d0d0;
        border-width: 2px;
        color: #363636 !important;
        letter-spacing: 0.17px;
        font-weight: 500;
    }

    &::placeholder {
        letter-spacing: 0.17px;
        font-size: 16px;
        font-weight: 500;
        color: #9D9D9D;
    }

    &:focus::placeholder {
        font-size: 0px;
    }

    &::-ms-clear {
        display: none; // Ukrycie przycisku w IE
    }
}
</style>
