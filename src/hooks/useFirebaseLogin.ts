import bcrypt from 'bcryptjs-react';
import useUserStore from './useUserStore';
import { db } from '../firebase';
import { collection, query, where, getDocs, limit, DocumentReference, doc } from 'firebase/firestore';
import { Employee, User } from '../interfaces';

async function firebaseHandleLogin(username: string, password: string) {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('username', '==', username), limit(1));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
        return { status: 'error', message: 'Invalid username' };
    }

    const userDoc = querySnapshot.docs[0];
    const user = userDoc.data() as User;

    const userDocRef: DocumentReference = doc(db, 'users', userDoc.id);
    const employeeRef = collection(userDocRef, 'employee');
    const employeeSnapshot = await getDocs(employeeRef);

    if (employeeSnapshot.empty) {
        return { status: 'error', message: 'Employee record not found' };
    }

    const employeeData = employeeSnapshot.docs[0].data() as Employee;

    const { password: psw, ...userWithoutPassword } = user;
    const userWithEmployee = { ...userWithoutPassword, employee: employeeData };

    if (!bcrypt.compareSync(password, user.password || '')) {
        return { status: 'error', message: 'Invalid password' };
    }

    useUserStore.setState({ user: userWithEmployee });
    return { status: 'success', message: 'OK' };
}

export { firebaseHandleLogin };
