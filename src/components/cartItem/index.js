import React from "react";
import { Button } from "antd";
import { PlusOutlined, MinusOutlined, CloseOutlined } from "@ant-design/icons";

const CartListItem = ({
  item,
  data,
  selectedCurrency,
  removeItemFromCart,
  increaseItemQuantity,
  reduceItemFromCart,
}) => {
  return (
    <div className="cart-list-item">
      <div className="content">
        <div>
          <div className="cart-item-desc">
            <h4 className="title">{item.title}</h4>

            <span onClick={removeItemFromCart}>
              <CloseOutlined />
            </span>
          </div>

          <div className="cart-item-desc">
            <p>Two month supply shipped every two months</p>
            {/* img */}
            <div id="cart-item-img">
              <img src={item.image_url} alt="product_img" />
            </div>
          </div>
        </div>
      </div>

      <div className="action">
        {increaseItemQuantity && (
          <div className="btn-actions">
            <Button
              icon={<PlusOutlined />}
              className="btn-mr btn-noBorder"
              onClick={() => {
                increaseItemQuantity(item, 1);
              }}
            />

            <p>{item.quantity}</p>

            <Button
              icon={<MinusOutlined />}
              className="btn-ml btn-noBorder"
              onClick={() => {
                reduceItemFromCart(item);
              }}
            />
          </div>
        )}

        <span>
          {data && data.products ? item.price.toLocaleString("en-US", {
            style: "currency",
            currency: selectedCurrency,
          }) : item.price}
        </span>
      </div>
    </div>
  );
};

export default CartListItem;
