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

	await userStore.registerUser(email.value, password.value);
}
</script>

<template>
	<div class="row">
		<div class="col-12 col-lg-10 mx-auto">
			<h1 class="display-4">Register</h1>
			<form @submit.prevent="handleSubmit">
				<div class="form-group mb-2">
					<input type="text" placeholder="Ingrese correo" class="form-control" v-model.trim="email">
				</div>
				<div class="form-group mb-2">
					<input type="text" placeholder="Ingrese contraseña" class="form-control" v-model.trim="password">
				</div>
				<button class="btn btn-sm btn-success" type="submit" :disabled="userStore.userLoggeado">Crear usuario</button>
			</form>
		</div>
	</div>
</template>