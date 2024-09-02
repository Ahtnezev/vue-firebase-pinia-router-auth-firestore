<script setup>
import { useUserStore } from "../stores/user";
import { ref } from 'vue';

const userStore = useUserStore();

const email = ref('');
const password = ref('');

const handleSubmit = async () => {
	if (!email.value || !password.value.length > 5) {
		return alert('Los campos son requeridos');
	}

	// TODO: Falta validar passwords xDDD
	await userStore.loginUser(email.value, password.value);
}
</script>

<template>
	<div>
		<h1>Login</h1>
		<form @submit.prevent="handleSubmit">
			<input type="text" placeholder="Ingrese correo" v-model.trim="email">
			<input type="text" placeholder="Ingrese contraseña" v-model.trim="password">
			<button type="submit" :disabled="userStore.userLoggeado">Acceder</button>
		</form>
	</div>
</template>