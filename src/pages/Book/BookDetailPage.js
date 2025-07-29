import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BookDetailPage = () => {
  const { bookId } = useParams(); 
  console.log("bookId:", bookId);

  const [book, setBook] = useState(null);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
  if (!bookId) return;

  const token = localStorage.getItem("token"); 

  fetch(`http://localhost:8085/api/book/list/${encodeURIComponent(bookId)}`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
    .then(res => {
      if (!res.ok) {
        if (res.status === 404) {
          throw new Error("책을 찾을 수 없습니다.");
        } else {
          throw new Error("서버 오류가 발생했습니다.");
        }
      }
      return res.json();
    })
    .then(data => {
      setBook(data);
    })
    .catch(err => {
      console.error(err.message);
      setBook(null);
      alert(err.message);
    });
}, [bookId]);



// 날짜 문자열 "yyyyMMdd" → "yyyy.MM.dd"로 변환
const formatDate = (dateStr) => {
  if (!dateStr || dateStr.length !== 8) return dateStr;
  const year = dateStr.substring(0, 4);
  const month = dateStr.substring(4, 6);
  const day = dateStr.substring(6, 8);
  return `${year}.${month}.${day}`;
};

// 숫자 문자열 → 천 단위 콤마 
const formatPrice = (priceStr) => {
  const price = parseInt(priceStr, 10);
  if (isNaN(price)) return priceStr;
  return price.toLocaleString('ko-KR') + '원';
};


  const handleLike = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`http://localhost:8085/api/likes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Athorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: 1, // 실제 로그인된 사용자 ID로 변경
          bookId: bookId, // 문자열 그대로 전송
        }),
      });

      if (res.ok) {
        setLiked((prev) => !prev);
      }
    } catch (err) {
      console.error('찜 실패:', err);
    }
  };

  if (!book) return <div>Loading...</div>;

  return (
    <div className='book-detail-page-container'>
      <div className='book-detail-page-title'>
        <h1>{book.title}</h1>
      </div>
      <div className='book-detail-page-content-wrapper'>
        <img 
          src={book.image} 
          alt={book.title}
          className='book-detail-page-image'
        />
      <div className='book-detail-page-content'>
        <p className='book-detail-page-content-author'><strong>저자 </strong>
           <span style={{marginLeft:"8px", color:"black"}}>{book.author}</span></p>

      <div className='book-detail-info'>
        <div className='book-detail-info-row'>
          <p><strong>출판</strong> <span style={{marginLeft:"8px", color:"black"}}>{book.publisher}</span></p>
          <p><strong>발행</strong> <span style={{marginLeft:"8px", color:"black"}}>{formatDate(book.pubdate)}</span></p>
        </div>
        <p 
          style={{marginTop : "0px", marginBottom : "30px"}}>
          <strong>할인가격</strong> <span style={{fontSize:"13px"}}>(네이버 기준) </span>
            <span style={{marginLeft:"8px", color:"black"}}>{formatPrice(book.discount)}</span>
        </p>
        <p className="book-detail-link">
          <strong>상세 링크 </strong>{' '}
          <a href={book.link} target='_blank' rel='noopener noreferrer' style={{marginLeft:"8px"}}>
            자세히 보기
          </a> 
        </p>
      </div>

        <p style={{fontSize:"20px"}}><strong>책 소개</strong></p>
        <p className='book-detail-page-content-desc'>
            <span style={{color:"black"}}>{book.description && book.description.trim() !== ''
            ? book.description
            : '줄거리 정보 없음'}</span></p>
      </div>
     </div> 
    </div>
  );
};

export default BookDetailPage;
