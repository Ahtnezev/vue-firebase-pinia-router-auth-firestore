import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore/lite';
import { defineStore } from 'pinia';
import { auth, db } from '../firebaseConfig';
import { nanoid } from 'nanoid';
import router from '../router';

export const useDatabaseStore = defineStore('database', {
	state: () => ({
		documents: [],
		loadingDoc: false,
	}),
	actions: {
		// https://firebase.google.com/docs/firestore/query-data/get-data
		async getUrls() {
			// para evitar que se hagan mas peticiones
			if (this.documents.length != 0) return;

			this.loadingDoc = true;
			try {
				const q = query(collection(db, 'urls'), where('user', '==', auth.currentUser.uid)); 
				const querySnapshot = await getDocs(q);
				querySnapshot.forEach(doc => {
					// console.log(doc.id, doc.data());
					// >< ojito aqui con el uso del push
					this.documents.push({ id: doc.id, ...doc.data() });
				});
			} catch (e) {
				console.log(e);
			} finally {
				this.loadingDoc = false;
			}
		},
		async addUrl(name) {
			try {
				const objectDoc = {
					name: name,
					short: nanoid(6),
					user: auth.currentUser.uid
				};
				const docRef = await addDoc(collection(db, 'urls'), objectDoc);
				// console.log(docRef.id);
				this.documents.push({
					...objectDoc,
					id: docRef.id
				})
			} catch (error) {
				console.log(error);
			}
		},
		async readUrl (id) {
			try {
				const docRef = doc(db, "urls", id);
				const docSpan = await getDoc(docRef);

				if (!docSpan.exists()) throw new Error('No existe el doc');
				if (docSpan.data().user !== auth.currentUser.uid) throw new Error('⚠️ ¡Unauthorized!');

				return docSpan.data().name;
			} catch (error) {
				console.log(error.message);
			}
		},
		async updateUrl(id, name) {
			try {
				const docRef = doc(db, 'urls', id);
				const documento = await getDoc(docRef);

				if (!documento.exists()) throw new Error('No existe el doc');
				if (documento.data().user !== auth.currentUser.uid) throw new Error('⚠️ ¡Unauthorized!');
				
				await updateDoc(docRef, {
					name: name
				});

				this.documents = this.documents.map( item =>
						item.id === id
							? ({...item, name: name})
							: item );

				router.push('/');

			} catch (error) {
				console.log(error.message);
			}
		},
		async deleteDoc(id) {
			try {
				const docRef = doc(db, 'urls', id);

				// verificamos que la referencia pertenece al usuario
				const documento = await getDoc(docRef);

				if (!documento.exists()) throw new Error('No existe el doc');
				if (documento.data().user !== auth.currentUser.uid) throw new Error('⚠️ ¡Unauthorized!');
				
				await deleteDoc(docRef);
				this.documents = this.documents.filter(item => item.id !== id);
			} catch (error) {
				console.log(error);
			}
		}
	},
},
);