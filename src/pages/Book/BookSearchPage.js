import React, { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { BookContext } from "../../context/BookContext";
import BookList from "../../components/Book/BookList";
import Pagination from "../../components/common/Pagination";

const BookSearchPage = () => {
  const { books, searchBooks } = useContext(BookContext);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const booksPerPage = 4;

  // 초기 랜덤 4권
  useEffect(() => {
    searchBooks("추천", 4, true);

    const checkTokenValid = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsLoggedIn(false);
        return;
      }

      try {
        const res = await fetch("http://localhost:8085/api/auth/validate", {
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          setIsLoggedIn(true);
        } else {
          localStorage.removeItem("token");
          setIsLoggedIn(false);
        }
      } catch (err) {
        console.error("토큰 검증 실패", err);
        setIsLoggedIn(false);
      }
    };

    checkTokenValid();
  }, []);
  

  const handleSearch = () => {
    if (query.trim() !== "") {
      alert("검색 성공");
     searchBooks(query); // 전체 결과 가져옴
    }
  };

  // 엔터키 누르면 handleSearch 호출
  const enterKeyEventHandler = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // 페이지 계산
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(books.length / booksPerPage);

  return (
    <div className="book-search-page-container">
      <div className="book-search-page-title">
        <h1>도서 검색</h1>
      </div>

      <div className="book-search-page-top">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="검색어를 입력하세요. ex) 문학, 자격증"
          onKeyDown={enterKeyEventHandler}
        />
        <button onClick={handleSearch}>검색</button>
      </div>

      <BookList books={currentBooks} mode="search" />

      {/* 페이지네이션 UI */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default BookSearchPage;
