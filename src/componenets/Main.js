import React from "react";
import { useSelector } from 'react-redux';

import BaseLayout from "./layouts/BaseLayout";
import SearchWrapper from "./shared/SearchWrapper";
import ImageLoader from "./shared/ImageLoader";
import MainSearch from "./shared/MainSearch";
import OptionalSearch from "./shared/OptionalSearch";


const Search = () => {
  const imageData = useSelector((state) => state.images);

  // React.useEffect(() => {
  // }, [imageData]);

  return (
    <BaseLayout>

      <section className="search">
        <SearchWrapper Component={MainSearch} />
        <SearchWrapper Component={OptionalSearch} />
      </section>

      <ImageLoader images={imageData.hits} />

    </BaseLayout>
  )
}


export default Search;
