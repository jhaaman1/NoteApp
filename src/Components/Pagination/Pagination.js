import React from "react";
import paginationStyles from "./Pagination.module.css";

const Pagination = ({
  currentPage,
  totalPages,
  handlePageChange,
  startIndex,
  endIndex,
  totalData,
}) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];

    let startPage = Math.max(currentPage - 1, 1);
    let endPage = Math.min(currentPage + 1, totalPages);

    if (endPage - startPage < 2) {
      startPage = Math.max(endPage - 2, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={`page-item ${currentPage === i ? "active" : ""}`}
        >
          <button className="page-link" onClick={() => handlePageChange(i)}>
            {i}
          </button>
        </li>
      );
    }

    return pageNumbers;
  };
  return (
    <>
      <div className={paginationStyles.container}>
        <p>
          Showing {startIndex} to {endIndex} of {totalData} entries
        </p>
        <ul className={paginationStyles.lists}>
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className={paginationStyles.buttons}
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
            >
              First
            </button>
          </li>
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className={paginationStyles.buttons}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
          </li>
          <span className={paginationStyles.btnText}>{renderPageNumbers()}</span>
          <li className={`page-item `}>
            <button
              className={paginationStyles.buttons}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </li>
          <li className={``}>
            <button
              className={paginationStyles.buttons}
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
            >
              Last
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Pagination;
