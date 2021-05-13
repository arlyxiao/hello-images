import React, { useState, useRef } from "react";


const SelectListLoader = function(props) {
  const [hide, setHide] = useState(true);
  const [selectList, setSelectList] = useState({});
  const node = useRef(null);
  let listItems = "";

  const handleClick = event => {
    if (node.current.contains(event.target)) {
      return;
    }
    setHide(true);
  };

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

  function handleSelect(selectList, selectKey) {
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
        className={`${selectList[selectKey]}`}
        onClick={ () => handleSelect(selectList, selectKey) }>
          { selectKey }
      </li>
    );
  } catch (error) {
  }

  return (
    <ul className={`${hide ? "hide" : ""}`} ref={node}>
      {listItems}
    </ul>
  );
};

const SelectOptions = function({ handleSearch, optionsData }) {
  const [currentMomemnt, setCurrentMoment] = useState("");
  const [hide, setHide] = useState(true);
  const [selectedValue, setSelectedValue] = useState("");

  const toggleSelect = function(event) {
    hide ? setHide(false) : setHide(true);
    setCurrentMoment(new Date().getTime());
  };

  const handleChange = value => {
    setSelectedValue(value);
    const selectedCategory = value === "all" ? "" : encodeURIComponent(value);

    const currentQuery = {[optionsData.key]: selectedCategory};
    handleSearch(currentQuery);
  };

  return (
    <div className="select-panel">
      <label>{ optionsData.label }</label>

      <main>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="---Select---"
            readOnly="readonly"
            value={selectedValue}
            onClick={ (event) => toggleSelect(event) } />
        </div>

        <SelectListLoader
          optionsData={optionsData}
          currentMomemnt={currentMomemnt}
          handleChange={handleChange} />
      </main>

    </div>
  );
};

export default SelectOptions;
