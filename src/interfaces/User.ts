import { Employee } from './Employee';

type UserRole = 'HR' | 'employee';

export interface User {
    id: string;
    username: string;
    password: string;
    employee: Employee;
    role: UserRole;
}
