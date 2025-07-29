// 거래 게시판 게시글 상세 보기
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTradePostDetail, deleteTradePost, recommendTradePost } from '../../api/trade';

const TradeDetailPage = () => {
  const { no } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getTradePostDetail(no).then((res) => {
      setPost(res.data.data[0]);
    });
  }, [no]);

  const handleDelete = () => {
    deleteTradePost(no)
      .then(() => navigate('/trade'))
      .catch(alert);
  };

  const handleRecommend = () => {
    recommendTradePost(no)
      .then((res) => setPost(res.data.data[0]))
      .catch(alert);
  };

  if (!post) return <div>로딩 중...</div>;

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p>👍 추천수: {post.recommendCount}</p>
      <button onClick={handleRecommend}>추천</button>
      <button onClick={() => navigate(`/trade/edit/${post.no}`)}>수정</button>
      <button onClick={handleDelete}>삭제</button>
      <button onClick={() => navigate('/trade')}>목록으로</button>
    </div>
  );
};

export default TradeDetailPage;

 