import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";

import * as DataLoader from "../../services/DataLoader";
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
    console.log(pagination)
    const perPage = pagination.perPage;
    const currentPage = queryChanged ? 1 : pagination.page;
    queryParams = Object.assign({}, queryParams, currentQuery);
    const queryText = DataLoader.buildQueryText(queryParams);
    let url =  `${DataLoader.baseUrl}${queryText}&per_page=${perPage}&page=${currentPage}`;

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

      DataLoader.doFetch(url, function(result) {

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
