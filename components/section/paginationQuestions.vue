<template>
  <div v-if="props.isLoading" class="flex place-items-center md:justify-start justify-center -mt-[19px]">
    <div class="card is-loading">
      <div class="image" />
    </div>
  </div>
  <div v-else>
    <div class="flex place-items-center mt-[2px]" v-if="props.last_page != 1">
      <button v-if="props.current_page != 1" @click="changePage(props.current_page - 1)" class="mr-1.5">
        <Icon name="fluent:chevron-left-20-filled" size="30" class=" hover:text-black -mr-1" color="#618cfb"/>
      </button>
        <p class="text-center text-[16px]">
            {{ props.current_page }}
          </p>
      <button v-if="props.current_page != props.last_page" @click="changePage(props.current_page + 1)" class="ml-1.5">
        <Icon name="fluent:chevron-right-20-filled" size="30" class=" hover:text-black -ml-1" color="#618cfb"/>
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  last_page: {
    type: Number,
    required: true
  },
  current_page: {
    type: Number,
    required: true
  },
  isLoading: {
    type: Boolean,
    required: true,
  },
});

const router = useRouter();

const pageNumbers = (lastPage: number, currentPage: number) => {
  const pages = [];
  const pagesPerPage = 3;
  const half = Math.floor(pagesPerPage / 2);

  let startPage = currentPage - half;
  let endPage = currentPage + half;

  if (startPage < 1) {
    startPage = 1;
    endPage = pagesPerPage;
  }

  if (endPage > lastPage) {
    endPage = lastPage;
    startPage = lastPage - pagesPerPage + 1;
    if (startPage < 1) {
      startPage = 1;
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return pages;
};

const changePage = (pageNumber: number) => {
  const addParams = () => {
    return { ...router.currentRoute.value.query, page: pageNumber }
  }
  router.push({ query: addParams() })
  // scrollToTop()
}
</script>

<style lang="scss" scoped>
@import "@/assets/style/variables.scss";

.active {
  color: white !important;
  background-color: #618cfb;
  border-radius: 99px;
  height: 32px;
  width: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px 5px;
}

.page-number {
  font-size: 15px;
  color: #8d8d8d;
  padding: 0px 12px;
  cursor: pointer;

  &:hover {
    color: #211f1f;
  }
}


.card.is-loading {

  .image,
  h2,
  p {
    background: #eee;
    background: linear-gradient(110deg, #c7c7c7 8%, #d4d4d4 18%, #c7c7c7 33%);
    border-radius: 5px;
    background-size: 300% 100%;
    animation: 1.6s shine linear infinite;
  }

  .image {
    height: 32px;
    width: 80px;
    border-radius: 8px;
  }

  h2 {
    height: 30px;
  }

  p {
    height: 70px;
  }
}

@keyframes shine {
  to {
    background-position-x: -200%;
  }
}
</style>
