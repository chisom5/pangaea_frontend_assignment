import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { graphql } from "msw";
import { setupServer } from "msw/node";

import client from "../config/client";
import { ApolloProvider } from "@apollo/client";
import App from "../containers/App";

const pangaeaBaseUrl = graphql.link(
  `https://pangaea-interviews.now.sh/api/graphql`
);

export const handlers = [
  pangaeaBaseUrl.query("Products", (req, res, ctx) => {
    return res(
      ctx.data({
        products: [
          {
            id: 1,
            image_url:
              "https://d1b929y2mmls08.cloudfront.net/luminskin/img/new-landing-page/moisturizing-balm.png",
            price: 29,
            title: "Premium-Grade Moisturizing Balm",
            __typename: "Product",
          },
          {
            id: 2,
            image_url:
              "https://d1b929y2mmls08.cloudfront.net/luminskin/img/new-landing-page/charcoal-cleanser.png",
            price: 16,
            title: "No-Nonsense Charcoal Cleanser",
            __typename: "Product",
          },
        ],
      })
    );
  }),
  pangaeaBaseUrl.query("Currency", (req, res, ctx) => {
    return res(
      ctx.data({
        currency: ["USD", "AED", "AFN", "ALL", "AMD", "ANG", "AOA", "ARS"],
      })
    );
  }),
];

const server = setupServer(...handlers);

// Enable API mocking before tests.
beforeAll(() => server.listen({ onUnhandledRequest: "warn" }));

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

const props = {
  addProductToCart: jest.fn(),
  removeItemFromCart: jest.fn(),
  reduceItemFromCart: jest.fn(),
};

const setup = (props) => {
  render(
    <ApolloProvider client={client}>
      <App {...props} />
    </ApolloProvider>
  );
};

describe("App component page", () => {
  it("App should display header name and other nav", async () => {
    setup()
    expect(screen.getByText("Lumin")).toBeInTheDocument();
    expect(screen.getByText(/shop/i)).toBeInTheDocument();
    expect(screen.getByText(/learn/i)).toBeInTheDocument();
  });

  it("App should display content header name and subtitle", async () => {
    setup()
    expect(screen.getByText(/all Products/i)).toBeInTheDocument();
    expect(screen.getByText("A 360 look at Lumin")).toBeInTheDocument();
  });

  it("it should render the product item from the data fetched", async () => {
    setup();
    expect(screen.getByTestId("spinner")).toBeInTheDocument(); // loading spinner
    
    await waitFor(() =>
      expect(screen.getAllByTestId("Product-Item").length).not.toBe(0)
    ); //data fetched
  });
});
