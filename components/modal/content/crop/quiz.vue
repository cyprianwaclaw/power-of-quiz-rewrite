<template>
  <div>
    <div v-if="selectedImage">
      <div class="cropper-container" ref="cropperContainer">
        <img :src="selectedImage" alt="Selected Image" @load="initializeCropper" />
      </div>
    </div>
    <div v-else>
      <div class="white-retangle-image flex md:w-[350px] lg:w-[450px] 2xl:w-[550px]">
        <label class="image-retangle md:h-[300px] md:mt-3">
          <Icon
            name="carbon:cloud-upload"
            size="38"
            color="9F9F9F"
            class="justify-center flex w-full -mb-4 mt-3 md:mt-12"
          />
          <input
            type="file"
            ref="input"
            @change="handleFileInputChange"
            accept="image/*"
            class="default-file-input"
          />
          <h1 class="flex md:hidden cursor-pointer">Kliknij tutaj aby dodać zdjęcie</h1>
          <h1 class="hidden md:flex justify-center cursor-pointer">Kliknij tutaj aby dodać zdjęcie,<br> lub upusc tutaj zdjecie</h1>
        </label>
      </div>
    </div>
    <div v-if="croppedImage" class="mt-[5px] mx-[3px]">
      <div class="flex justify-between mt-[16px] mb-[5px]">
          <p class="font-semibold text-sm red cursor-pointer" @click="removeImage()">Usuń</p>
          <p  @click="cropImage()" class="font-semibold text-sm primary-color cursor-pointer">Ustaw zdjęcie</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";

const emits = defineEmits(["croppedFile", "croppedImageData", "close"]);

const selectedImage = ref<any>("");
const croppedImage = ref("");
const cropperInstance = ref<any>(null);
const cropperContainer = ref<any>(null);
const handleFileInputChange = (event: any) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = () => {
    selectedImage.value = reader.result;
  };

  if (file) {
    reader.readAsDataURL(file);
  }
};

const initializeCropper = () => {
  const imgElement = cropperContainer.value.querySelector("img");
  cropperInstance.value = new Cropper(imgElement, {
    aspectRatio: 16 / 9,
    autoCrop: true,
    autoCropArea: 0.5,
    viewMode: 3,
    crop: () => {
      const canvas = cropperInstance.value.getCroppedCanvas();
      croppedImage.value = canvas.toDataURL("image/jpeg");
    },
  });
};

const cropImage = () => {
  if (cropperInstance.value) {
    cropperInstance.value.destroy();
    cropperInstance.value = null;

    if (croppedImage.value) {
      const blob = dataURLtoBlob(croppedImage.value);
      const file = new File([blob], "cropped_image.jpg", { type: blob.type });

      emits("close");
      emits("croppedImageData", croppedImage.value);
      emits("croppedFile", file);
    }
  }
};

const removeImage = () => {
  selectedImage.value = null
};

onMounted(() => {
  if (selectedImage.value) {
    initializeCropper();
  }
});
</script>

<style scoped lang="scss">
@import "@/assets/style/_variables.scss";
.image-retangle {
  display: flex;
  flex-direction: column;
  padding: 36px 37px;
  background: #f7f7f7;
  border: 2px dashed #9f9f9f;
  border-radius: 16px;
}

input[type="file"]::file-selector-button {
  display: hidden;
}
input[type="file"] {
  border: none;
  display: flex;
  justify-content: center;
}
.image-retangle h1 {
  text-align: center;
  margin-top: -6px;
  font-weight: 600;
  color: #9c9c9c;
}
.image-retangle p {
  text-align: center;
  margin-top: 2px;
  font-weight: 400;
  font-size: 14px;
  color: #9c9c9c;
  margin-bottom: 12px;
}
.white-retangle-image {
  background-color: white;
  border-radius: 24px;
}
.quest-text {
  font-size: 16px;
  margin-left: 28px;
  margin-top: 6px;
  margin-bottom: 6px;
  font-weight: 600;
}
.margin {
  margin-top: 36px;
}
.vl {
  border-left: 1px solid #e0e0e0 !important;
  margin-top: 3px;
  margin-bottom: 3px;
}

.edit-quest {
  font-size: 13px;
  font-weight: 500;
  text-align: end;
  padding: 12px 25px 5px 12px;
}

textarea {
  outline: none;
  font-size: 16px;
  font-weight: 500;
  width: 100%;
  overflow: hidden;
  min-height: 30px;
  max-height: 100px;
  border-color: white;
}
textarea::placeholder {
  font-size: 16px;
}
textarea:focus::placeholder {
  font-size: 0px;
}

input {
  outline: none;
  font-size: 16px;
  width: 100%;
  overflow: hidden;
  min-height: 30px;
  padding: 0px;
  max-height: 100px;
  font-weight: 500;
  border-color: white;
}
input::placeholder {
  font-size: 16px;
}
input:focus::placeholder {
  font-size: 0px;
}

.default-file-input {
  opacity: 0;
}

input[type="radio"] {
  border-radius: 50%;
  width: 24px;
  height: 3px;
  margin-right: 14px;
  position: relative;
}

.imagehidden {
  display: none;
}

.cropper-container {
  height: 270px;
  width: 100%;
}
.after-upload {
  border: 1px solid $border;
  border-radius: 2000px;
  display: flex;
  justify-content: center;
  height: 200px;
  width: 200px;
}
</style>
