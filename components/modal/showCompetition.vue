<template>
    <div class="fixed z-50 left-0 bottom-0 w-full">
        <Transition @enter="EnterBg" @leave="LeaveBg" :css="false">
            <div class="blur-background-update" @click="$emit('close')" v-if="props.modalActive" />
        </Transition>
        <!-- Mobile view  -->
        <div class="flex sm:hidden">
            <Transition @enter="onEnterMobile" @leave="onLeaveMobile" :css="false">
                <div class="modal-down" v-if="props.modalActive">
                    <div class="justify-center flex -mt-[17px]">
                        <hr class="w-9 close border-[2px] rounded-2xl" />
                    </div>
                    <div class="flex columns-2 w-full justify-between mb-5 mt-[17px] place-items-start gap-[24px]">
                        <div class="flex flex-col">
                            <p class="font-medium text-[14px] primary-color">Konkurs</p>
                            <p class="font-medium text-[20px] leading-[25px] ">{{ competition.title }}</p>
                        </div>
                        <Icon name="carbon:close" size="30" class="close w-8 h-8 border-transparent rounded-[6px]"
                            @click="$emit('close')" />
                    </div>
                    <div class="content overflow-y-scroll">
                        <div class="w-full">
                            <div v-if="isLoading">
                                <div class="is-loading">
                                    <div class="image" />
                                </div>
                            </div>
                            <img v-show="!isLoading" :src="competition.image" class="image" />
                        </div>
                        <div class="mb-6 gap-[5px] flex flex-col">
                            <div class="flex gap-[7px] mt-2">
                                <p class="text-gray-600">Data:</p>
                                <p class="text-base primary-color font-medium">
                                    <!-- {{ competition.time }} -->
                                    {{ competition.time.data }}
                                </p>
                            </div>
                         <div class="flex gap-[7px] mb-3">
                                <p class="text-gray-600">Godziny</p>
                                <p class="text-base primary-color font-medium">
                                    {{ competition.time.start_format }} - {{ competition.time.end_format }}
                                </p>
                            </div>
                            <div class="flex gap-[7px]">
                                <p class="text-gray-600">Kategoria:</p>
                                <p class="text-base primary-color font-medium">
                                    {{ competition.category }}
                                </p>
                            </div>
                            <div class="flex gap-[7px]">
                                <p class="text-gray-600">Trudność:</p>
                                <p class="text-base primary-color font-medium">
                                    {{ competition.difficulty }}
                                </p>
                            </div>
                            <div class="flex gap-[7px]">
                                <p class="text-gray-600">Liczba pytań:</p>
                                <p class="text-base primary-color font-medium">
                                    {{ competition.questions_count }}
                                </p>
                            </div>
                        </div>
                        <p class="text-[17px] font-semibold">Opis</p>
                        <p class="text pr-6 mb-5 text-gray-600 mt-[4px]"> {{ competition.description }}</p>
                        <label class="flex w-full mb-5 mt-12">
                            <input type="checkbox" class="w-5 flex mb-[4px]" v-model="checkbox" />
                            <p class="ml-2">Akceptuje <NuxtLink to="/regulamin" class="link">regulamin</NuxtLink>
                            </p>
                        </label>
                        <button class=" w-full mb-6 " :class="checkbox ? 'button-primary' : 'button-primary-disabled'">
                            <p class="text-center" @click="startGame(competition.id)">Zagraj</p>
                        </button>
                    </div>
                </div>
            </Transition>
        </div>
        <!-- Dekstop view  -->
        <div class="sm:flex hidden">
            <Transition @enter="onEnterDesktop" :css="false">
                <div class="modal-desktop" v-if="props.modalActive">
                    <div class="w-full h-full">
                        <div v-if="isLoading">
                            <div class="is-loading">
                                <div class="image" />
                            </div>
                        </div>
                        <img v-show="!isLoading" :src="props.competition.image" class="image" />
                    </div>
                    <div class="w-full flex flex-col">
                        <div class="flex absolute right-[21px] top-[21px]">
                            <Icon name="carbon:close" size="30" class="close w-8 h-8 border-transparent rounded-[6px]"
                                @click="$emit('close')" />
                        </div>
                        <p class="font-medium text-[20px] leading-[25px] mt-[64px] ">{{ competition.title }}</p>
                        <div class="mb-6 gap-[5px] flex flex-col">
                            <div class="flex gap-[7px] mt-2">
                                <p class="text-gray-600">Data:</p>
                                <p class="text-base primary-color font-medium">
                                    {{ competition.time.data }}
                                </p>
                            </div>
                            <div class="flex gap-[7px] mb-3">
                                <p class="text-gray-600">Godziny</p>
                                <p class="text-base primary-color font-medium">
                                    {{ competition.time.start_format }} - {{ competition.time.end_format }}
                                </p>
                            </div>
                            <div class="flex gap-[7px]">
                                <p class="text-gray-600">Kategoria:</p>
                                <p class="text-base primary-color font-medium">
                                    {{ competition.category }}
                                </p>
                            </div>
                            <div class="flex gap-[7px]">
                                <p class="text-gray-600">Trudność:</p>
                                <p class="text-base primary-color font-medium">
                                    {{ competition.difficulty }}
                                </p>
                            </div>
                            <div class="flex gap-[7px]">
                                <p class="text-gray-600">Liczba pytań:</p>
                                <p class="text-base primary-color font-medium">
                                    {{ competition.questions_count }}
                                </p>
                            </div>
                        </div>
                        <p class="text-[17px] font-semibold">Opis</p>
                        <p class="text pr-6 mb-5 text-gray-600 mt-[4px]"> {{ competition.description }}</p>
                        <label class="flex w-full mb-5 mt-12">
                            <input type="checkbox" class="w-5 flex mb-[4px]" v-model="checkbox" />
                            <p class="ml-2">Akceptuje <NuxtLink to="/regulamin" class="link">regulamin</NuxtLink>
                            </p>
                        </label>
                        <button class=" w-full mb-6 " :class="checkbox ? 'button-primary' : 'button-primary-disabled'">
                            <p class="text-center" @click="startGame(competition.id)">Zagraj</p>
                        </button>
                    </div>
                </div>
            </Transition>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import gsap from 'gsap'
