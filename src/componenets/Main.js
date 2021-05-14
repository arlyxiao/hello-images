import React, { useState } from "react";
import { useSelector } from 'react-redux';

import BaseLayout from "./layouts/BaseLayout";
import LoadingPanel from "./shared/LoadingPanel";
import SearchWrapper from "./shared/SearchWrapper";
import ImageLoader from "./shared/ImageLoader";
import MainSearch from "./shared/MainSearch";
import CategorySearch from "./shared/CategorySearch";
import OrderSearch from "./shared/OrderSearch";


const Search = () => {
  const imageData = useSelector((state) => state.images);
  const [loading, setLoading] = useState(false);

  const showLoadingPanel = loading ? <LoadingPanel /> : "";

  React.useEffect(() => {
    setLoading(true);
  }, [imageData]);

  React.useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <BaseLayout>

      <section className="search">
        <SearchWrapper Component={MainSearch} hasInfiniteScrolling={true} />

        <div className="optional-search">
          <SearchWrapper Component={CategorySearch} />
          <SearchWrapper Component={OrderSearch} />
        </div>
      </section>

      <section className="image-list">
        <ImageLoader images={imageData} loading={loading} />

        {showLoadingPanel}
      </section>


    </BaseLayout>
  )
}


export default Search;
