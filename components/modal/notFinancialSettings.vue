<template>
    <div class="fixed z-50 left-0 bottom-0 w-full">
        <Transition @enter="EnterBg" @leave="LeaveBg" :css="false">
            <div class="blur-background-update" @click="$emit('close')" v-if="props.modalActive" />
        </Transition>
        <div class="flex sm:hidden">
            <Transition @enter="onEnterMobile" @leave="onLeaveMobile" :css="false">
                <div class="modal-down" v-if="props.modalActive">
                    <div class="justify-center flex -mt-[17px]">
                        <hr class="w-9 close border-[2px] rounded-2xl" />
                    </div>
                    <div class="flex columns-2 w-full justify-between mb-4 mt-[17px] place-items-start gap-[24px]">
                        <p class="font-medium text-2xl">Uzupełnij dane do wypłaty</p>
                        <Icon name="carbon:close" size="30" class="close w-8 h-8 border-transparent rounded-[6px]"
                            @click="$emit('close')" />
                    </div>
                    <div class="content">
                        <Icon name="ph:x-circle-light" size="74" class="-ml-2 red" />
                        <p class="mt-2.5 text-gray-600 mr-9">Aby móc wypłacić środki uzupełnij dane do wypłaty: numer konta, nazwę banku i numer SWIFT</p>
                    </div>
                </div>
            </Transition>
        </div>
        <div class="sm:flex hidden">
            <Transition @enter="onEnterDesktop" :css="false">
                <div class="modal-desktop" v-if="props.modalActive">
                    <div class="flex w-full justify-end">
                        <Icon name="carbon:close" size="30" class="close w-8 h-8 border-transparent rounded-[6px]"
                            @click="$emit('close')" />
                    </div>
                    <div class="flex flex-col items-center text-center justify-center mt-[10px]">
                        <Icon name="ph:x-circle-light" size="70" class="red mb-3" />
                        <p class="font-medium text-2xl">Uzupełnij dane do wypłaty</p>
                        <p class="mt-2 text-gray-600 mx-4">Aby móc wypłacić środki uzupełnij dane do wypłaty: numer konta, nazwę banku i numer SWIFT</p>
                    </div>
                </div>
            </Transition>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import gsap from 'gsap'

const props = defineProps({
    modalActive: {
        type: Boolean,
        required: true,
    },
})

const emit = defineEmits(['close'])

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
    height: 290px;
    padding-top: 8px;
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
    width: 500px;
    height: 320px;
    padding: 21px;
}
</style>
