<template>
    <div class="fixed z-50 left-0 bottom-0 w-full">
        <Transition @enter="EnterBg" @leave="LeaveBg" :css="false">
            <div class="blur-background-update" v-if="props.modalActive" />
        </Transition>
        <div class="flex">
            <!-- sm:hidden -->
            <Transition @enter="onEnterMobile" @leave="onLeaveMobile" :css="false">
                <div class="modal-down" v-if="props.modalActive">
                    <div class="justify-center flex -mt-[17px] md:hidden">
                        <hr class="w-9 close border-[2px] rounded-2xl" />
                    </div>
                    <div
                        class="flex columns-2 w-full justify-between mb-4 mt-[17px] md:mt-[2px] place-items-start gap-[24px]">
                        <p class="font-medium text-[20px] leading-[25px] ">
                            {{ routeName === 'panel-konto-ustawienia-moje-dane' ? 'Zdjęcie profilowe' : 'Ustaw zdjęcie' }}
                        </p>
                        <Icon name="carbon:close" size="30" class="close w-8 h-8 border-transparent rounded-[6px]"
                            @click="removeImage()" />
                    </div>
                    <div class="content">
                        <div v-if="!selectedImageValue"
                            class="image-retangle h-[260px] md:mt-3 md:w-[350px] lg:w-[450px] 2xl:w-[550px] w-full">
                            <Icon name="carbon:cloud-upload" size="82" color="618CFB"
                                class="justify-center flex w-full -mb-[21px] mt-3 md:mt-12" />
                            <input type="file" ref="input" accept="image/*" class="default-file-input"
                                @change="handleFileInputChange" />
                            <div class="flex w-full justify-center items-center">
                                <p class="flex md:hidden cursor-pointer">Kliknij tutaj aby dodać zdjęcie</p>
                                <p class="hidden md:flex justify-center cursor-pointer">Kliknij tutaj aby dodać zdjęcie,<br>
                                    lub
                                    upuść tutaj zdjęcie</p>
                            </div>
                        </div>
                        <div class="w-full">
                            <div v-if="isLoading">
                                <div class="is-loading">
                                    <div class="image" />
                                    <div class="flex w-full justify-end">
                                        <div class="image image-buttons" />
                                    </div>
                                </div>
                            </div>
                            <div v-else>
                                <div v-if="croppedImage">
                                    <img :src="croppedImage" alt="Cropped Result" class="image" />
                                    <div class="w-full flex justify-end mt-[14px] gap-[18px]">
                                        <button @click="removeImage()"
                                            class="text-[16px] font-medium text-red-500 cursor-pointer">Usuń</button>
                                        <button @click="saveImage()" class="button-primary cursor-pointer">Zapisz</button>
                                    </div>
                                </div>
                                <div v-else>
                                    <Cropper v-show="!isLoading" ref="cropper" :src="selectedImageValue"
                                        :stencil-props="{ aspectRatio: routeName === 'panel-konto-ustawienia-moje-dane' ? 1 : 10 / 7 }"
                                        :class="['cropper']" :auto-zoom="true" :auto-detect-crop-area="false"
                                        :style="{ height: '340px', width: '100%', borderRadius: '12px', overflow: 'hidden' }" />
                                    <div class="w-full flex justify-end mt-[14px]">
                                        <button @click="getCroppedImage" class="button-primary">Gotowe</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Transition>
        </div>
    </div>
</template>

<script setup lang="ts">
import gsap from 'gsap'
import { storeToRefs } from 'pinia';
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';
import { useImage } from "@/stores/imageStore"

const imageState = useImage()
const { newImage, newImageFile } = storeToRefs(imageState)
const router = useRouter()
const imageFile = ref(null) as any
const croppedImage = ref(null) as any
const cropper = ref()
const routeName = ref() as any

const props = defineProps({
    selectedImage: {
        type: String,
        required: false,
    },
    modalActive: {
        type: Boolean,
        required: true,
    },
})

const emit = defineEmits(['close'])
const isLoading = ref(false)
const selectedImageValue = ref() as any

const getCroppedImage = async () => {
    isLoading.value = true
    croppedImage.value = cropper.value.getCanvas().toDataURL()
    const blob = dataURLtoBlob(croppedImage.value);
    imageFile.value = new File([blob], "cropcvxgvxvped_image.jpg", { type: blob.type });
    setTimeout(() => {
        isLoading.value = false
    }, 250)
}

const removeImage = () => {
    croppedImage.value = null
    newImageFile.value = ''
    newImageFile.value = ''
    emit('close')
}

watch(props, (newValue) => {
    if (newValue.modalActive == true) {
        croppedImage.value = null
        selectedImageValue.value = props.selectedImage
    } else {
        selectedImageValue.value = ''
        croppedImage.value = null
    }
})

const saveImage = () => {
    newImageFile.value = imageFile.value
    newImage.value = croppedImage.value
    emit('close', imageFile.value);
    selectedImageValue.value = null
    croppedImage.value = null

}

const handleFileInputChange = (event: Event) => {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            selectedImageValue.value = e.target?.result as string;
        }
        reader.readAsDataURL(file)
    }
}

onMounted(() => {
    console.log(router.currentRoute.value.name)
    routeName.value = router.currentRoute.value.name
})

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


.vue-advanced-cropper__background,
.vue-advanced-cropper__foreground {
    opacity: 1;
    background: black;
    transform: translate(-50%, -50%);
    position: absolute;
    top: 50%;
    border-radius: 12px;
    left: 50%;
}

.modal-down {
    background-color: white;
    border: solid transparent;
    border-radius: 16px 16px 0px 0px;
    padding: 24px;
    position: absolute;
    bottom: 10px;
    width: 100%;
    z-index: 100;
    height: 506px
}

/* Dla ekranów o szerokości 700px i większych */
@media (min-width: 700px) {
    .modal-down {
        position: fixed;
        /* Ustawienie pozycji na środku */
        top: 50%;
        height: 514px;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 16px;
        /* Zaokrąglenie na wszystkich rogach */
        // width: auto; /* Dopasowanie szerokości */
        width: 600px;
        /* Maksymalna szerokość */
        padding: 24px;
        /* Zachowanie marginesu */
        bottom: auto;
        /* Usuń wartość `bottom` */
    }
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
    padding-top: 4px;
}

.image {
    border: 1px solid $border;
    border-radius: 12px;
    margin-bottom: 16px;
    object-fit: cover;
    width: 100%;
    height: 340px;
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
        height: 340px;
    }

    .image-buttons {
        border-radius: 10px;
        width: 200px;
        height: 45px;
    }
}

@keyframes shine {
    to {
        background-position-x: -200%;
    }
}
</style>
