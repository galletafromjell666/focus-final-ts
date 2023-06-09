import { useMutation, useQueryClient } from '@tanstack/react-query';
import { db } from '../firebase';
import { collection, deleteDoc, doc } from 'firebase/firestore';

function useDeleteApplicationByID() {
    const queryClient = useQueryClient();
    return useMutation<void, Error, string>((id) => deleteApplicationFromFirebase(id), {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['application'] });
        },
        onError: () => {
            throw new Error('Failed to delete application.');
        }
    });
}
async function deleteApplicationFromFirebase(id: string) {
    const applicationRef = doc(collection(db, 'application'), id);
    await deleteDoc(applicationRef);
}
export { useDeleteApplicationByID };
