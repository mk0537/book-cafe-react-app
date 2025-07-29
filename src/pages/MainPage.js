import { useNavigate } from "react-router-dom";
import MainBookSearch from "../components/Book/MainBookSearch";
import MainFreeBoard from "../components/Board/MainFreeBoard";

const MainPage = () => {
    const navigate = useNavigate();

    // 신고하기 페이지로 이동
    const _declareOnclick = () => {
        navigate("/declarepage");
    };

    // 도서 검색 페이지로 이동
    const _bookSearchPage = () => {
        navigate("/book");
    }

    return (
        <div className="main-page-container">
            <div className="main-page-left">
                <MainBookSearch isPreview={true} />
            </div>
            <div className="main-page-right">
                <MainFreeBoard />
                <div className="main-page-right-bottom">
                    <div className="declare-button-container">
                        <p>신고하기</p>
                        <button className="declare-button" onClick={_declareOnclick}>
                            신고
                        </button>
                    </div>
                    <div className="question-button-container">
                        <p>문의하기(예시)</p>
                        <button className="declare-button" onClick={_declareOnclick}>
                            문의
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MainPage;
