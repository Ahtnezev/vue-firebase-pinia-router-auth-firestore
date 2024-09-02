<script setup>
import { ref } from 'vue';
import { useDatabaseStore } from '../stores/database';
import { useUserStore } from '../stores/user';
import { useRouter } from 'vue-router';

// init const[s]
const router = useRouter();
const userSt = useUserStore();
const databaseSt = useDatabaseStore();

// 
databaseSt.getUrls();

//
const url = ref('');
const handleSubmit = async () => {
  // ? validacionesde url
  if (url.value == '') return;
  await databaseSt.addUrl(url.value);
  url.value = '';
}
</script>

<template>
  <div class="row">
    <div class="col-12 col-lg-10 mx-auto">
      <h1>Home</h1>
      <p>{{ userSt.userData?.email }}</p>

      <form class="d-flex align-items-center" @submit.prevent="handleSubmit">
        <input type="text" placeholder="Ingrese URL" class="form-control" v-model.trim="url">
        <button type="submit" class="btn btn-sm btn-primary">Agregar</button>
      </form>

      <h5 v-if="databaseSt.loadingDoc" class="display-4 text-secondary text-center mt-4">Loading docs...</h5>
      <ul class="list-group list-group-flush" v-else>
        <!-- `of` para arrays, `in` para objects -->
        <li class="list-group-item" v-for="item of databaseSt.documents" :key="item.id">
          {{ item.id }} <br>
          {{ item.name }} <br>
          {{ item.short }} <br>
          <button class="btn btn-sm btn-danger me-2" @click="databaseSt.deleteDoc(item.id)">Delete</button>
          <button class="btn btn-sm btn-success" @click="router.push(`/edit/${item.id}`)">Editar</button>
        </li>
      </ul>
    </div>
  </div>
</template>