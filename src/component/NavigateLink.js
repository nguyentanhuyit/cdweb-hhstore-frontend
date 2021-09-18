import React from "react";
import { VscHome } from "react-icons/vsc";
import { MdKeyboardArrowRight } from "react-icons/md";

const NavigateLink = (props) => {
  const style = {
    // display: "flex",
    // alignItems: "center",
  };

  const fontStyle = {
    fontSize: "0.9rem",
  };

  const { link1, link2 } = props;
  return (
    <div className="navigate_link" style={style}>
      <VscHome />
      <MdKeyboardArrowRight />
      <span style={fontStyle}>{link1}</span>
      <MdKeyboardArrowRight />
      <span style={fontStyle}>{link2}</span>
    </div>
  );
};

export default NavigateLink;
