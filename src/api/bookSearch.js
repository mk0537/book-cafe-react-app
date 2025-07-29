// 도서 검색 API
import axios from 'axios';


export const fetchBooks = async (query) => {
  const res = await axios.get(`http://localhost:8085/api/book/list/search?query=${query}`);
  return res.data;
};


export default fetchBooks;