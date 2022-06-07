import { Select } from "antd";

const {Option} = Select;

const FilterSelectComponent = (props) => {
  return (
    <Select
    
      placeholder="Filter by"
      className="contentHeader__container__inner__filter"
      showSearch
      optionFilterProp="children"
      onChange={(e) => props.onSelectedCurrency(e, "selectedCurrency")}
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {props.countriesCode &&
        props.countriesCode.map((country, i) => {
          return (
            <Option key={i} value={country} data-testid="filterSelect">
              {country}
            </Option>
          );
        })}
    </Select>
  );
};

export default FilterSelectComponent;