const axiosInstance = useNuxtApp().$axiosInstance as any
const router = useRouter()

const quizSubmissionCookie = useCookie('competition_submission') as any

const props = defineProps({
    competition: {
        type: Object,
        required: true,
    },
    modalActive: {
        type: Boolean,
        required: true,
    },
})

const emit = defineEmits(['close'])
const isLoading = ref(true)
const checkbox = ref(false)
const startGame = async (id: number) => {
    if (checkbox.value === true) {
        const newCompetition = await axiosInstance.get(`/competition/${id}/start`)
        const submissionData = {
            submission_id: newCompetition.data.submission_id,
            competition_id: id,
            first_question: newCompetition.data.next_question,
            info: newCompetition.data.competition_info,

        }
        quizSubmissionCookie.value = JSON.stringify(submissionData)
        router.push(`/panel/konkurs/${id}?name=${props.competition.title}`)
    }
}


watch(props, (newVal) => {
    if (newVal.modalActive === true) {
        setTimeout(() => {
            isLoading.value = false
        }, 320)
    } else {
        isLoading.value = true
    }
});

const onEnterDesktop = (el: any) => {
    gsap.from(el, {
        duration: 0.28,
        y: 24,
    });
};


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

.link {
    font-size: 16px;
    margin-left: 1px;
    color: $primary;
    text-decoration: underline;
    text-underline-offset: 3px;
    text-decoration-color: $primary;
    text-decoration-thickness: 1px;
    font-weight: 400;
}

.button-primary-disabled {
    cursor: not-allowed !important;
    background-color: #aec5ff !important;
    color: #fff;
    font-weight: 500;
    border: none !important;
    padding: 10px 23px;
    border-radius: 8px;
    transition: background-color 0.23s ease;
}

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
    height: 359px;
    // padding-top: 16px;
}

.image {
    border: 1px solid $border;
    border-radius: 12px;
    margin-bottom: 16px;
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
</style>
