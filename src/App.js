import React from "react";
import { Router, Routes, Route, useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import MainPage from "./pages/MainPage";

import "./css/styles.css"

// 책 검색 페이지
import { BookProvider } from "./context/BookContext";
import BookSearchPage from './pages/Book/BookSearchPage';
import BookDetailPage from "./pages/Book/BookDetailPage";

//거래 게시판 페이지
import TradeBoard from "./pages/Trade/TradeBoard";
import TradeDetailPage from "./pages/Trade/TradeDetailPage";
import TradeFormPage from "./pages/Trade/TradeFormPage";

// 자유 게시판 페이지
import FreeBoard from "./pages/Free/FreeBoard";
import FreeDetailPage from "./pages/Free/FreeDetailPage";
import FreeFormPage from "./pages/Free/FreeFormPage";

// 공지사항 페이지
import InformationBoard from "./pages/Info/InformationBoard";

// 신고 게시판 페이지
import DeclareBoard from "./pages/Declare/declareBoard"




function App() {
  const location = useLocation();

  return (
    <div>
      {/* 헤더 영역 */}
      <div>
          <Header />
      </div>
      {/* 네비게이션 바 */}
      <nav className="navbar">
        <ul className="nav-list">
          <li className="nav-item">
            <NavLink to="/book" className={({ isActive }) => (isActive ? "active" : "")}>
              도서 검색
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/trade" className={({ isActive }) => (isActive ? "active" : "")}>
              거래 게시판
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/free/*" className={({ isActive }) => (isActive ? "active" : "")}>
              자유 게시판
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/info" className={({ isActive }) => (isActive ? "active" : "")}>
              공지사항
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/decl" className={({ isActive }) => (isActive ? "active" : "")}>
              신고 게시판
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="container">
        <BookProvider>
              <Routes>
                <Route path="/" element={<MainPage />} /> {/* 메인 페이지 */}

                {/* <Route path="/login" element={<LoginPage />} /> 로그인 페이지 */}
                {/* <Route path="/signup" element={<SignupPage />} /> 회원가입 페이지 */}

                <Route path="/book" element={<BookSearchPage />} /> {/* 도서 검색 페이지 */}
                <Route path="/books/:bookId" element={<BookDetailPage />} /> {/*도서 상세 페이지 */}
                
                <Route path="/trade" element={<TradeBoard />} /> {/* 거래 게시판 목록 페이지*/}
                <Route path="/trade/write" element={<TradeFormPage />} /> {/* 거래 게시판 작성 페이지*/}
                <Route path="/trade/edit/:no" element={<TradeFormPage />} /> {/* 거래 게시판 수정 페이지*/}
                <Route path="/trade/:no" element={<TradeDetailPage />} /> {/* 거래 게시판 상페페이지*/}

                <Route path="/free/*" element={<FreeBoard />} /> {/* 자유 게시판 목록 페이지*/}
                <Route path="/free/write" element={<FreeFormPage />} /> {/* 자유 게시판 작성 페이지*/}
                <Route path="/free/edit/:no" element={<FreeFormPage />} /> {/* 자유 게시판 수정 페이지*/}
                <Route path="/free/:no" element={<FreeDetailPage />} /> {/* 자유 게시판 상세페이지*/}


                <Route path="/info/*" element={<InformationBoard />} /> {/* 공지사항 페이지*/}
                <Route path="/decl/*" element={<DeclareBoard />} /> {/* 신고 게시판 페이지*/}

                
                {/* <Route path="/mypage/*" element={<MyPageRoutes />} /> 마이페이지 */}
                {/* <Route path="/board/*" element={<BoardRoutes />} /> 게시판 최상위 페이지 */}
                {/* <Route path="/admin/*" element={<AdminRoutes />} /> 관리자 최상위 페이지 */}
              </Routes>
          </BookProvider>
      </div>
      {/* 푸터 영역 */}
        <div>
          <Footer />
        </div>
      </div>
  );
}

export default App;
