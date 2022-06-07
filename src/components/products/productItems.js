import React from "react";
const ProductItem = (props) => {
  return (
    <div className="productItem__item" key={props.content.id} data-testid="Product-Item">
      {/* image */}
      <div className="img__container">
        <img src={props.content.image_url} alt="image_url" loading="lazy" />
      </div>

      <p className="title">{props.content.title}</p>
      <span>
        From{" "}
        {props.content.price.toLocaleString("en-US", {
          style: "currency",
          currency: props.selectedCurrency,
        })}
      </span>
      <button
        onClick={() => props.addProductToCart(props.content)}
        className="btn__addCart"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductItem;
