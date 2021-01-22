import React, { useState } from "react";
import "./App.css";

const products = [
  { name: "dove", price: 20 },
  { name: "axe", price: 30 },
  { name: "talcum", price: 50 },
];

const App = () => {
  const [cart, setCart] = useState({});
  const [cartValue, setCartValue] = useState(0);

  const calculateCartValue = (newCart) => {
    let totalCartValue = 0;

    // calculate total cart value
    Object.values(newCart).forEach((item) => {
      if (item) {
        totalCartValue = totalCartValue + item.price * item.count;
      }
    });

    // calculate discount
    if (cart.axe && cart.axe.count > 1) {
      let eligibleFreeDove = parseInt(cart.axe.count / 2);
      if (cart.dove && cart.dove.count && eligibleFreeDove) {
        const discountedItems =
          eligibleFreeDove >= cart.dove.count
            ? cart.dove.count
            : eligibleFreeDove;

        totalCartValue = totalCartValue - discountedItems * cart.dove.price;
      }
    }

    // set to state
    setCartValue(totalCartValue);
  };

  const addCartItem = (name, price) => {
    // maintain a cart map in the form of
    //  {
    //     [productName]: {count, price}
    //  }
    const cartCopy = { ...cart };
    if (!cartCopy[name]) {
      cartCopy[name] = { count: 1, price };
    } else {
      cartCopy[name].count += 1;
    }

    calculateCartValue(cartCopy);
    setCart(cartCopy);
  };

  const getRows = ({ name, price }) => {
    return (
      <tr key={name}>
        <td>{name}</td>
        <td>{price}</td>
        <td>{(cart[name] && cart[name].count) || 0}</td>
        <td>
          <button onClick={addCartItem.bind(this, name, price)}>
            Add item
          </button>
        </td>
      </tr>
    );
  };

  const getCount = () => {
    return Object.values(cart).reduce((acc, mapItem) => acc + mapItem.count, 0);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h3>Products Cart ({getCount()})</h3>
      </header>
      <div>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Items in Cart</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{products.map((item) => getRows(item))}</tbody>
        </table>
      </div>
      <h4>Cart Value: {cartValue}</h4>
    </div>
  );
};

export default App;
