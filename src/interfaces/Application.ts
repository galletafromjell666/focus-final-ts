import { Employee } from './Employee';

export interface Application {
    employee?: Employee;
    medicalUnit: string;
    sickLeaveStartDate: string;
    sickLeaveEndDate: string;
    doctor: string;
    employeeId: string;
    daysOfCoverage: number;
    medicalDiagnostic: string;
    applicationDate: string;
}

export interface ApplicationFirestore extends Application {
    id: string;
}
