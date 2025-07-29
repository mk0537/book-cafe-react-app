// 자유 게시글 상세
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getFreePostDetail, deleteFreePost, recommendFreePost } from '../../api/free';

const FreeDetailPage = () => {
  const { no } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getFreePostDetail(no).then(res => {
      setPost(res.data.data[0]);
    });
  }, [no]);

  const handleDelete = () => {
    deleteFreePost(no).then(() => {
      navigate('/free');
    }).catch(alert);
  };

  const handleRecommend = () => {
    recommendFreePost(no).then(res => {
      setPost(res.data.data[0]);
    }).catch(alert);
  };

  if (!post) return <div>로딩 중...</div>;

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p>작성자: {post.authorId}</p>
      <p>👍 추천수: {post.recommendCount}</p>
      <button onClick={handleRecommend}>추천</button>
      <button onClick={() => navigate(`/free/edit/${post.no}`)}>수정</button>
      <button onClick={handleDelete}>삭제</button>
      <button onClick={() => navigate('/free')}>목록</button>
    </div>
  );
};

export default FreeDetailPage;
