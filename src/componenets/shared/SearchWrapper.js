import React, { useEffect } from "react";
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

  function promiseRequest(url) {
    return new Promise(function(resolve) {
      clearTimeout(timerId);
      // console.log(pagination.aborterList)
      if (pagination.aborterList.length === 2) {
        // Cancel the previous fetch request.
        pagination.aborterList[0].abort();
        console.log("Request aborted");
      }
      timerId = setTimeout(() => {
        resolve(url);
      }, 1000);
    });
  }

  function handleSearch(currentQuery, queryChanged) {
    const currentPage = queryChanged ? 1 : pagination.page;
    const currentPagination = {...pagination, page: currentPage};
    const url = buildUrlByQuery(queryParams, currentQuery, currentPagination);

    promiseRequest(url).then(() => {
      dispatch({
        type: "merge_query",
        value: currentQuery
      });

      dispatch({
        type: "increase_page",
        value: currentPage
      });

      const aborter = new AbortController();

      dispatch({
        type: "set_aborter",
        value: aborter
      });

      doFetch(url, aborter.signal).then((result) => {
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
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log(`Request aborted error: ${err}`);
        }
      });
    })
  }

  return (
    <>
      <Component handleSearch={handleSearch} />
    </>
  )

};

export default SearchWrapper;
