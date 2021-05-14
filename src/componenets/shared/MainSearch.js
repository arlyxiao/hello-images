import React, { useState } from "react";


const MainSearch = function({ handleSearch }) {
  const [value, setInputValue] = useState("");

  const handleChange = event => {
    event.preventDefault();
    const queryChanged = event.target.value !== value;
    setInputValue(event.target.value);

    const currentQuery = {q: encodeURIComponent(event.target.value)}
    handleSearch(currentQuery, queryChanged);
  };

  return (
    <div className="main-search">
      <div className="input-wrapper">
        <input
          type="text"
          placeholder="Start image searching"
          value={value}
          onChange={handleChange} />
      </div>
    </div>
  );
};

export default MainSearch;
