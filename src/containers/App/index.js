import React, { useState, useEffect, useCallback } from "react";
// ui component
import Header from "../../components/header";
import ContentHeader from "../../components/contentHeader";
import Products from "../../components/products";
import DrawerComponent from "../../components/drawer";
import CartListItem from "../../components/cartItem";
import FilterSelectComponent from "../../components/filterCurrency";
//
import update from "immutability-helper";
import { Spin, Result } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
// utility
import { gql, useQuery } from "@apollo/client";

const App = () => {
  const [openCart, setOpenCart] = useState(false);
  const [cartList, setCartList] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [itemPrice, setItemPrice] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);

  const FETCH_PRODUCTS = gql`
  query Products {
    products {
      id
      title
      image_url
      price(currency: ${selectedCurrency})
    }
  }
`;
  const FETCH_CURRENCY = gql`
    query Currency {
      currency
    }
  `;

  const { loading, error, data } = useQuery(FETCH_PRODUCTS);
  const currencyRes = useQuery(FETCH_CURRENCY);
console.log(currencyRes);

  // console.log(currencyRes);
  const getTotalAmount = useCallback(() => {
    let tAmount = 0;
    for (let x = 0; x < cartList.length; x++) {
      tAmount += cartList[x].price;
    }
    return tAmount;
  }, [cartList]);

  useEffect(() => {
    if (cartList.length !== 0 && data !== undefined) {
      let newItemPrice;

      for (let i = 0; i < data.products.length; i++) {
        let product_i = data.products[i];
        for (let x = 0; x < cartList.length; x++) {
          if (cartList[x].id === product_i.id) {
            cartList[x].price = cartList[x].quantity * product_i.price;
            newItemPrice = product_i.price;
          }
        }
      }

      setItemPrice(newItemPrice);
      setTotalAmount(getTotalAmount());
    }
  }, [selectedCurrency, data, cartList, getTotalAmount]);

  useEffect(() => {
    setTotalAmount(getTotalAmount());
  }, [getTotalAmount]);

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

      if (itemPrice !== item.price) {
        setItemPrice(item.price);
      }
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

  return (
    <div>
      <Header
        openDrawerCart={openDrawerCart}
        noOfItemInCart={cartList.length}
      />
      <section className="content">
        <ContentHeader
          selectedCurrency={selectedCurrency}
          component={
            <FilterSelectComponent
              countriesCode={
                currencyRes &&
                currencyRes.data !== undefined &&
                currencyRes.data.currency
              }
              onSelectedCurrency={onFilterCurrency}
            />
          }
        />
        <div className="product__container">
          {loading ? (
            <div className="spinner">
              <Spin
                size="small"
                data-testid="spinner"
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
            <Products productArr={data} 
            selectedCurrency={selectedCurrency}
            addProductToCart={addProductToCart}
            />
          )}
        </div>
      </section>
      {/* drawer */}
      <DrawerComponent
        onCloseDrawer={onCloseDrawer}
        openCart={openCart}
        cartList={cartList}
        selectedCurrency={selectedCurrency}
        totalAmount={totalAmount}
        countriesCode={
          currencyRes &&
          currencyRes.data !== undefined &&
          currencyRes.data.currency
        }
        onSelectedCurrency={onFilterCurrency}
        component={cartList.map((item) => (
          <CartListItem
            item={item}
            key={item.id}
            data={data}
            selectedCurrency={selectedCurrency}
            removeItemFromCart={removeItemFromCart}
            increaseItemQuantity={addProductToCart}
            reduceItemFromCart={reduceItemFromCart}
          />
        ))}
      />
    </div>
  );
};

export default App;
