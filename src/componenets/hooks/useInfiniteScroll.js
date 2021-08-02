import { useState, useEffect } from "react";


const useInfiniteScroll = (callback) => {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", isScrolling);

    return () => window.removeEventListener("scroll", isScrolling);
  }, []);

  useEffect(() => {
    if (isFetching) {
      callback();
    }
  }, [isFetching]);

  function isScrolling() {
    const offset = window.innerHeight + document.documentElement.scrollTop;
    if (Math.abs(Math.floor(offset) - document.documentElement.offsetHeight) <= 1 && !isFetching) {
      setIsFetching(true);
    }
  }
  return [isFetching, setIsFetching];
};

export default useInfiniteScroll;
