import { ApplicationFirestore } from '../../../../interfaces';
import React, { useState } from 'react';

interface TablePaginationProps {
    data: ApplicationFirestore[];
    setFilteredData: React.Dispatch<React.SetStateAction<ApplicationFirestore[]>>;
}

const TablePagination: React.FC<TablePaginationProps> = ({ data, setFilteredData }) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(5);

    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentItems = data.slice(firstIndex, lastIndex);

    const totalPages = Math.ceil(data.length / itemsPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    const handleChangePage = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleChangeItemsPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    return (
        <div>
            <div>
                <select value={itemsPerPage} onChange={handleChangeItemsPerPage}>
                    {pageNumbers.map((pageNumber) => (
                        <option key={pageNumber} value={pageNumber}>
                            {pageNumber}
                        </option>
                    ))}
                </select>
            </div>
            <div></div>
        </div>
    );
};

export default TablePagination;
