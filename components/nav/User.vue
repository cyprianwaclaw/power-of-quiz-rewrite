<template>
  <SectionMobileSearch :modalActive="openModalSearch" @close="isClickSearch" />
  <div class="fixed z-20 w-full">
    <div
      class="sticky flex bg-white  place-items-center justify-between h-16 border-own z-40 px-6 md:px-12 xl:gap-[100px] md:gap-[24px]">
      <div class="flex items-center shrink-0 justify-between w-full">
        <div @click="clickLogo" class="cursor-pointer">
          <NavLogo />
        </div>
        <div class="hidden md:flex gap-[10px] place-items-center md:gap-4">
          <div v-for="(page, index) in links" :key="index" class="mr-4">
            <NuxtLink :to="page.link" class="flex gap-7">
              <p class="text-[#464646] font-semibold whitespace-nowrap hover:text-black">
                {{ page.name }}
              </p>
            </NuxtLink>
          </div>
          <NavOpenMenu />
        </div>
        <div class="flex md:hidden -mr-1">
          <button @click="isClickSearch" class="justify-end flex">
            <Icon :name="openModalSearch ? 'carbon:close' : 'ph:magnifying-glass-light'" size="31" class="search-icon" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const router = useRouter();
const openModalSearch = ref(false);
const isClickSearch = () => {
  openModalSearch.value = !openModalSearch.value;
}

const clickLogo = () => {
  if (!openModalSearch.value) {
    router.push('/panel')
  }
}

const links = [
  { name: "Quizy", link: "/panel/quiz" },
  { name: "Konkursy", link: "/panel/quiz?section=konkursy" },
]

</script>
<style scoped lang="scss">
@import "@/assets/style/variables.scss";

.border-own {
  border-bottom: 1px solid rgb(229 231 235);
}

@media only screen and (max-width: 770px) {
  .size-logo {
    width: 175px;
  }

  .paddingbottom {
    padding-bottom: 250px;
  }

  .background_gradient {
    background-color: $color-error;
    height: 80px;
    bottom: 190px;
    background: linear-gradient(179.73deg, rgba(255, 255, 255, 0) 11.43%, #ffffff 70.53%);
  }

  .serach_color {
    background-color: $primary;
    border-radius: 8px;
    width: 54px;
    position: absolute;
    top: 32px;
    right: 24px;
    height: 43px;
    margin-top: 4px;
  }

  .serach_color_disabled {
    background-color: #aec5ff;
    border-radius: 8px;
    width: 54px;
    position: absolute;
    top: 32px;
    right: 24px;
    height: 43px;
    margin-top: 4px;
  }

  .search_icon_color {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .serach-vmodel {
    font-weight: 500;
    letter-spacing: 0.02em;
    text-decoration-line: underline;
    color: $text-black;
  }

  .last-search {
    color: $text-gray;
    font-size: 15px;
  }

  .last-search:active {
    color: $text-black;
    font-size: 15px;
    text-decoration-line: underline;
  }

  .text-click {
    -webkit-tap-highlight-color: transparent;
    text-decoration-line: underline;
    border-radius: 20px;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
}

.search-icon {
  color: #adadad;
}
</style>
