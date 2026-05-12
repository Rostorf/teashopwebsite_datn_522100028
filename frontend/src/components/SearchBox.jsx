import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const SearchBox = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/shop?keyword=${keyword}`);
    } else {
      navigate("/shop");
    }
  };

  return (
    <form onSubmit={submitHandler} className="flex items-center bg-gray-100 rounded-full px-4 py-2">
      <input type="text" name="q" onChange={(e) => setKeyword(e.target.value)} placeholder="Tìm kiếm sản phẩm..." className="bg-transparent outline-none text-sm w-40 sm:w-64" />
      <button type="submit">
        <SearchOutlinedIcon className="text-gray-500 hover:text-black transition-colors" />
      </button>
    </form>
  );
};

export default SearchBox;