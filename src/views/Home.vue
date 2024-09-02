<script setup>
import { useUserStore } from '../stores/user';

const userSt = useUserStore();
</script>

<template>
  <div>
    <h1>Home</h1>
    <p>{{ userSt.userData?.email }}</p>
  </div>
</template>