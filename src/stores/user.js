import { defineStore } from 'pinia';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import router from '../router';
import { useDatabaseStore } from './database';

export const useUserStore = defineStore('userStore', {
	state: () => ({
		userData: null,
		userLoggeado: false,
		loadingSession: false,
	}),
	// Con los actions podemos modificar el estado de la property
	actions: {
		async registerUser(email, password) {
			this.userLoggeado = true;
			try {
				const { user } = await createUserWithEmailAndPassword(
					auth,
					email,
					password
				);
				// console.log(user);
				this.userData = { email: user.email, uid: user.uid };
				router.push('/');
			} catch (error) {
				console.log(error);
			} finally {
				this.userLoggeado = false;
			}
		},
		async loginUser(email, password) {
			this.userLoggeado = true;
			try {
				const { user } = await signInWithEmailAndPassword(auth, email, password);
				this.userData = {
					email: user.email,
					uid: user.uid
				};
				// Una vez que se registra el usuario lo empujamos a la ruta /
				router.push('/');
			} catch (error) {
				console.log(error);
			} finally {
				this.userLoggeado = false;
			}
		},
		async logoutUser() {
			//~ Accediendo al otros store
			const databaseSt = useDatabaseStore();
			databaseSt.$reset();
			try {
				await signOut(auth);
				this.userData = null;
				router.push('/login');
			} catch (error) {
				console.log(error);
			}
		},
		currentUser() {
			// onAuthStateChanged no retorna una promesa, así que creamos una manualmente
			return new Promise((resolve, reject) => {
				onAuthStateChanged(auth, (user) => {
					// console.log(user);
					if (user) {
						this.userData = { email: user.email, uid: user.uid };
					} else {
						this.userData = null;
						const databaseSt = useDatabaseStore();
						databaseSt.$reset();
					}
					// este resolve hará un return del user 
					resolve(user);
				},
					(e) => reject(e))
			})
		},
	},
});