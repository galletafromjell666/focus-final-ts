import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { app } from '../firebase';
import { Application } from '../interfaces/Application';

function useAddApplication() {
    const queryClient = useQueryClient();
    return useMutation((data: Application) => addApplicationToFirestore(data), {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['application'] });
        },
        onError: () => {
            throw new Error('Failed to delete application.');
        }
    });
}

async function addApplicationToFirestore(data: Application) {
    const db = getFirestore(app);
    const applicationsRef = collection(db, 'application');
    const docRef = await addDoc(applicationsRef, data);
    return docRef.id;
}

export { useAddApplication };
