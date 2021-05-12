import React from "react";
import { useDispatch } from "react-redux";

import * as DataLoader from "../../services/DataLoader";


const SearchWrapper = function({ Component }) {

  let timerId;
  const dispatch = useDispatch();

  const makeAPICall = function() {
    DataLoader.doFetch(DataLoader.url, function(result) {
      dispatch({
        type: 'merge',
        value: result
      });
    });
  }

  const debounceAPICall = function(callback, delay) {
    clearTimeout(timerId);
    timerId  =  setTimeout(function() {
      callback();
    }, delay);
  }

  function handleSearch() {
    debounceAPICall(makeAPICall, 500);
  }

  return (
    <>

      <Component handleSearch={handleSearch} />

    </>
  )

};

export default SearchWrapper;
