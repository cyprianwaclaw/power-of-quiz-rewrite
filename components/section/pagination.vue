<template>
  <div class="flex place-items-center md:justify-start justify-center mt-20" v-if="props.last_page != 1">
    <button v-if="props.current_page != 1" @click="changePage(props.current_page - 1)" class="mr-2">
      <Icon name="fluent:chevron-left-20-filled" size="27" class="-mt-1 text-gray-400 hover:text-black" />
    </button>
    <div v-if="props.last_page > 3 && props.current_page > 2" class="flex">
      <p class="page-number" @click="changePage(1)" :class="{ active: 1 == props.current_page }">
        1
      </p>
      <p class="cursor-default mx-2">...</p>
    </div>
    <div v-for="(page, index) in pageNumbers(props.last_page, props.current_page)" :key="index">
      <p class="page-number" @click="changePage(page)" :class="{ active: page == props.current_page }">
        {{ page }}
      </p>
    </div>
    <div v-if="props.last_page > 3 && props.current_page < props.last_page - 1" class="flex">
      <p class="cursor-default mx-2">...</p>
      <p class="page-number" @click="changePage(props.last_page)"
        :class="{ active: props.last_page == props.current_page }">
        {{ props.last_page }}
      </p>
    </div>
    <button v-if="props.current_page != props.last_page" @click="changePage(props.current_page + 1)" class="ml-2">
      <Icon name="fluent:chevron-right-20-filled" size="27" class="-mt-1 text-gray-400 hover:text-black" />
    </button>
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
    return { ...router.currentRoute.value.query, page: pageNumber };
  };
  router.push({ query: addParams() });
};
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
</style>
