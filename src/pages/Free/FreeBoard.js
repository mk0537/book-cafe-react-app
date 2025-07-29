// 자유게시판 목록
import React, { useEffect, useState } from 'react';
import { getFreePosts, recommendFreePost } from '../../api/free';
import FreePostItem from '../../components/FreeBoard/FreePostItem';


const FreeListPage = () => {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState('전체');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
  getFreePosts()
    .then(res => {
      setPosts(res.data);
    })
    .catch(err => {
      console.error('자유 게시판 목록 불러오기 실패:', err);
    });
}, []);


  const handleRecommend = (postNo) => {
    recommendFreePost(postNo).then(res => {
      const updated = res.data.data[0];
      setPosts(prev =>
        prev.map(p => (p.no === updated.no ? updated : p))
      );
    });
  };

  const filteredPosts = posts.filter(post =>
    (filter === '전체' || post.type === filter) &&
    (post.title.includes(searchTerm) || post.content.includes(searchTerm))
  );

  return (
    <div className="free-board-container">
      <div className="top-bar">
        <input
          className="search-input"
          type="text"
          placeholder="게시글 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select className="filter-select" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="전체">모든 게시글</option>
          <option value="공지">공지</option>
          <option value="공유">공유</option>
        </select>
      </div>

      <div className="post-list">
        {filteredPosts.map(post => (
          <FreePostItem key={post.no} post={post} onRecommend={handleRecommend} />
        ))}
      </div>
    </div>
  );
};

export default FreeListPage;

