<template>
    <ModalChangeImage :modalActive="isModal" @close="changePhoto" :selectedImage="selectedImage" />
    <div class="mt-[28px] lg:mt-[0px]">
        <div v-if="isLoading">
            <div class="is-loading">
                <div class="image" />
            </div>
        </div>
        <div v-else>
            <div v-if="newImage">
                <p class="font-semibold text-[21px] md:flex hidden">
                    Wybrane zdjęcie
                </p>
                <!-- {{ newImage }} -->
                <NuxtImg v-if="!route.fullPath.includes('test')" :src="croppedImage" :key="croppedImage" class="image" />
                <NuxtImg v-if="route.fullPath.includes('test')" :src="newImage" :key="croppedImage" class="image" />
                <div class="flex  justify-end -mt-[10px]">
                    <p @click="deletePhoto()" v-if="!route.fullPath.includes('test')" class="text-red-600 px-5 py-3 cursor-pointer">Usuń</p>
                    <button @click="handleFileInputChange" class="button-primary cursor-pointer">Edytuj</button>
                </div>
            </div>
            <label v-else for="file-upload" class="cursor-pionter">
                <div class="image-retangle h-[385px]  md:h-[420px] mt-[30px] mb-[42px] md:mb-[0px] md:mt-[0px] lg:w-[450px] 2xl:w-[550px] w-full">
                    <Icon name="carbon:cloud-upload" size="82" color="618CFB"
                        class="justify-center flex w-full -mb-[32px] mt-[72px]" />
                    <input type="file" id="file-upload" ref="input" accept="image/*" class="default-file-input"
                        @change="handleFileInputChange" />
                    <div class="flex  justify-center items-center">
                        <p class="flex md:hidden">Kliknij tutaj aby dodać zdjęcie</p>
                        <p class="hidden md:flex justify-center">Kliknij tutaj aby dodać zdjęcie,<br> lub
                            upuść tutaj zdjęcie</p>
                    </div>
                </div>
            </label>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useImage } from "@/stores/imageStore"

const route = useRoute()
const imageState = useImage()
const { newImage, newImageFile } = storeToRefs(imageState)
const isLoading = ref(true)
const isModal = ref(false)
const selectedImage = ref<string | undefined>()
const croppedImage = ref<string | undefined>()

const isModalShow = () => {
    isModal.value = !isModal.value
}

const changePhoto = (value: any) => {
    isModalShow();
    croppedImage.value = URL.createObjectURL(value);
}

onMounted(() => {
    setTimeout(() => {
        isLoading.value = false
    }, 220);
})

const handleFileInputChange = (event: Event) => {
    const fileInput = event.target as HTMLInputElement
    if (fileInput.files && fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            selectedImage.value = e.target?.result as string;
        }
        reader.readAsDataURL(file)
        isModalShow()
    } else {
        isModalShow()
    }
}

const deletePhoto = () => {
    newImageFile.value = null
    newImage.value = ''
    croppedImage.value = ''

}
</script>
<style scoped lang="scss">
@import "@/assets/style/variables.scss";

.image-retangle {
    display: flex;
    flex-direction: column;
    padding: 45px 37px;
    background: #f7f7f7;
    border: 2px dashed #9f9f9f;
    border-radius: 16px;
    transition: all 0.1s ease;
    cursor: pointer;

    &:hover {
        background: #ededed;
        cursor: pointer;
    }
}


input[type="file"]::file-selector-button {
    display: hidden;
}

input[type="file"] {
    border: none;
    display: flex;
    justify-content: center;
    cursor: pointer;
}

.image-retangle p {
    text-align: center;
    font-weight: 500;
    font-size: 16px;
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
    margin-top: 15px;
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
