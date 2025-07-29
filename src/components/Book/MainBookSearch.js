// 메인페이지에서 보이는 도서 검색 부분
// src/components/book/MainBookSearch.js

import React, { useContext, useEffect } from "react";
import { BookContext } from '../../context/BookContext';
import BookList from './BookList';

const MainBookSearch = ({ isPreview }) => {
  const { books, getRandomBooks} = useContext(BookContext);
  

  // 페이지 진입 시 자동으로 랜덤 도서 검색
  useEffect(() => {
    getRandomBooks("베스트셀러", true); // 랜덤 5개 추출
  }, []);

  return (
    <div className={isPreview ? "book-search-main-container" : "book-search-page-container"}>
      <div className="book-search-main-title">
        <h2>월간 추천 도서</h2>
      </div>
      <div className="main-book-list">
        <BookList books={books} mode="main" />
      </div>
    </div>
  );
};

export default MainBookSearch;











{/* <div className="book-search-main-top">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="검색어 입력"
      />
      <button onClick={handleSearch}>검색</button>
    </div> */}