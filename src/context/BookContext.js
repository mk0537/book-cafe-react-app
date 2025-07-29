import React, { createContext, useState } from "react";
import axios from "axios";

export const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);


  // 검색 페이지용: 검색어 기반 전체 도서 조회
  const searchBooks = async (query = "", limit = null, isRandom = false) => {
    try {
      const response = await axios.get(`http://localhost:8085/api/book/list/search`, {
        params: { query },
      });

      let results = response.data;

      if (isRandom && limit) {
        results = results.sort(() => 0.5 - Math.random()).slice(0, limit);
      }

      setBooks(results);
    } catch (error) {
      console.error("도서 검색 실패:", error);
    }
  };


  // 메인페이지용: 백엔드에서 랜덤 5권 반환
  const getRandomBooks = async (query) => {
    try {
      const response = await axios.get(`http://localhost:8085/api/book/list/random`);
      setBooks(response.data);
    } catch (error) {
      console.error("랜덤 도서 불러오기 실패:", error);
    }
  };

  return (
    <BookContext.Provider value={{ books, searchBooks, getRandomBooks }}>
      {children}
    </BookContext.Provider>
  );
};