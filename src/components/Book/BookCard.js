import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BookCard = ({ book, mode, isLoggedIn }) => {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(book.liked || false);
  const isPreview = mode === "main";

  const stripTags = (html) => html?.replace(/<[^>]*>?/gm, "");

  const handleClick = async () => {
    // if (!isLoggedIn) {
    //   alert("로그인이 필요합니다.");
    //   return;
    // } 

    console.log("저장 요청 보낼 book 객체:", book);


    // 임시로 로그인된 것처럼 처리
    const mockLoggedIn = true;
    if (!mockLoggedIn) {
      alert("로그인이 필요합니다.");
      return;
    }

    if (book.id) {
      navigate(`/books/${book.id}`);
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:8085/api/book/list/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(book),
      });

      const responseText = await response.text(); // 딱 한 번만 호출
      console.log("응답 상태:", response.status);
      console.log("응답 내용:", responseText);

      if (!response.ok) throw new Error("DB 저장 실패");

      const savedId = Number(responseText);
      navigate(`/books/${savedId}`);
    } catch (err) {
      console.error("책 저장 또는 이동 실패:", err);
      alert("책 정보를 저장하는 중 오류가 발생했습니다.");
    }
    
  };



  // 찜 버튼 클릭 처리
  // const handleLike = async (e) => {
  //   e.stopPropagation();
  //   try {
  //     const res = await fetch(`/api/likes`, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({
  //         userId: 1, // TODO: 실제 로그인 사용자 ID
  //         bookId: book.id || book.title,
  //       }),
  //     });

  //     if (res.ok) {
  //       setLiked((prev) => !prev);
  //     }
  //   } catch (err) {
  //     console.error('찜 실패:', err);
  //   }
  // };

  return (
    <div className={`book-card ${isPreview ? "preview" : "search"}`} onClick={handleClick}>
      <img src={book.image} alt={book.title} />
      <div className="book-info">
        <h3 className={`book-title ${isPreview ? "preview-title" : "search-title"}`}>
          {stripTags(book.title)?.slice(0, isPreview ? 20 : 60)}
          {book.title.length > (isPreview ? 20 : 50) && "..."}
        </h3>

        <p className={`book-author ${isPreview ? "preview-author" : "search-author"}`}>
          {book.author?.slice(0, isPreview ? 15 : 30)}
          {book.author.length > (isPreview ? 15 : 30) && "..."}
        </p>

        <p className={`book-description ${isPreview ? "preview-desc" : "search-desc"}`}>
          {book.description
            ? stripTags(book.description.slice(0, isPreview ? 100 : 300)) + "..."
            : "줄거리 정보 없음"}
        </p>

      </div>
    </div>
  );
};

export default BookCard;
