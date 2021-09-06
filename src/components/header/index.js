import React from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";

const Header = (props) => {
  return (
    <header className="header__container">
      <div className="header__inner header__left">
        <p id="header__title">Lumin</p>

        <div className="header__inner nav">
          <p>Shop</p>
          <p>Learn</p>
        </div>
      </div>

      <div className="header__inner header__right">
        <span id="account__label">Account</span>

        <div id="account__cart">
          <ShoppingCartOutlined
            id="cart"
            onClick={() => props.openDrawerCart()}
          />
          {props.noOfItemInCart !== 0 && (
            <p id="account__cart__no">{props.noOfItemInCart}</p>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
