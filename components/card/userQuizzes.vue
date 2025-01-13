<template>
    <div v-if="props.isLoading">
        <div class=" flex flex-col gap-[16px] w-full ">
            <div v-for="item in props.n" :key="item">
                <div class="is-loading place-items-center" :class="[item != 1 ? 'border-t pt-[16px]' : '']">
                    <div class="image" />
                    <p class="p1" />
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        <div class=" flex flex-col gap-[16px] w-full ">
            <div v-for="(single, index) in props.quizzes" :key="index">
                <NuxtLink :to="`/panel/konto/moje-quizy/${single.id}`" class=" place-items-center flex gap-[12px]"
                    :class="[index != '0' ? 'border-t pt-[15px]' : '']">
                    <div class="w-[90px] flex-shrink-0">
                        <!-- <img :src="single.image" class="image" /> -->
                            <NuxtImg :src="single.image" class="image" />
                    </div>
                    <div>
                        <p class="font-semibold text-[#191616] leading-[19px] text-[14px]">{{ single.title }}</p>
                    </div>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    quizzes: {
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


</script>

<style scoped lang="scss">
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
