import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { app } from '../../firebase';
import { Application } from '../../interfaces/Application';

async function submitAppToFirebase(data: Application) {
    try {
        const db = getFirestore(app);
        const applicationsRef = collection(db, 'application');
        await addDoc(applicationsRef, data);
        console.log('Sucess adding document');
        return { success: 'Sucess adding document' };
    } catch (error) {
        console.error('Error adding document: ', error);
        return { error: 'Error adding document' };
    }
}

export { submitAppToFirebase };
