import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  buildUrlByQuery,
  doFetch
} from "../../services/DataLoader";
import useInfiniteScroll from "../hooks/useInfiniteScroll";


const SearchWrapper = function({ Component, hasInfiniteScrolling }) {

  let timerId;
  const dispatch = useDispatch();
  let queryParams = useSelector((state) => state.queryParams);
  let pagination = useSelector((state) => state.pagination);

  let [isFetching, setIsFetching] = [null, null];
  if (hasInfiniteScrolling) {
    [isFetching, setIsFetching] = useInfiniteScroll( (currentQuery, queryChanged) => handleSearch(currentQuery, queryChanged) );
  }

  function handleSearch(currentQuery, queryChanged) {
    const currentPage = queryChanged ? 1 : pagination.page;
    const currentPagination = Object.assign({}, pagination, {page: currentPage});
    const url = buildUrlByQuery(queryParams, currentQuery, currentPagination);

    clearTimeout(timerId);
    timerId = setTimeout(function() {
      dispatch({
        type: "merge_query",
        value: currentQuery
      });

      dispatch({
        type: "increase_page",
        value: currentPage
      });

      doFetch(url, function(result) {
        dispatch({
          type: currentPage === 1 ? "first_loading" : "merge_images",
          value: result.hits
        });
  
        dispatch({
          type: "increase_page",
          value: currentPage
        });

        if (typeof setIsFetching === "function") {
          setIsFetching(false);
        }
      });
    }, 500);
  }

  return (
    <>
      <Component handleSearch={handleSearch} />
    </>
  )

};

export default SearchWrapper;
