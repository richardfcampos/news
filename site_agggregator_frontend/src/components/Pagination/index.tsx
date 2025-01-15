import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalRecords: number;
  onPageChange: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  lastPage: () => void;
}

export default function Pagination({ currentPage, totalPages, totalRecords, onPageChange, nextPage, prevPage, lastPage }: PaginationProps) {
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="flex flex-wrap justify-center items-center space-x-2 mt-4 mb-5">
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="px-2 py-1 border rounded disabled:opacity-50"
      >
        First
      </button>
      <button
        onClick={prevPage}
        disabled={currentPage === 1}
        className="px-2 py-1 border rounded disabled:opacity-50"
      >
        Previous
      </button>
      {getPageNumbers().map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-2 py-1 border rounded ${currentPage === page ? 'bg-blue-500 text-white' : ''}`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={nextPage}
        disabled={currentPage === totalPages}
        className="px-2 py-1 border rounded disabled:opacity-50"
      >
        Next
      </button>
      <button
        onClick={lastPage}
        disabled={currentPage === totalPages}
        className="px-2 py-1 border rounded disabled:opacity-50"
      >
        Last
      </button>
      <div className="px-2 py-1">
        Total Records: {totalRecords}
      </div>
    </div>
  );
}
