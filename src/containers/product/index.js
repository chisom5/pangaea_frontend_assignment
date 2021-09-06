import React, { useState } from "react";
import Header from "../../components/header";
import ContentHeader from "../../components/header/contentHeader";
import ProductItem from "./components/productItem";
import { Drawer } from "antd";
import update from "immutability-helper";
import CartListItem from "./components/addToCartItem";
import { gql, useQuery } from "@apollo/client";
import { Spin, Result } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const Product = () => {
  const [openCart, setOpenCart] = useState(false);
  const [cartList, setCartList] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [itemPrice, setItemPrice] = useState(null);

  const FETCH_PRODUCTS = gql`
  query {
    products {
      id
      title
      image_url
      price(currency: ${selectedCurrency})
    }
  }
`;
  const FETCH_CURRENCY = gql`
    query {
      currency
    }
  `;
  const onCloseDrawer = () => {
    setOpenCart(false);
  };
  const openDrawerCart = () => {
    setOpenCart(true);
  };
  const addProductToCart = (item, val = 1) => {
    if (cartList.filter((list) => list.id === item.id).length !== 0) {
      const index = cartList.findIndex((cart) => cart.id === item.id);

      setCartList(
        update(cartList, {
          [index]: {
            $merge: {
              quantity: cartList[index].quantity + val,
              price: (cartList[index].quantity + val) * itemPrice,
            },
          },
        })
      );
    } else {
      let quantity = 1;
      let newObj = { ...item, quantity };

      setCartList(
        update(cartList, {
          $push: [newObj],
        })
      );
      setItemPrice(item.price);
    }

    setOpenCart(true);
  };
  const removeItemFromCart = (item) => {
    const index = cartList.findIndex((cart) => cart.id === item.id);
    setCartList(
      update(cartList, {
        $splice: [[index, 1]],
      })
    );
  };
  const reduceItemFromCart = (item) => {
    const index = cartList.findIndex((cart) => cart.id === item.id);
    // if the current quantity is 1 remove item
    if (cartList[index].quantity === 1) {
      setCartList(
        update(cartList, {
          $splice: [[index, 1]],
          [index]: {
            price: {
              $set: (cartList[index].quantity - 1) * itemPrice,
            },
          },
        })
      );
    } else {
      // substract the quantity
      setCartList(
        update(cartList, {
          [index]: {
            $merge: {
              quantity: cartList[index].quantity - 1,
              price: (cartList[index].quantity - 1) * itemPrice,
            },
          },
        })
      );
    }
  };
  const onFilterCurrency = (val) => {
    setSelectedCurrency(val);
  };

  let totalAmount = 0;

  for (let x = 0; x < cartList.length; x++) {
    totalAmount += cartList[x].price;
  }
  const { loading, error, data } = useQuery(FETCH_PRODUCTS);
  const currencyRes = useQuery(FETCH_CURRENCY);
  return (
    <div>
      <Header openDrawerCart={openDrawerCart} noOfItemInCart={cartList.length}/>
      <section className="content">
        <ContentHeader
          selectedCurrency={selectedCurrency}
          countriesCode={
            currencyRes &&
            currencyRes.data !== undefined &&
            currencyRes.data.currency
          }
          onSelectedCurrency={onFilterCurrency}
        />
        <div className="product__container">
          {loading ? (
            <div className="spinner">
              <Spin
                size="small"
                indicator={
                  <LoadingOutlined
                    style={{ fontSize: 24, color: "#00A3A1" }}
                    spin
                  />
                }
              />
            </div>
          ) : error ? (
            <Result
              status="500"
              title="500"
              subTitle="Sorry, something went wrong."
            />
          ) : (
            <ProductItem
              products={data && data.products}
              selectedCurrency={selectedCurrency}
              addProductToCart={addProductToCart}
            />
          )}
        </div>
      </section>
      {/* drawer */}
      <Drawer
        title="Cart Item"
        placement="right"
        onClose={onCloseDrawer}
        visible={openCart}
      >
        <div>
          {cartList.map((item, i) => {
            return (
              <CartListItem
                key={i}
                item={item}
                removeItemFromCart={removeItemFromCart}
                increaseItemQuantity={addProductToCart}
                reduceItemFromCart={reduceItemFromCart}
              />
            );
          })}
        </div>

        {/* footer drawer */}
        {cartList.length !== 0 && (
          <div className="checkout-btn">
            <button type="button" size="large" id="checkout">
              Total {`${selectedCurrency} ${totalAmount.toFixed(2)}`}
            </button>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default Product;
