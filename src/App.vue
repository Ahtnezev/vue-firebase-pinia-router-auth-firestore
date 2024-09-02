<script setup>
import { useUserStore } from './stores/user';

const userSt = useUserStore();

const logout = async() => await userSt.logoutUser();

</script>

<template>
  <div class="container mt-3">
    <h1 class="display-4 mb-3">App base</h1>
    <nav class="mb-4" v-if="!userSt.loadingSession">
      <router-link class="btn btn-sm btn-outline-primary" to="/" v-if="userSt.userData">Home</router-link> |
      <router-link class="btn btn-sm btn-outline-success" to="/register" v-if="!userSt.userData">Register</router-link> |
      <router-link class="btn btn-sm btn-outline-secondary" to="/login" v-if="!userSt.userData">Login</router-link> |
      <button class="btn btn-sm btn-outline-danger" @click="logout" v-if="userSt.userData">Logout</button>
    </nav>
    <div v-else class="text-info">Loading user...</div>

    <!-- Con solo colocar router-view nos traemos el componente segun lo hayamos registrado en nuestras rutas -->
    <router-view></router-view>
  </div>
</template>