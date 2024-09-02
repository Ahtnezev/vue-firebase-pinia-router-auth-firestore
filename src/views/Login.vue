<script setup>
import { useUserStore } from "../stores/user";
import { ref } from "vue";

const userStore = useUserStore();

const email = ref("");
const password = ref("");

const handleSubmit = async () => {
	if (!email.value || !password.value.length > 5) {
		return alert("Los campos son requeridos");
	}

	// TODO: Falta validar passwords xDDD
	await userStore.loginUser(email.value, password.value);
};
</script>

<template>
	<div class="row">
		<div class="col-12 col-lg-10 mx-auto">
			<h1>Login</h1>
			<form @submit.prevent="handleSubmit">
				<div class="form-group mb-2">
					<input type="text" class="form-control" placeholder="Ingrese correo" v-model.trim="email" />
				</div>
				<div class="form-group mb-2">
					<input type="text" placeholder="Ingrese contraseña" v-model.trim="password" class="form-control" />
				</div>
				<button class="btn btn-sm btn-primary" type="submit" :disabled="userStore.userLoggeado">
					Acceder
				</button>
			</form>
		</div>
	</div>
</template>