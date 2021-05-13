import React, { useState } from "react";


const MainSearch = function({ handleSearch }) {
  const [value, setInputValue] = useState("");

  const handleOnChange = event => {
    event.preventDefault();
    setInputValue(event.target.value);

    const currentQuery = {q: encodeURIComponent(event.target.value)}
    handleSearch(currentQuery);
  };

  return (
    <div className="main-search">
      <h2></h2>
      <div className="input-wrapper">
        <input
          type="text"
          placeholder="Start image searching"
          value={value}
          onChange={handleOnChange} />
      </div>
    </div>
  );
};

export default MainSearch;
