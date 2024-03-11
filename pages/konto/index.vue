<template>
    <div>
<p>jestes zalogowany</p>
    </div>
</template>

<script setup lang="ts">

definePageMeta({
  middleware: "auth",
});


</script>

<style scoped lang="scss">
$one: red;

.test1 {
  color: $one;
}
</style>
