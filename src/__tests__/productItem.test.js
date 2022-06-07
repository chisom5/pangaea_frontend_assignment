import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductItem from "../components/products/productItems";

describe("test on the App component", () => {
  it("it should add product item to cart", async () => {
    const productItemProps = {
      selectedCurrency: "USD",
      addProductToCart: jest.fn(),
      content: {
        id: 1,
        image_url:
          "https://d1b929y2mmls08.cloudfront.net/luminskin/img/new-landing-page/moisturizing-balm.png",
        price: 29,
        title: "Premium-Grade Moisturizing Balm",
      },
    };

    render(<ProductItem {...productItemProps} />);
    expect(screen.getByAltText("image_url")).toBeInTheDocument();
    expect(
      screen.getByText(/premium\-grade moisturizing balm/i)
    ).toBeInTheDocument();

    let addCartBtn = screen.getByRole("button", { name: /add to cart/i });

    expect(addCartBtn).toBeInTheDocument();
    fireEvent.click(addCartBtn);

    expect(productItemProps.addProductToCart).toHaveBeenCalled();
  });
});
