import React from "react";
// router dom
import { Link } from "react-router-dom";
// design
import { BiSearchAlt } from "react-icons/bi";

const AutoCompleteOption = (props) => {
  const custom = {
    color: "black",
    textDecoration: "none",
  };
  return (
    <Link style={custom} to={`/products/search?search=${props.optionText}`}>
      <div className="auto_complete_option">
        <BiSearchAlt />
        <p className="text">{props.optionText}</p>
      </div>
    </Link>
  );
};

export default AutoCompleteOption;
