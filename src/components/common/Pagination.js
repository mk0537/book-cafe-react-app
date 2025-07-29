// 페이징 처리 컴포넌트
import React from "react";
//import "./Pagination.css"; // 스타일은 여기에!

  const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pagesPerBlock = 5;
  const currentBlock = Math.floor((currentPage - 1) / pagesPerBlock);
  const startPage = currentBlock * pagesPerBlock + 1;
  const endPage = Math.min(startPage + pagesPerBlock - 1, totalPages);

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      {/* 왼쪽 화살표 */}
      {startPage > 1 && (
        <button onClick={() => onPageChange(startPage - 1)} className="arrow">
          &lt;
        </button>
      )}

      {/* 페이지 숫자 */}
      {pageNumbers.map((page) => (
        <button
          key={page}
          className={`page-number ${currentPage === page ? "active" : ""}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      {/* 오른쪽 화살표 */}
      {endPage < totalPages && (
        <button onClick={() => onPageChange(endPage + 1)} className="arrow">
          &gt;
        </button>
      )}
    </div>
  );
};

export default Pagination;
