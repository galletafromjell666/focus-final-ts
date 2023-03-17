import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyB65RB8nQM75Q5El4voaVIxWtwS2tUhRAo',
    authDomain: 'focus-final-b46fc.firebaseapp.com',
    projectId: 'focus-final-b46fc',
    storageBucket: 'focus-final-b46fc.appspot.com',
    messagingSenderId: '194368297965',
    appId: '1:194368297965:web:baff447252b6ea921e25e4',
    measurementId: 'G-R7ZT7WT3H1'
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db, app };

