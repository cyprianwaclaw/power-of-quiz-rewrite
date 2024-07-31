<template>
    <NuxtLayout name="account" arrowText="Ustawienia" title="Dane do faktury">
        <!-- <pre>
            {{ settings }}
        </pre> -->
        <div class="white-retangle mt-7">

            <div class="row-table-end flex place-items-center justify-between">
                <div class="flex place-items-center mb-3 gap-[12px]">
                    gfgfg
                </div>
            </div>

        </div>

    </NuxtLayout>
</template>
<script lang="ts" setup>
import { storeToRefs } from "pinia"
import { useUser } from "@/stores/useUser"
const axiosInstance = useNuxtApp().$axiosInstance;

const route = useRoute()
const router = useRouter()
const isLoading = ref(true)
const userState = useUser();
const { user, settings } = storeToRefs(userState);




</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";

.image {
    border: 1px solid $border;
    border-radius: 12px;
    margin-bottom: 32px;
    margin-top: 22px;
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
</style>
