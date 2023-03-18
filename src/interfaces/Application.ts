import { Employee } from './Employee';

export interface Application {
    id?: string;
    employee?: Employee;
    medicalUnit: string;
    sickLeaveStartDate: string;
    sickLeaveEndDate: string;
    doctor: string;
    daysOfCoverage: number;
    medicalDiagnostic: string;
}
