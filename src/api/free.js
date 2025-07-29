// 자유 게시판 API
import axios from 'axios';

const API = '/api/free';

// axios 인스턴스 생성
const axiosInstance = axios.create();

// 요청 시 Authorization 헤더 자동 추가
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // 토큰 저장 위치에 따라 변경
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 게시글 목록 조회
export const getFreePosts = (page = 1, size = 10, sort = 'regDate') =>
  axiosInstance.get(`${API}/list`, { params: { page, size, sort } });

// 게시글 상세 조회 (POST 요청으로 되어 있음 → 서버가 POST로 받는 경우)
export const getFreePostDetail = (no) =>
  axiosInstance.post(`${API}/DetailPost/${no}`);

// 게시글 생성
export const createFreePost = (data) =>
  axiosInstance.post(`${API}/CreatePost`, data);

// 게시글 수정
export const updateFreePost = (no, data) =>
  axiosInstance.put(`${API}/update/${no}`, data);

// 게시글 삭제
export const deleteFreePost = (no) =>
  axiosInstance.delete(`${API}/delete/${no}`);

// 게시글 추천
export const recommendFreePost = (no) =>
  axiosInstance.post(`${API}/recommend/${no}`);
