import { Employee } from './Employee';

type UserRole = 'hr_specialist' | 'employee';

export interface User {
    id: string;
    username: string;
    password?: string;
    employee: Employee;
    employeeId: string
    role: UserRole;
    docId: string
}
