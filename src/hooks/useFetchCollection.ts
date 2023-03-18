import { useQuery } from '@tanstack/react-query';
import { app } from '../firebase';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

interface Employee {
    id: string;
    name: string;
    age: number;
}

interface Application {
    id: string;
    name: string;
    position: string;
}

async function fetchCollection<T>(collectionName: string, mapper: (doc: any) => T): Promise<T[]> {
    const db = getFirestore(app);
    const querySnapshot = await getDocs(collection(db, collectionName));
    const results: T[] = [];
    querySnapshot.forEach((doc) => {
        results.push({ id: doc.id, ...mapper(doc.data()) } as T);
    });
    return results;
}

function useFetchEmployees() {
    return useQuery<Employee[], Error>(['employee'], () => fetchCollection('employee', (data) => data as Employee));
}

function useFetchApplications() {
    return useQuery<Application[], Error>(['application'], () => fetchCollection('application', (data) => data as Application));
}

export { useFetchEmployees, useFetchApplications };
