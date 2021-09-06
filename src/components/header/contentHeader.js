import React from "react";
import { Select } from "antd";
// import { Countries } from "../../utils/countryCurrency";
const { Option } = Select;

const ContentHeader = (props) => {
  const onCountryChange = (e) => {
    console.log(`Selected ${e}`);
    props.onSelectedCurrency(e)
  };
console.log(props.countriesCode)
  return (
    <div className="contentHeader__container">
      <div className="contentHeader__container__inner">
        <div>
          <p id="contentHeader__container__inner_title">All Products</p>
          <span>A 360 look at Lumin</span>
        </div>

        <div>
          <Select
            defaultValue="Filter by"
            className="contentHeader__container__inner__filter"
            showSearch
            optionFilterProp="children"
            onChange={(e) => onCountryChange(e, "selectedCurrency")}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {props.countriesCode  && props.countriesCode.map((country, i) => {
              return <Option key={i} value={country}>{country}</Option>;
            })}
          </Select>
        </div>
      </div>
    </div>
  );
};

export default ContentHeader;
