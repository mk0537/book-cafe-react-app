import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BookCafeLogo from '../../asset/images/BookCafeLogo.png'

const Header = () => {
  const navigate = useNavigate();

  const _HandleHeader = () => {
    navigate("/")
  }

  // 로그인 클릭
  const _loginOnclick = () => {

  }

  // 마이페이지 클릭
  const _myPageOnClick = () => {

  }

  // 쪽지함 클릭
  const _noteOnClick = () => {

  }

  
  return (
    <div>
      <div className="header">
        <img src={BookCafeLogo} alt='picture1' height='80px' width='80px' /> 
        <h1 
          className="board-title" 
          onClick={_HandleHeader}
        >삼총사북카페</h1>
            <div className="header-right">
                <span
                    onClick={_loginOnclick}
                >
                    로그인
                </span>
                <span
                    onClick={_myPageOnClick}
                >
                  마이페이지
                </span>
                <span
                    onClick={_noteOnClick}
                >
                    쪽지함
                </span>
            </div>
      </div>
    </div>
  );
};

export default Header;