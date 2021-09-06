import React from "react";

const ProductItem = (props) => {
  return (
    <section className="productItem__container">
      {props.products &&
        props.products.map((item) => {
          return (
            <div className="productItem__item" key={item.id}>
              {/* image */}
              <div className="img__container">
                <img src={item.image_url} alt="image_url" />
              </div>

              <p className="title">{item.title}</p>
              <span>
                From{" "}
                {item.price.toLocaleString("en-US", {
                  style: "currency",
                  currency: props.selectedCurrency,
                })}
              </span>
              <button
                onClick={() => props.addProductToCart(item)}
                className="btn__addCart"
              >
                Add to Cart
              </button>
            </div>
          );
        })}
    </section>
  );
};

export default ProductItem;
