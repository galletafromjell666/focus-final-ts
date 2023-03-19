import { useQuery } from '@tanstack/react-query';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Employee, ApplicationFirestore } from '../interfaces/';

async function fetchCollection<T>(collectionName: string, mapper: (doc: any) => T): Promise<T[]> {
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
    return useQuery<ApplicationFirestore[], Error>(['application'], () => fetchCollection('application', (data) => data as ApplicationFirestore));
}

export { useFetchEmployees, useFetchApplications };
