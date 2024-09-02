<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useDatabaseStore } from '../stores/database';

const dbSt = useDatabaseStore();
const route = useRoute();
// console.log(route.params);
const handleSubmit = () => {
	dbSt.updateUrl(route.params.id, url.value);	
}

const url = ref('');
onMounted( async() => {
	url.value = await dbSt.readUrl(route.params.id);
});

</script>

<template>
	<div class="container">
		<div class="row">
			<div class="col-12 col-lg-10 mx-auto">
				<h1>Editar id: {{ $route.params.id }}</h1>
				<form @submit.prevent="handleSubmit">
					<div class="row">
						<div class="col-12 col-md-6">
							<input type="text" placeholder="Ingrese URL" class="form-control" v-model.trim="url">
						</div>
					</div>
					<button type="submit" class="btn btn-sm btn-success mt-2">Editar</button>
				</form>
			</div>
		</div>
	</div>
</template>

<style>
	
</style>