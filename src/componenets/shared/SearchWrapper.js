import React from "react";
import { useSelector, useDispatch } from "react-redux";

import * as DataLoader from "../../services/DataLoader";


const SearchWrapper = function({ Component }) {

  let timerId;
  const dispatch = useDispatch();
  let queryParams = useSelector((state) => state.queryParams);

  function handleSearch(currentQuery) {
    queryParams = Object.assign({}, queryParams, currentQuery);
    const queryText = DataLoader.buildQueryText(queryParams);
    const url =  `${DataLoader.baseUrl}${queryText}`;

    clearTimeout(timerId);
    timerId  =  setTimeout(function() {
      console.log(url);

      dispatch({
        type: "merge_query",
        value: currentQuery
      });

      DataLoader.doFetch(url, function(result) {
        dispatch({
          type: "merge_images",
          value: result
        });
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
