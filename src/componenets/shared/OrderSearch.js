import React from "react";

import SelectOptions from "./SelectOptions";


const OrderSearch = function({ handleSearch }) {

  const optionsData = {
    key: "order",
    Label: "Order",
    default: "popular",
    items: {
      popular: "active",
      latest: ""
    }
  }


  return (
    <div className="order-search">

      <SelectOptions handleSearch={handleSearch} optionsData={optionsData} />

    </div>
  );
};

export default OrderSearch;
