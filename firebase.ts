import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyAfm1T3XyX8qFaDTyHbXWxt88xWI_eutIA',
	authDomain: 'streaming-service-clone.firebaseapp.com',
	projectId: 'streaming-service-clone',
	storageBucket: 'streaming-service-clone.appspot.com',
	messagingSenderId: '658990616027',
	appId: '1:658990616027:web:843b6a77f032a08378ebfe',
	measurementId: 'G-QLCW5QG7JL',
};

const FireApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const FireDB = getFirestore();
const FireAuth = getAuth();

export default FireApp;
export { FireAuth, FireDB };
