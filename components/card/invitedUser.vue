<template>
    <div v-if="props.isLoading">
        <div class=" flex flex-col gap-[16px] w-full md:grid md:grid-cols-3  md:gap-x-[24px] md:gap-y-[24px]">
            <div v-for="item in props.n" :key="item">
                <div class="is-loading">
                    <div class="flex place-items-center justify-between w-full">
                        <div class="flex gap-[13px] place-items-center">
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
        <div class=" flex flex-col gap-[16px] w-full md:grid md:grid-cols-3  md:gap-x-[24px] md:gap-y-[24px]">
            <div v-for="(user, index) in props.users" :key="index">
                <div class="flex place-items-center justify-between md:bg-white md:px-5 md:py-3 md:rounded-[10px]">
                    <div class="flex gap-[13px] place-items-center">
                        <SectionUserAvatar :size="53" :avatar="user.avatar" />
                        <div class="flex flex-col">
                            <p class="text-[16px] font-semibold">{{ user.name }} {{ user.surname ? user.surname : '' }}</p>
                            <p class="text-[15px] -mt-[2px]"
                                :class="[user.is_premium ? 'text-[#618CFB] font-medium' : 'font-medium text-gray']"> {{
                                    user.is_premium ? 'Premium' :
                                    'Standard' }}</p>
                        </div>
                    </div>
                    <div class="flex gap-2 text-[15px]">
                        <p class="text-gray-500">Punkty</p>
                        <p class="font-semibold">{{ user.points }} </p>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    users: {
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
        height: 53px;
        width: 53px;
        border-radius: 1000px;
    }

    .p1 {
        height: 43px;
        width: 175px;
        border-radius: 7px;
    }

    .p2 {
        height: 27px;
        width: 83px;
        border-radius: 7px;
    }
}

@keyframes shine {
    to {
        background-position-x: -200%;
    }
}
</style>
