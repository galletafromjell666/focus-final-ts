import bcrypt from 'bcryptjs-react';
import useUserStore from '../../hooks/useUserStore';
import { db } from '../../firebase';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { User } from '../../interfaces';

async function firebaseHandleLogin(username: string, password: string) {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('username', '==', username), limit(1));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
        throw new Error('Invalid username or password');
    }

    const userDoc = querySnapshot.docs[0];
    const user = userDoc.data() as User;

    if (!bcrypt.compareSync(password, user.password || '')) {
        throw new Error('Invalid username or password');
    }
    const { password: psw, ...userWithoutPassword } = user;
    useUserStore.setState({ user: userWithoutPassword });
}

export { firebaseHandleLogin };
