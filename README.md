# Pangaea Frontend Takehome

This assignment was to recreate the [a link](http://luminskin.com/) and cart using a GraphQL API in ReactJS

## Product page Requirements
- should query from 

```js
    https://pangaea-interviews.now.sh/api/graphql,
```
retrieve the products and display them in a grid. Feel free to use graphql client librariessuch as Apollo Client.

- Each Item should display the image, title, price and a "Add to Cart" button

- For screens wider than 768px, it should show grid of 3 items, for less than 768px wide it should show a grid of two wide.

### Cart Requirement

- When a user clicks "Add to cart" on an item it should open the cart sidebar and add the item in.

- If the item already exist it should increment the quantity

- Clicking the + or - buttons will increase or descrease the quantity, if the quantity is 1 and the "-" button is pressed it should remove the item.

- In the top left there is a currency select, doing so should requery the GraphQL api with a new currency and update the prices.

- It should sum the Items in the cart and display them in the correct selected currency.

- Ignore anything related to subscriptions

