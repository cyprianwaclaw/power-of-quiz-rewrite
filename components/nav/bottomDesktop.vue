<template>
    <div class="border-own">
        <p class="text-[12px]">Regulamin</p>
        <p class="text-[12px]">Polityka prywatności</p>
      </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";
.border-own {
    border-top: 1px solid $primary;
    width: 100%;
    position: absolute;
    bottom: 0px;
    display: flex;
    justify-content: end;
    padding: 14px 84px;
    gap: 12px;
    cursor: default;
    color: $primary;
  }
  </style>