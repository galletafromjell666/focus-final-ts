import { FirebaseApp } from 'firebase/app';
import { getFirestore, collection, query, where, getDocs, limit } from 'firebase/firestore';
import bcrypt from 'bcryptjs-react';
import useUserStore from '../../hooks/useUserStore';

interface User {
    docId: string;
    username: string;
    password: string;
    // add the rest
}

async function firebaseHandleLogin(app: FirebaseApp, username: string, password: string) {
    const db = getFirestore(app);
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('username', '==', username), limit(1));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
        return { error: 'Invalid username or password' };
    }
    const userDoc = querySnapshot.docs[0];
    const user = userDoc.data() as User;
    user.docId = userDoc.id;
    const doPasswordMatch = await bcrypt.compare(password, user.password);
    if (!doPasswordMatch) {
        return { error: 'Invalid username or password' };
    }

    useUserStore.setState({ user });
    return { sucess: 'Auth sucess' };
}

export { firebaseHandleLogin };
