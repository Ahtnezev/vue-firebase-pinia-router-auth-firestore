import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyC6YSZK01fCw_XTwz1cYuUW6TFo8MnZcKY",
	authDomain: "vue-3-login-29426.firebaseapp.com",
	projectId: "vue-3-login-29426",
	storageBucket: "vue-3-login-29426.appspot.com",
	messagingSenderId: "856696025809",
	appId: "1:856696025809:web:e894abb2ce97b655d44bf0"
};

initializeApp(firebaseConfig);
const auth = getAuth();

//~ Firebase docs: https://firebase.google.com/docs/auth/web/password-auth
export  { auth }
