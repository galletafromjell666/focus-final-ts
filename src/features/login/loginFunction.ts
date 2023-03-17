import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { FirebaseApp } from 'firebase/app';
import bcrypt from 'bcryptjs-react';
import useUserStore from '../hooks/useUserStore';

interface UserDoc {
    //refractor this, i have the same interface on useUserStore... and also need all the fields.
    id?: string;
    username: string;
    password: string;
    // add any other properties you expect to retrieve from Firestore
}
async function firebaseHandleLogin(app: FirebaseApp, username: string, password: string) {
    //const passwordHash = await bcrypt.hash(password, 1);
    //console.log(`Hashed password: ${passwordHash}`);
    const db = getFirestore(app);
    const usersRef = collection(db, 'users');

    try {
        const q = query(usersRef, where('username', '==', username));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            return { error: 'Invalid username or password' };
        }
        const userDoc = querySnapshot.docs[0];
        const user = userDoc.data() as UserDoc;
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            useUserStore.setState({ user });
            return { user };
        } else {
            return { error: 'Invalid username or password' };
        }
    } catch (error) {
        console.error(error);
        return { error: 'An error occurred while logging in. Please try again later.' };
    }
}

export { firebaseHandleLogin };
