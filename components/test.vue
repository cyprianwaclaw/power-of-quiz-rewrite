<template>
  <div>
    <pre>
            {{ user }}
        </pre
    >
  </div>
</template>

<script setup lang="ts">
import { useUser } from "@/stores/useUser";

const userState = useUser();

// const currentUser = userState?.user;

const { user } = storeToRefs(userState);

// await userState.login();
</script>

<style scoped></style>
