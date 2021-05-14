import React, { useState, useRef } from "react";


const SelectListLoader = function(props) {
  const [hide, setHide] = useState(true);
  const [selectList, setSelectList] = useState({});
  const node = useRef(null);
  let listItems = "";

  React.useEffect(() => {
    hide ? setHide(false) : setHide(true);
  }, [props.currentMomemnt]);

  React.useEffect(() => {
    setHide(true);
    setSelectList(props.optionsData.items);

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const showSelectLabel = function() {
    if (props.selectedValue) {
      return `${props.optionsData.label}: ${props.selectedValue}`;
    }

    return `Select ${props.optionsData.label}`;
  };

  const handleClick = event => {
    if (node.current.contains(event.target)) {
      return;
    }
    setHide(true);
  };

  const toggleSelect = function() {
    hide ? setHide(false) : setHide(true);
  };

  const handleSelect = function(selectList, selectKey) {
    let data = {};
    Object.keys(selectList).forEach(function(key) {
      data[key] = "";
    });

    data[selectKey] = "active";

    setHide(true);
    setSelectList(data);

    props.handleChange(selectKey);
  }

  try {
    listItems = Object.keys(selectList).map((selectKey) =>
      <li
        key={selectKey}
        className={`${selectList[selectKey]} ${hide ? "hide" : ""}`}
        onClick={ () => handleSelect(selectList, selectKey) }>
          { selectKey }
      </li>
    );
  } catch (error) {
  }

  return (
    <ul ref={node}>
      <li key="first-li" className="first-li" onClick={ () => toggleSelect() }>
        {`${showSelectLabel()}`}
      </li>
      {listItems}
    </ul>
  );
};

const SelectOptions = function({ handleSearch, optionsData }) {
  const [selectedValue, setSelectedValue] = useState("");
  const currentMoment = new Date().getTime();

  const handleChange = value => {
    const queryChanged = value !== selectedValue;
    const selectedQuery = value === "all" ? "" : encodeURIComponent(value);

    const currentQuery = {[optionsData.key]: selectedQuery};
    setSelectedValue(value);

    handleSearch(currentQuery, queryChanged);
  };

  return (
    <div className="select-panel">
      <SelectListLoader
          optionsData={optionsData}
          currentMoment={currentMoment}
          selectedValue={selectedValue}
          handleChange={handleChange} />

    </div>
  );
};

export default SelectOptions;
