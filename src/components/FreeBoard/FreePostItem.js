// 게시글 한 줄 구성 컴포넌트
import React from 'react';
import { FaHeart, FaRegStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const FreePostItem = ({ post, onRecommend }) => {
  const navigate = useNavigate();

  return (
    <div className="post-item" onClick={() => navigate(`/free/${post.no}`)}>
      <div className="left">
        <FaRegStar className="star-icon" />
        {post.type === '공지' && <span className="badge notice">공지</span>}
        {post.type === '공유' && <span className="badge share">공유</span>}
        <span className="title">{post.title}</span>
        {post.commentCount > 0 && <span className="comment-count">({post.commentCount})</span>}
      </div>
      <div className="right">
        <button className="recommend-btn" onClick={(e) => { e.stopPropagation(); onRecommend(post.no); }}>
          <FaHeart /> {post.recommendCount}
        </button>
        <span className="author">{post.authorName}</span>
      </div>
    </div>
  );
};

export default FreePostItem;
