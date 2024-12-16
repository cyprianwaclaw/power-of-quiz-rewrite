<template>
    <ModalChangeImage :modalActive="isModal" @close="changePhoto" :selectedImage="selectedImage" />
    <div class="my-[40px]">
        <div v-if="isLoading">
            <div class="is-loading">
                <div class="image" />
            </div>
        </div>
        <div v-else>
            <div v-if="croppedImage">
                <img :src="croppedImage" :key="croppedImage" class="image" />
                <div class="flex w-full justify-end -mt-[10px]">
                    <p @click="deletePhoto()" class="text-red-600 px-5 py-3">Usuń</p>
                    <button @click="handleFileInputChange" class="button-primary">Edytuj</button>
                </div>
            </div>
            <label v-else for="file-upload">
                <div class="image-retangle h-[260px] md:mt-3 md:w-[350px] lg:w-[450px] 2xl:w-[550px] w-full">
                    <Icon name="carbon:cloud-upload" size="82" color="618CFB"
                        class="justify-center flex w-full -mb-[21px] mt-3 md:mt-12" />
                    <input type="file" id="file-upload" ref="input" accept="image/*" class="default-file-input"
                        @change="handleFileInputChange" />
                    <div class="flex w-full justify-center items-center">
                        <p class="flex md:hidden cursor-pointer">Kliknij tutaj aby dodać zdjęcie</p>
                        <p class="hidden md:flex justify-center cursor-pointer">Kliknij tutaj aby dodać zdjęcie,<br> lub
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

const imageState = useImage()
const {newImage, newImageFile } = storeToRefs(imageState)
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
