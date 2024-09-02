import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import { useUserStore } from './stores/user';

// actuara como un middleware
const requiresAuth = async (to, from, next) => {
	const userSt = useUserStore();
	userSt.loadingSession = true;
	const user = await userSt.currentUser();
	if (user) {
		next();
	} else {
		next('/login');
	}
	userSt.loadingSession = false;
}

const routes = [
	{ path: '/', component: Home, beforeEnter: requiresAuth }, // beforeEnter: requireAuth
	{ path: '/login', component: Login },
	{ path: '/register', component: Register },
];

const router = createRouter({ routes, history: createWebHistory() });

export default router;