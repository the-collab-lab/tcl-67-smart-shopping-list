import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyA6yYYswBwx-CF1n95JedqJhLEzNTJpsZ4',
	authDomain: 'tcl-67-smart-shopping-list.firebaseapp.com',
	projectId: 'tcl-67-smart-shopping-list',
	storageBucket: 'tcl-67-smart-shopping-list.appspot.com',
	messagingSenderId: '750525886413',
	appId: '1:750525886413:web:a0cd06dd24d9ad715f1e84',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
