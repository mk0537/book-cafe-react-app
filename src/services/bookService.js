// 도서 검색 처리 로직
import { searchBooks } from "../api/book";

export const getSearchResults = async (query) => {
  try {
    const res = await searchBooks(query);
    return res.data;
  } catch (err) {
    console.error("검색 실패", err);
    throw err;
  }
};


export default getSearchResults;