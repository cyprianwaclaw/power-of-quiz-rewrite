<template>
    <ModalChangeQuizImage :modalActive="isModal" @close="changePhoto" :selectedImage="selectedImage" />
    <div class="my-[40px]">
        <div v-if="isLoading">
            <div class="is-loading">
                <div class="image" />
            </div>
        </div>
        <!-- {{ image }} -->
        <!-- {{ croppedImage }} -->
        <!-- <SectionUserAvatar :size="112" :avatar="avatar" /> -->
        <img v-if="croppedImage" :src="croppedImage" :key="croppedImage" />

        <div class="image-retangle h-[260px] md:mt-3 md:w-[350px] lg:w-[450px] 2xl:w-[550px] w-full">
            <Icon name="carbon:cloud-upload" size="82" color="618CFB"
                class="justify-center flex w-full -mb-[21px] mt-3 md:mt-12" />
            <input type="file" ref="input" accept="image/*" class="default-file-input" @change="handleFileInputChange" />
            <div class="flex w-full justify-center items-center">
                <p class="flex md:hidden cursor-pointer">Kliknij tutaj aby dodać zdjęcie</p>
                <p class="hidden md:flex justify-center cursor-pointer">Kliknij tutaj aby dodać zdjęcie,<br> lub
                    upuść tutaj zdjęcie</p>
            </div>
        </div>

    </div>
</template>

<!-- <script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useQuiz } from "@/stores/useQuiz";

const quizState = useQuiz()
const { image, newImage } = storeToRefs(quizState)
const isLoading = ref(true)
const isModal = ref(false)
const selectedImage = ref()
const croppedImage = ref()
const quizImage = ref()

const isModalShow = () => {
    isModal.value = !isModal.value
}

function loadAvatarImage(url: any) {
    const img = new Image()
    img.src = url;
    img.onload = () => {
        isLoading.value = false
    }
}
const changePhoto = (value: any) => {
    // croppedImage.value = null
    isModalShow()
    croppedImage.value = URL.createObjectURL(value)
}
onMounted(() => {
    // loadAvatarImage(image)
    setTimeout(() => {
        isLoading.value = false
    }, 220);
})

const handleFileInputChange = (event: Event) => {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            selectedImage.value = e.target?.result as string;
        }
        reader.readAsDataURL(file)
        isModalShow()
    }
}

</script> -->
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useQuiz } from "@/stores/useQuiz";
import { watch } from 'vue';

const quizState = useQuiz()
const { image, newImage } = storeToRefs(quizState)
const isLoading = ref(true)
const isModal = ref(false)
const selectedImage = ref<string | undefined>()
const croppedImage = ref<string | undefined>()
const quizImage = ref<string | undefined>()

const isModalShow = () => {
    isModal.value = !isModal.value
}

function loadAvatarImage(url: string) {
    const img = new Image()
    img.src = url;
    img.onload = () => {
        isLoading.value = false
    }
}

// watch(() => props.avatar, (newValue) => {
//     isLoading.value = true;
//     avatarImage.value = newValue;
//     loadAvatarImage(newValue);
// });


// function loadAvatarImage(url: string) {
//     const img = new Image()
//     img.src = url;
//     img.onload = () => {
//         isLoading.value = false
//     }
// }

const changePhoto = (value: any) => {
    isModalShow();
    // croppedImage.value = ''; // Resetowanie wartości
    // setTimeout(() => {
    croppedImage.value = URL.createObjectURL(value);
    // croppedImage.value = value;

    // loadAvatarImage(URL.createObjectURL(value))
    // }); // Małe opóźnienie, żeby wymusić odświeżenie
}

// watch(croppedImage, (newValue: any) => {
//     console.log(newValue)
//     loadAvatarImage(newValue)
// })

// const changePhoto = (value: any) => {
//     isModalShow()
//     const myImage = new Image(100, 200);
//     // myImage.src = URL.createObjectURL(value)
//     // document.body.appendChild(myImage);
//     croppedImage.value = URL.createObjectURL(value)
// }

onMounted(() => {
    setTimeout(() => {
        isLoading.value = false
    }, 220);
})

const handleFileInputChange = (event: Event) => {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            selectedImage.value = e.target?.result as string;
        }
        reader.readAsDataURL(file)
        isModalShow()
    }
}

// Dodajemy watch, żeby reagować na zmiany w selectedImage
// watch(selectedImage, (newVal) => {
//     if (newVal) {
//         croppedImage.value = newVal;
//     }
// });

</script>
<style scoped lang="scss">
@import "@/assets/style/variables.scss";

.image-retangle {
    display: flex;
    flex-direction: column;
    padding: 45px 37px;
    background: #f7f7f7;
    border: 2px dashed #9f9f9f;
    border-radius: 12px;
}


input[type="file"]::file-selector-button {
    display: hidden;
}

input[type="file"] {
    border: none;
    display: flex;
    justify-content: center;
}

.image-retangle p {
    text-align: center;
    font-weight: 500;
    font-size: 17px;
    color: #9c9c9c;
}

input {
    outline: none;
    font-size: 16px;
    width: 100%;
    overflow: hidden;
    min-height: 30px;
    padding: 0px;
    height: 40px;
    font-weight: 500;
    border-color: white;
}

.default-file-input {
    opacity: 0;
}



.image {
    border: 1px solid $border;
    border-radius: 12px;
    margin-bottom: 27px;
    margin-top: 24px;
    object-fit: cover;
    width: 100%;
    height: 260px;

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
        height: 260px;

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
