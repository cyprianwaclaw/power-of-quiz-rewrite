<template>
    <h2 class="text-2xl md:text-3xl flex place-items-center font-medium">
        Moje konto
    </h2>
    <div class="md:hidden flex flex-col mb-4">
        <div class="columns-2 flex gap-5 mt-5">
            <NuxtLink to="/panel/konto/moje-quizy" class="retangle gold">
                <Icon name="ph:game-controller-fill" color="D19D38" size="34" />
                <p class="retangle-title family">Quizy</p>
            </NuxtLink>
            <NuxtLink to="/panel/konto/srodki" class="retangle blue">
                <Icon name="ph:wallet-fill" color="2B3BC7" size="34" />
                <p class="retangle-title family">Środki</p>
            </NuxtLink>
        </div>
        <NuxtLink to="/panel/konto/platnosci" class="retangle green flex flex-col">
            <Icon name="ph:newspaper-fill" color="38D1AC" size="34" />
            <p class="retangle-title family mb-1 text-black">Faktury i płatności</p>
        </NuxtLink>
    </div>
    <div class="bg-white py-5 px-8 rounded-3xl relative mb-[38px]">
        <SectionCardPackage />
    </div>
    <SectionCardStatistic />
</template>
<script lang="ts" setup>
definePageMeta({
  pageTransition: {
    name: 'rotate'
  }
})
</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";

.retangle {
    padding: 16px 16px 16px 23px;
    margin-bottom: 20px;
    border-radius: 8px;
    width: 100%;
}

.retangle-title {
    font-size: 16px;
    font-weight: 500;
    margin-top: 6px;
}

.green {
    background: rgba(56, 209, 172, 0.17);
}

.gold {
    background: rgba(209, 157, 56, 0.17);
}

.blue {
    background: rgba(43, 59, 199, 0.17);
}
</style>
