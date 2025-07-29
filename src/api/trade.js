// 거래 게시판 API

import axios from 'axios';

const API_BASE = '/api/free';

export const getTradePosts = (page = 1, size = 10, sort = 'regDate') =>
  axios.get(`${API_BASE}/list`, { params: { page, size, sort } });

export const getTradePostDetail = (no) =>
  axios.post(`${API_BASE}/DetailPost/${no}`);

export const createTradePost = (data) =>
  axios.post(`${API_BASE}/CreatePost`, data);

export const updateTradePost = (no, data) =>
  axios.put(`${API_BASE}/update/${no}`, data);

export const deleteTradePost = (no) =>
  axios.delete(`${API_BASE}/delete/${no}`);

export const recommendTradePost = (no) =>
  axios.post(`${API_BASE}/recommend/${no}`);
