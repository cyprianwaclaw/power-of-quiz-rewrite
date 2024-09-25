<template>
    <div>
        <h1>Image Cropper Example</h1>
        <Cropper ref="cropper" :src="imageUrl" :stencil-props="{ aspectRatio: 1 }" :class="['cropper']" :auto-zoom="true"
            :auto-detect-crop-area="true" />
        <button @click="getCroppedImage">Get Cropped Image</button>
        <div v-if="croppedImage">
            <h2>Cropped Image:</h2>
            <img :src="croppedImage" alt="Cropped Result" />
            {{ croppedImage }}
            {{ somePhotoData }}
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';
const axiosInstance = useNuxtApp().$axiosInstance as any


const imageUrl = ref('https://images.unsplash.com/photo-1540804485132-9c94bcae6c66?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'); // URL obrazu z internetu
const croppedImage = ref(null) as any
const cropper = ref()

const somePhotoData = ref()


const dataURLtoBlob1 = (dataURL: string) => {
    const byteString = atob(dataURL.split(',')[1]);
    const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
};


const getCroppedImage = async () => {
    // if (cropper) {
    croppedImage.value = cropper.value.getCanvas().toDataURL(); // Pobranie przyciętego obrazu

    const blob = dataURLtoBlob(croppedImage.value);
    const file = new File([blob], "cropcvxgvxvped_image.jpg", { type: blob.type });

    const formData = new FormData();
    formData.append("avatar", file);
    // formData.append("avatar", file);
    // formData.append("title", 'file');
    // formData.append("title", "Example Title");
    // somePhotoData.value = file
    for (let [key, value] of formData.entries()) {
        console.log(key, value);
    }
    console.log(formData)
    await axiosInstance.post('/user/uploadAvatar', formData, {
    // await axiosInstance.post('/quizzes/6/image', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            // 'Cache-Control': 'no-cache',
        }
    }).then(response => {
          console.log(file)
        console.log(response.data);
    }).catch(error => {
        console.error('Wystąpił błąd:', error);
        if (error.response) {
            console.error('Data:', error.response.data);
            console.error('Status:', error.response.status);
            console.error('Headers:', error.response.headers);
        } else {
            console.error('Błąd przy wysyłaniu żądania:', error.message);
        }
    });
}
// }
</script>

<style lang="scss" scoped>
.cropper {
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;
}
</style>