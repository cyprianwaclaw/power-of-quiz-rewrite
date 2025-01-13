<template>
    <div v-if="props.isLoading">
        <div class="flex flex-col gap-[16px] w-full">
            <div v-for="item in props.n" :key="item">
                <div class="is-loading place-items-center" :class="[item != 1 ? 'border-t pt-[16px]' : '']">
                    <div class="image" />
                    <p class="p1" />
                </div>
            </div>
        </div>
</div>  
    <div v-else>
        <div class="flex flex-col">
            <div v-for="(single, index) in props.questions" :key="index">
                <div @click="toggleQuestion(index)" class="place-items-center flex  bg-white  cursor-pointer hover:bg-slate-50 px-[30px] pt-[30px] pb-[17px]"
                    :class="[index != '0' ? 'border-t pt-[18px]' : '']">
                    <div class="w-full md:mr-[120px]">
                        <p class="question-title leading-[22px]" :class="{ 'change-color': isOpen[index] }"><span
                                class="primary-color font-bold">{{ index + 1
                                }}.</span> {{ single.question }}</p>
                    </div>
                    <div class="w-[40px]  flex-shrink-0 flex justify-end">
                        <Icon :class="{ rotated: isOpen[index] }" name="ph:caret-down-bold" size="22" />
                    </div>
                </div>
                <Transition name="accordion" @before-enter="beforeEnter" @enter="enter" @leave="leave">
                    <div v-if="isOpen[index]" class="bg-white flex flex-col gap-[10px] ml-[7px] mt-[3px]">
                        <div v-for="(answer, index) in single.answers" :key="index"
                            class=" place-items-center flex gap-[6px] ml-[32px]">
                            <div class="w-[23px]  flex-shrink-0 flex">
                                <Icon :name="answer.correct ? 'ph:check-circle-duotone' : 'ph:check-circle'" size="22"
                                    :color="answer.correct ? '#4BB21A' : '#BFBFBF'" />
                            </div>
                            <p class="text-[15px] leading-[20px] text-[#7B7B7B]">
                                {{ answer.text }}
                            </p>
                        </div>
                    </div>
                </Transition>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { gsap } from 'gsap';

const props = defineProps({
    questions: {
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
})

const isOpen = ref({}) as any

watchEffect(() => {
    if (props.questions && props.questions.length > 0) {
        isOpen.value = {};
        props.questions.forEach((index: any) => {
            isOpen.value[index] = false;
        })
    }
})

const toggleQuestion = (index: any) => {
    isOpen.value[index] = !isOpen.value[index];
};


const beforeEnter = (el: any) => {
    el.style.height = '0';
}

const enter = (el: any, done: () => void) => {
    gsap.to(el, {
        height: el.scrollHeight + 38 + 'px',
        duration: 0.26,
        onComplete: done,
    });
}

const leave = (el: any, done: () => void) => {
    gsap.to(el, {
        height: '0',
        duration: 0.26,
        onComplete: done,
    });
}

</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";

.answer-content {
    overflow: hidden;
    height: 0;
}

.accordion-enter-active,
.accordion-leave-active {
    overflow: hidden;
}

.question-title {
    font-size: 16px;
    color: $text-black;
}

.icon {
    color: $primary;
}

.change-color {
    color: $primary;
    font-weight: 500;
}

.rotated {
    transform: rotate(180deg);
    color: #bbbbbb !important;
}

.title {
    color: rgb(40, 39, 39);
    font-weight: 500;
    margin-top: 6px;
    font-size: 15px;
    line-height: 22px;
}

.image {
    height: 80px;
    width: 100%;
    border-radius: 5px;
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
        height: 80px;
        width: 90px;
        border-radius: 7px;
    }

    .p1 {
        margin-left: 12px;
        height: 46px;
        width: 150px;
        border-radius: 7px;
    }

    .p1 {
        margin-left: 12px;
        height: 46px;
        width: 150px;
        border-radius: 7px;
    }

}

@keyframes shine {
    to {
        background-position-x: -200%;
    }
}
</style>
