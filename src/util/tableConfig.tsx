import { RankingInfo, rankItem } from '@tanstack/match-sorter-utils';
import { isWithinInterval, parseISO } from 'date-fns';
import { MDBIcon } from 'mdb-react-ui-kit';
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
        cell: (info: { row: { original: ApplicationFirestore } }) => (
            <div>
                <MDBIcon far icon="trash-alt" onClick={() => callback(info.row.original)} size="xl" style={{ cursor: 'pointer' }} className="text-danger" />
            </div>
        ),
        footer: (props: { column: { id: any } }) => props.column.id
    };
};

function dateRangeFilter(arr: ApplicationFirestore[], startDateStr: string, endDateStr: string) {
    console.log(`dates filter 
    start ${startDateStr}
    end ${endDateStr}`);
    const startDate = parseISO(startDateStr);
    const endDate = parseISO(endDateStr);
    return arr.filter((u) => {
        const sickLeaveStartDate = parseISO(u.sickLeaveStartDate);
        const sickLeaveEndDate = parseISO(u.sickLeaveEndDate);
        return (
            isWithinInterval(sickLeaveStartDate, {
                start: startDate,
                end: endDate
            }) || isWithinInterval(sickLeaveEndDate, { start: startDate, end: endDate })
        );
    });
}

function globalSearch(row: any, columnId: string, value: any, addMeta: (arg0: { itemRank: RankingInfo }) => void): any {
    const itemRank = rankItem(row.getValue(columnId), value);
    addMeta({
        itemRank
    });
    return itemRank.passed;
}

export { commonCols, employeeCol, actionCol, globalSearch, dateRangeFilter };
