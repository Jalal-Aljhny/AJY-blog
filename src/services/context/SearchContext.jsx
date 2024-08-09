import {
  createContext,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import PropTypes, { element, string } from "prop-types";
import axios from "axios";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const API_URL = "https://api.unsplash.com/search/photos";
  const IMAGES_PER_PAGE = 9;
  const searchInput = useRef(null);
  const clicked = useRef(false);
  const [page, setPage] = useState(1);
  const handlePage = useCallback(
    (step) => {
      if (step == "next") {
        setPage(page + 1);
      } else {
        setPage(page - 1);
      }
    },
    [page]
  );
  const initialState = {
    data: [],
    error: null,
    loading: false,
  };
  const [images, setImages] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const reducer = (state, action) => {
    switch (action.type) {
      case "FETCH_START":
        return { ...state, loading: true, error: null };
        // eslint-disable-next-line no-unreachable
        break;
      case "FETCH_SUCCESS":
        return { ...state, loading: false, data: action.payload };
        // eslint-disable-next-line no-unreachable
        break;
      case "FETCH_ERROR":
        return { ...state, loading: false, error: action.payload };
        // eslint-disable-next-line no-unreachable
        break;
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchData = useCallback(async () => {
    dispatch({ type: "FETCH_START" });
    try {
      const data = await axios.get(
        `${API_URL}?query=${
          searchInput.current.value
        }&page=${page}&per_page=${IMAGES_PER_PAGE}
          &client_id=${import.meta.env.VITE_API_KEY}`
      );
      console.log(data);
      setImages(data.data.results);
      setTotalPages(data.data.total_pages);
      dispatch({ type: "FETCH_SUCCESS", payload: data.data });
    } catch (error) {
      dispatch({ type: "FETCH_ERROR", payload: error.message });
    }
  }, [page]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const resetSearch = () => {
    setPage(1);
    clicked.current = true;
    fetchData();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchInput.current.value = "";
    resetSearch();
  };

  const handleSelect = (name) => {
    searchInput.current.value = name;
    resetSearch();
  };

  const [imgUrl, setImgUrl] = useState("");
  const changeImgUrl = (url) => {
    setImgUrl(url);
  };

  const [choose, setChoose] = useState(false);
  const chooseCurrent = () => {
    setChoose(true);
  };

  return (
    <SearchContext.Provider
      value={{
        clicked,
        handleSearch,
        searchInput,
        handleSelect,
        ...state,
        images,
        page,
        handlePage,
        totalPages,
        imgUrl,
        changeImgUrl,
        choose,
        chooseCurrent,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
SearchProvider.propTypes = {
  children: PropTypes.oneOfType([element, string]),
};
