import React from "react";
import { Button } from "antd";
import { PlusOutlined, MinusOutlined, CloseOutlined } from "@ant-design/icons";

const ButtonGroup = Button.Group;

const CartListItem = ({
  item,
  removeItemFromCart,
  increaseItemQuantity,
  reduceItemFromCart,
}) => {
  return (
    <div className="cart-list-item">
      <div className="content">
        <div>
          <h4 className="title">{item.title}</h4>

          <div>
            <span role="button" className="quantity">
              <strong>Qty:</strong>
              {item.quantity}
            </span> 
            <span>
              <strong> &nbsp; Amt:</strong>
              {item.price.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <div className="action">
        {increaseItemQuantity && (
          <ButtonGroup style={{ display: "flex" }}>
            <Button
              icon={<PlusOutlined />}
              onClick={() => {
                increaseItemQuantity(item, 1);
              }}
              disabled={Number(item.original_price) === 0}
            />
            <Button
              icon={<MinusOutlined />}
              onClick={() => {
                reduceItemFromCart(item);
              }}
              disabled={Number(item.original_price) === 0}
            />
            <Button
              icon={<CloseOutlined />}
              onClick={() => {
                removeItemFromCart(item);
              }}
            />
          </ButtonGroup>
        )}
      </div>
    </div>
  );
};

export default CartListItem;
