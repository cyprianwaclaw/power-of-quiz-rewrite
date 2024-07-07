<template>
  <SectionMobileSearch :modalActive="openModalSearch" @close="isClickSearch" />
  <div class="fixed z-20 w-full">
    <div
      class="sticky flex bg-white border place-items-center justify-between h-16 border-b-gray-300 z-40 px-6 xl:gap-[100px] md:gap-[24px]">
      <div class="flex items-center shrink-0">
        <img @click="clickLogo" src="@/assets/file/logo.png" class="w-[175px] mr-14" />
        <div v-for="(page, index) in links" :key="index" class="mr-7 hidden lg:flex">
          <NuxtLink :to="page.link" class="flex gap-7">
            <p class="text-[#464646] font-semibold whitespace-nowrap hover:text-black">
              {{ page.name }}
            </p>
          </NuxtLink>
        </div>
      </div>
      <div class="flex md:hidden">
        <button @click="isClickSearch" class="justify-end flex">
          <Icon :name="openModalSearch ? 'carbon:close' : 'ph:magnifying-glass-light'" size="31" class="search-icon" />
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
// import { useQuiz } from "@/store/useQuiz";
// import { usePersistCart } from "@/utils/hooks";

// const isOpen = ref(false);
// const Modal = () => {
//   isOpen.value = !isOpen.value;
// };

// const openMenu = ref(false);
// const openMenuDesktop = (value: any) => {
//   openMenu.value = value;
//   // return value
// };

const router = useRouter();
// const { allQuizName, popularQuiz, loadingQuiz, categories } = storeToRefs(quiz);
// const openSearch = ref(false);
// await quiz.getCategory();
// const results = ref(false);
// const search: any = ref();
// usePersistCart();

// let category = categories.value;
// const allCategories: any = ref();

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
  // { name: "Zaproś znajomych", link: "/panel/zaproszeni" },
  // { name: "Dodaj nowy", link: "/panel/quiz/dodaj-nowy" },
  { name: "Quizy", link: "/panel/quiz" },

  { name: "Zaproś znajomych", link: "/" },
  { name: "Dodaj nowy", link: "/" },
];

// const searchInput: any = computed(() => {
//   return allQuizName.value.filter((quiz: any) =>
//     quiz.title.toLowerCase().includes(search.value)
//   );
// });

// watch(search, async (newValue: any) => {
//   if (newValue.length > 0) {
//     await quiz.getAllName();
//   }
// });

// watch(searchInput, async (newValue: any) => {
//   if (newValue.length) {
//     results.value = false;
//   } else {
//     results.value = true;
//   }
// });

// watch(openSearch, async (newValue: any) => {
//   if (newValue) {
//     await quiz.getPopularQuiz();
//     document.body.style.overflow = "hidden";
//     document.body.style.userSelect = "none";
//   } else {
//     document.body.style.overflow = "auto";
//     document.body.style.userSelect = "auto";
//   }
// });

</script>
<style scoped lang="scss">
@import "@/assets/style/variables.scss";

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
