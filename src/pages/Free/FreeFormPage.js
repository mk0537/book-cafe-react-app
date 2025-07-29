// 자유 게시판 글 작성/수정
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createFreePost, getFreePostDetail, updateFreePost } from '../../api/free';

const FreeFormPage = () => {
  const { no } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', content: '', file_path: '', type: '자유' });
  const isEdit = !!no;

  useEffect(() => {
    if (isEdit) {
      getFreePostDetail(no).then(res => {
        setForm(res.data.data[0]);
      });
    }
  }, [no]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const request = isEdit ? updateFreePost(no, form) : createFreePost(form);
    request.then(() => navigate('/free')).catch(alert);
  };

  return (
    <div>
      <h2>{isEdit ? '글 수정' : '글 작성'}</h2>
      <input name="title" value={form.title} onChange={handleChange} placeholder="제목" />
      <textarea name="content" value={form.content} onChange={handleChange} placeholder="내용" />
      <button onClick={handleSubmit}>{isEdit ? '수정' : '작성'}</button>
    </div>
  );
};

export default FreeFormPage;
