import * as React from "react";
import BaseLayout from "./layouts/BaseLayout";


const Search = () => {

  React.useEffect(() => {
  }, []);

  function handleSearch(e) {
    e.preventDefault();
  }

  return (
    <BaseLayout>

      <div className="search-panel">
        <h2></h2>
        <div className="input-wrapper">
          <input type="text" onClick={handleSearch} />
        </div>
      </div>

    </BaseLayout>
  )
}


export default Search;
