import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";


const SelectListLoader = function(props) {
  const [hide, setHide] = useState(true);
  const [selectList, setSelectList] = useState({});
  let listItems = "";

  React.useEffect(() => {
    hide ? setHide(false) : setHide(true);
  }, [props.currentMomemnt]);

  React.useEffect(() => {
    setHide(true);
    setSelectList(props.selectList);
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
    <ul className={`${hide ? "hide" : ""}`}>
      {listItems}
    </ul>
  );
};

const OptionalSearch = function({ handleSearch }) {
  const [currentMomemnt, setCurrentMoment] = useState('');
  const [hide, setHide] = useState(true);
  const [selectedValue, setSelectedValue] = useState('');

  const selectList = {
    All: "",
    Animals: "",
    Travel: ""
  };

  const toggleSelect = function(event) {
    event.stopPropagation();

    hide ? setHide(false) : setHide(true);
    setCurrentMoment(new Date().getTime());
  };

  const handleChange = value => {
    setSelectedValue(value);
    const selectedCategory = value === "all" ? "" : encodeURIComponent(value.toLowerCase());

    const currentQuery = {category: selectedCategory};
    handleSearch(currentQuery);
  };

  return (
    <div className="optional-search">
      <h4>More Options</h4>

      <div className="category select-panel">
        <label>Category</label>

        <main>
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Select Category"
              readOnly="readonly"
              value={selectedValue}
              onClick={ (event) => toggleSelect(event) } />
          </div>

          <SelectListLoader
            selectList={selectList}
            currentMomemnt={currentMomemnt}
            handleChange={handleChange} />
        </main>

      </div>

    </div>
  );
};

export default OptionalSearch;
