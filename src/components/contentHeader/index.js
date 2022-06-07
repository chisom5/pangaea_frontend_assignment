import React from "react";

const ContentHeader = (props) => {
  return (
    <div className="contentHeader__container">
      <div className="contentHeader__container__inner">
        <div>
          <p id="contentHeader__container__inner_title">All Products</p>
          <span>A 360 look at Lumin</span>
        </div>

        <div>{props.component}</div>
      </div>
    </div>
  );
};

export default ContentHeader;
