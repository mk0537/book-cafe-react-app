// 거래 게시판 글 작성/수정
import React, { useState, useEffect } from 'react';
import { createTradePost, getTradePostDetail, updateTradePost } from '../../api/trade';
import { useNavigate, useParams } from 'react-router-dom';

const TradeFormPage = () => {
  const { no } = useParams();  // 수정일 경우 글 번호 있음
  const [form, setForm] = useState({ title: '', content: '', file_path: '', type: '거래' });
  const navigate = useNavigate();
  const isEdit = !!no;

  useEffect(() => {
    if (isEdit) {
      getTradePostDetail(no).then((res) => {
        setForm(res.data.data[0]);
      });
    }
  }, [no]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const request = isEdit ? updateTradePost(no, form) : createTradePost(form);
    request.then(() => navigate('/trade')).catch(alert);
  };

  return (
    <div>
      <h2>{isEdit ? '글 수정' : '새 글 작성'}</h2>
      <input name="title" value={form.title} onChange={handleChange} placeholder="제목" />
      <textarea name="content" value={form.content} onChange={handleChange} placeholder="내용" />
      <button onClick={handleSubmit}>{isEdit ? '수정' : '작성'}</button>
    </div>
  );
};

export default TradeFormPage;
