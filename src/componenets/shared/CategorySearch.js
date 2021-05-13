import React, { useState } from "react";

import SelectOptions from "./SelectOptions";


const CategorySearch = function({ handleSearch }) {

  const optionsData = {
    key: "category",
    label: "Category",
    items: {
      all: "",
      animal: "",
      travel: ""
    }
  }


  return (
    <div className="category-search">

      <SelectOptions handleSearch={handleSearch} optionsData={optionsData} />

    </div>
  );
};

export default CategorySearch;
