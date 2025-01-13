<template>
  <div class="hidden md:flex">
    <div @mouseenter="showMenu" @mouseleave="showMenu">
      <div class=" flex gap-[12px] place-items-center cursor-pointer">
        <SectionUserAvatar :size="36" :avatar="user?.avatar" />
        <!-- <div class="flex flex-col">
          <p class="text-[15px] flex place-items-center font-medium -mb-[2px]">
            {{ user?.user_name ? user?.user_name : '' }} {{ user?.user_surname ? user?.user_surname : '' }}
          </p>
          <div v-if="hasPremium ? true : false" class="flex place-items-center gap-[4px]">
            <Icon name="fa:diamond" size="15" class="primary-color" />
            <p class="text-[12px] primary-color font-semibold">PREMIUM</p>
          </div>
          <div v-else>
            <p class="text-[12px] text-gray">Standard</p>
          </div>
        </div> -->
      </div>
      <div class="absolute right-[24px] pt-[21px]" v-if="isOpen">
        <div class="modal-menu">
          <div class="flex flex-col gap-[7px]">
            <div v-for="link in linksArray" :key="link.name">
              <div @click="showMenuLink(link.link)">
                <p class="modal-menu-item">
                  {{ link.name }}
                </p>
              </div>
            </div>
          </div>
          <div class="mt-[21px] pt-[21px] border-t border-gray-300">
            <NuxtLink to="/panel/plan-premium" @click="showMenu" v-if="!hasPremium ? true : false"
              class="flex place-items-center w-full justify-between mb-[10px]">
              <div class="flex place-items-center gap-[4px]">
                <Icon name="fa:diamond" size="18" class="primary-color" />
                <p class="text-[14px] primary-color font-semibold">Bądź PREMIUM</p>
              </div>
              <Icon name="ph:arrow-right-bold" size="21" class="primary-color" />
            </NuxtLink>
            <div class="flex w-full justify-between place-items-center">
              <p class="text-[16px] font-medium cursor-default">Punkty: <span class="">{{ user.points }}</span></p>
              <NuxtLink to="/panel/plan-premium" @click="showMenu" v-if="user.points > 0">
                <p class="primary-color text-[12px] hover:underline">
                  Wypłać
                </p>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useUser } from "@/stores/useUser"
const route = useRoute()
const router = useRouter()

const userState = useUser()
const { user, hasPremium } = storeToRefs(userState)
const isOpen = ref(false)

const showMenu = () => {
  isOpen.value = !isOpen.value
}

const linksArray = [
  { name: "Zaproś znajomych", link: "/panel/zaproszeni" },
  { name: "Dodaj quiz", link: "/panel/quiz/dodaj-nowy" },
  { name: "Dodaj konkurs", link: "/panel/konto/konkursy/nowy" },
  { name: "Moje konto", link: "/panel/konto" },
  { name: "Ustawienia", link: "/panel/konto/ustawienia" },
]

const showMenuLink = (routeName: string) => {
  let routeCurrent = route?.name as any
  if ('/' + routeCurrent.replace(/-/g, "/") !== routeName) {
    console.log("other route name")
    router.push(routeName)
  }
  showMenu()
}
</script>
<style lang="scss" scoped>
.modal-menu {
  background: white;
  width: 240px;
  padding: 20px 24px;
  border-radius: 12px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

}

.modal-menu-item {
  color: rgb(46, 40, 40);
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    color: #7c7c7c;
    text-decoration: underline;
  }
}
</style>