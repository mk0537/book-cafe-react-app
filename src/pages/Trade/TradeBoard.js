// 거래 게시글 목록

import React, { useEffect, useState } from 'react';
import { getTradePosts } from '../../api/trade';
import { useNavigate } from 'react-router-dom';

const TradeBoard = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getTradePosts(1, 10, 'regDate')
      .then((res) => {
        setPosts(res.data.data);  // FreeResponseDTO 구조
      })
      .catch(console.error);
  }, []);

  return (
    <div className="trade-board-page-container">
      <h1 className="trade-board-page-title">거래 게시판</h1>
      <button onClick={() => navigate('/trade/write')}>글쓰기</button>
      <ul>
        {posts.map((post) => (
          <li key={post.no} onClick={() => navigate(`/trade/${post.no}`)}>
            {post.title} — {post.authorId}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TradeBoard;

