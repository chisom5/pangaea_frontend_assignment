import React from "react";
import { Drawer, Select } from "antd";
import { RightCircleOutlined } from "@ant-design/icons";

const { Option } = Select;

const DrawerComponent = ({
  component,
  onCloseDrawer,
  openCart,
  cartList,
  selectedCurrency,
  totalAmount,
  countriesCode,
  onSelectedCurrency,
}) => {
  return (
    <Drawer
      title=""
      placement="right"
      closable={false}
      onClose={onCloseDrawer}
      visible={openCart}
    >
      <div>
        <header>
          <p className="cart_header_text">My Shopping Cart</p>

          <div className="cart_header">
            <RightCircleOutlined onClick={onCloseDrawer} />

            <Select
              defaultValue={selectedCurrency}
              className="cart-select-currency"
              onChange={(e) => onSelectedCurrency(e)}
            >
              {countriesCode &&
                countriesCode.map((country, i) => {
                  return (
                    <Option key={i} value={country}>
                      {country}
                    </Option>
                  );
                })}
            </Select>
          </div>
        </header>

        <div className="cart-list-container">{component}</div>
      </div>
      {/* footer drawer */}
      {cartList.length !== 0 && (
        <div>
          <div className="checkout-btn">
            <p>Subtotal</p>
            <span>
              {totalAmount.toLocaleString("en-US", {
                style: "currency",
                currency: selectedCurrency,
              })}
            </span>
          </div>
          <button type="button" size="large" id="checkout">
            Proceed to checkout
          </button>
        </div>
      )}
    </Drawer>
  );
};
export default DrawerComponent;
