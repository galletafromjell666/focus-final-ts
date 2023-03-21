import { ApplicationFirestore } from '../interfaces';

const commonCols = [
    {
        header: () => 'Medical diagnostic',
        accessorKey: 'medicalDiagnostic',
        cell: (info: { getValue: () => any }) => info.getValue(),
        footer: (props: { column: { id: any } }) => props.column.id
    },
    {
        header: () => 'Application date',
        accessorKey: 'applicationDate',
        cell: (info: { getValue: () => any }) => info.getValue(),
        footer: (props: { column: { id: any } }) => props.column.id
    },
    {
        header: () => 'Medical Unit',
        accessorKey: 'medicalUnit',
        cell: (info: { getValue: () => any }) => info.getValue(),
        footer: (props: { column: { id: any } }) => props.column.id
    },
    {
        header: () => 'Doctor',
        accessorKey: 'doctor',
        cell: (info: { getValue: () => any }) => info.getValue(),
        footer: (props: { column: { id: any } }) => props.column.id
    },
    {
        header: () => 'Days of coverage',
        accessorKey: 'daysOfCoverage',
        cell: (info: { getValue: () => any }) => info.getValue(),
        footer: (props: { column: { id: any } }) => props.column.id
    },
    {
        header: () => 'Start date',
        enableGlobalFilter: false,
        accessorKey: 'sickLeaveStartDate',
        cell: (info: { getValue: () => any }) => info.getValue(),
        footer: (props: { column: { id: any } }) => props.column.id
    },
    {
        header: () => 'End date',
        enableGlobalFilter: false,
        accessorKey: 'sickLeaveEndDate',
        cell: (info: { getValue: () => any }) => info.getValue(),
        footer: (props: { column: { id: any } }) => props.column.id
    }
];

const employeeCol = {
    header: () => 'Employee',
    accessorKey: 'employee.fullName',
    cell: (info: { getValue: () => any }) => info.getValue(),
    footer: (props: { column: { id: any } }) => props.column.id
};

const actionCol = (callback: (arg0: ApplicationFirestore) => void) => {
    return {
        header: '',
        accessorKey: 'action',
        cell: (info: { row: { original: ApplicationFirestore } }) => <button onClick={() => callback(info.row.original)}>Action</button>,
        footer: (props: { column: { id: any } }) => props.column.id
    };
};

export { commonCols, employeeCol, actionCol };
