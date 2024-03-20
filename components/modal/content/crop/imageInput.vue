<template>
    <ModalDown 
    :modalActive="isOpenMobile"
    title="Dodaj zdjęcie" @close="isModalClose()">
      <template #content>
        <LazyModalContentCropQuiz
          @croppedFile="handleCroppedFile"
          @croppedImageData="handleCroppedImageData"
          @close="isModalClose()"
        />
      </template>
    </ModalDown>

    <ModalAlert
    :modalActive="isOpenDesktop"
    @close="isModalClose()"
  >
  <template #content>
    <LazyModalContentCropQuiz
    @croppedFile="handleCroppedFile"
    @croppedImageData="handleCroppedImageData"
    @close="isModalClose()"
  />
    </template>
  </ModalAlert>
    <div v-if="props.image">
      <div class="flex justify-end mt-[14px]" v-if="!croppedImageNew">
        <button @click="changeImage()">
          <p class="font-semibold text-sm primary-color ">Zmień zdjęcie</p>
        </button>
      </div>
      <div v-else>
        <img :src="croppedImageNew" class="after-upload" />
        <div class="flex justify-between mt-[14px] mb-[5px]">
          <button @click="removeImage()">
            <p class="font-semibold text-sm red">Usuń</p>
          </button>
          <button @click="changeImage()">
            <p class="font-semibold text-sm primary-color">Zmień zdjęcie</p>
          </button>
        </div>
      </div>
    </div>
      <div v-else>
        <div class="white-retangle-image" @click="isModal()" v-if="!croppedImageNew">
          <label class="image-retangle md:mt-3">
            <Icon
            name="carbon:cloud-upload"
            size="38"
            color="9F9F9F"
            class="justify-center flex w-full mb-2"
            />
            <div class="default-file-input" />
            <h1>Dodaj zdjęcie</h1>
          </label>
        </div>
        <div v-else>
          <img :src="croppedImageNew" class="after-upload" />
          <div class="flex justify-between mt-[16px] mb-[5px]">
            <button @click="removeImage()">
              <p class="font-semibold text-sm red">Usuń</p>
            </button>
            <button @click="changeImage()">
              <p class="font-semibold text-sm primary-color">Zmień zdjęcie</p>
            </button>
          </div>
        </div>
      </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["close", "imageFile"]);
const props = defineProps({
  image:{
    type: Boolean,
    default: false
  },
 test:{
    type: String,
    default: false
  }
})

const isOpenMobile = ref(false);
const isOpenDesktop = ref(false);

const isModal = () => {
  if (window.screen.width <= 900) {
    isOpenMobile.value = true;
  } else {
    isOpenDesktop.value = true;
  }
};

const isModalClose = () => {
  if (window.screen.width <= 900) {
    isOpenMobile.value = false;

  } else {
    isOpenDesktop.value = false;
  }
};

const propsImage = ref(props.image)

watch(props,(newValue)=>{
  if(newValue.test==='brak'){
    removeImage()
  }
})

const croppedFile = ref<File | null>(null);
const croppedImageNew = ref<any | null>(null);

const handleCroppedFile = (file: File) => {
  croppedFile.value = file;
  emit("imageFile", file)
};
const handleCroppedImageData = (croppedImage: any) => {
  croppedImageNew.value = croppedImage;
};

const changeImage = () => {
  croppedFile.value = null;
  croppedImageNew.value = null;
  console.log('zmieniono')
  isModal()
}

const removeImage = () => {
  croppedFile.value = null;
  emit("imageFile", null)
  croppedImageNew.value = null;
}
</script>

<style scoped lang="scss">
@import "@/assets/style/_variables.scss";
.image-retangle {
  display: flex;
  flex-direction: column;
  padding: 35px 35px;
  background: #f7f7f7;
  border: 2px dashed #9f9f9f;
  border-radius: 16px;
  margin-bottom: 0px;
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
  padding: 24px;
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

.after-upload {
    border: 1px solid $border;
    border-radius: 16px;
    display: flex;
    justify-content: center;
    height: 240px;
    width: 100%;
  }
</style>
