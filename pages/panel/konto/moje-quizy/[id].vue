<template>
    <NuxtLayout name="account" arrowText="Moje quizy">
        <div class="bg-white rounded-[18px] p-[30px]">
            <pre>
            {{ singleQuiz }}
            </pre>
        </div>
        <div class="bg-white rounded-[18px] p-[30px] mt-[21px]">
            <pre>
            {{ quizQuestions }}
            </pre>
        </div>
        <!-- <div class="bg-white rounded-[18px] p-[30px] mt-[21px]">
            <pre>
            {{ singleQuiz }}
            </pre>
        </div> -->
    </NuxtLayout>
</template>
<script lang="ts" setup>
import { storeToRefs } from "pinia"
import { useUser } from "@/stores/useUser"
const axiosInstance = useNuxtApp().$axiosInstance;

const route = useRoute()
const router = useRouter()
const isLoading = ref(true)
const singleQuiz = ref() as any
const quizQuestions = ref() as any
const userState = useUser();
const { user } = storeToRefs(userState);


onMounted(async () => {
    const questions = await axiosInstance.get(`quizzes/${router.currentRoute.value.params.id}/data`);
    const quiz = await axiosInstance.get(`quiz/${router.currentRoute.value.params.id}`);
    singleQuiz.value = quiz.data;
    quizQuestions.value = questions.data;
    setTimeout(async () => {
        isLoading.value = false;
    }, 200);
});


</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";
</style>
