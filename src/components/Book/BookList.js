// 도서 목록을 받아서 BookCard들을 반복적으로 렌더링하는 역할
// 내부에서 BookCard를 반복해서 보여주고
// 각 카드 클릭 시 상세 페이지 이동이나 찜 기능도 연결할 수 있다.
import React from "react";
import BookCard from "./BookCard";

const BookList = ({ books, mode, isLoggedIn }) => {
  return (
    <div className={`book-list ${mode}`}>
      {books.map((book, index) => (
        <BookCard key={index} book={book} mode={mode} isLoggedIn={isLoggedIn} />
      ))}
    </div>
  );
};

export default BookList;


