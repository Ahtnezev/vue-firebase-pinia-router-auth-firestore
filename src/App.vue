<script setup>
import { useUserStore } from './stores/user';

const userSt = useUserStore();

const logout = async() => {
  await userSt.logoutUser();
}
</script>

<template>
  <div>
    <h1>App base</h1>
    <nav v-if="!userSt.loadingSession">
      <router-link to="/" v-if="userSt.userData">Home</router-link> |
      <router-link to="/register" v-if="!userSt.userData">Register</router-link> |
      <router-link to="/login" v-if="!userSt.userData">Login</router-link> |
      <button @click="logout" v-if="userSt.userData">Logout</button>
    </nav>
    <div v-else>Loading user...</div>

    <!-- Con solo colocar router-view nos traemos el componente segun lo hayamos registrado en nuestras rutas -->
    <router-view></router-view>
  </div>
</template>