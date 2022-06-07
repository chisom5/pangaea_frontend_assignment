import React from "react";
import ProductItem from "./productItems";

const Products = ({ productArr, addProductToCart, selectedCurrency }) => {
  return (
    <section className="productItem__container">
      {productArr &&
        productArr.products.map((item) => (
          <ProductItem
            content={item}
            key={item.id}
            selectedCurrency={selectedCurrency}
            addProductToCart={addProductToCart}
          />
        ))}
    </section>
  );
};

export default Products;
