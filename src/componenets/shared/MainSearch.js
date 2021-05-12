import React from "react";

const MainSearch = function({ handleSearch }) {
  return (
    <div className="search-panel">
      <h2></h2>
      <div className="input-wrapper">
        <input type="text" onClick={handleSearch} />
      </div>
    </div>
  );
};

export default MainSearch;
