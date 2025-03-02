import React, { useEffect, useState, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { debounce } from "lodash"; // Import debounce from lodash
import CardLoading from "../components/CardLoading";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import CardProduct from "../components/CardProduct";
import InfiniteScroll from "react-infinite-scroll-component";
import noDataImage from "../assets/nothing here yet.webp";

const SearchPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const location = useLocation();
  const searchText = new URLSearchParams(location.search).get("q") || "";
  const abortController = useRef(null);

  // 🚀 Debounce function: waits 300ms before calling fetchData
  const debounceFetchData = useCallback(
    debounce((searchTerm, pageNum) => {
      fetchData(searchTerm, pageNum);
    }, 300),
    []
  );

  const fetchData = async (searchTerm, pageNum) => {
    try {
      if (abortController.current) {
        abortController.current.abort(); // Cancel previous request
      }
      abortController.current = new AbortController();
      const { signal } = abortController.current;

      if (pageNum === 1) setLoading(true);

      const response = await Axios({
        ...SummaryApi.searchProduct,
        data: { search: searchTerm, page: pageNum },
        signal,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        setData((prev) => (pageNum === 1 ? responseData.data : [...prev, ...responseData.data]));
        setTotalPage(responseData.totalPage);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        AxiosToastError(error);
      }
    } finally {
      setLoading(false);
    }
  };

  // 🚀 Debounced API call when searchText changes
  useEffect(() => {
    setPage(1); // Reset page to 1 when search text changes
    debounceFetchData(searchText, 1);
  }, [searchText, debounceFetchData]);

  // 🚀 Fetch data when page number changes
  useEffect(() => {
    fetchData(searchText, page);
    return () => {
      if (abortController.current) {
        abortController.current.abort();
      }
    };
  }, [page]);

  const handleFetchMore = () => {
    if (page < totalPage) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <section className="bg-white">
      <div className="container mx-auto p-4">
        <p className="font-semibold">Search Results: {data.length}</p>

        <InfiniteScroll dataLength={data.length} hasMore={page < totalPage} next={handleFetchMore}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 py-4 gap-4">
            {data.map((p, index) => (
              <CardProduct data={p} key={p?._id + "searchProduct" + index} />
            ))}

            {/* Loading Skeleton */}
            {loading && new Array(10).fill(null).map((_, index) => <CardLoading key={"loadingsearchpage" + index} />)}
          </div>
        </InfiniteScroll>

        {/* No Data Found */}
        {!data.length && !loading && (
          <div className="flex flex-col justify-center items-center w-full mx-auto">
            <img src={noDataImage} className="w-full h-full max-w-xs max-h-xs block" alt="No Data" />
            <p className="font-semibold my-2">No Data found</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchPage;
