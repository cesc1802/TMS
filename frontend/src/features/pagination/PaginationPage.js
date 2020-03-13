import React from "react";
import Pagination from "./Pagination";

const RECORDS_PER_PAGE = 3;
const DEFAULT_PAGE = 3;

const PaginationPage = ({
    currentPage,
    perPage = RECORDS_PER_PAGE,
    totalRecord,
    isCentered,
    onChange
}) => {
    const pages = Math.ceil(totalRecord / perPage);
    return (
        <Pagination
            pages={pages}
            currentPage={currentPage}
            isCentered={isCentered}
            onChange={page => onChange(page)}
        />
    );
};

export default PaginationPage;
