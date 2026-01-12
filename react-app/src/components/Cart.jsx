import React, { useEffect, useState } from "react";
import "./simpleStore.css";
import { useNavigate } from "react-router-dom";

const Cart = ({ cartProducts, setCartProducts }) => {
  const navigate = useNavigate();

  const deleteCartProduct = (index) => {
    const updatedCartProducts = cartProducts.filter(
      (product, i) => i !== index
    );
    setCartProducts(updatedCartProducts);
  };

  const totalPrice = cartProducts.reduce(
    (total, product) => total + product.price,
    0
  );

  return (
    <div>
      <header>
        <h1>Your Cart</h1>
        <h3>Total price: ${totalPrice}</h3>
        <button onClick={() => navigate("/")}>Continue Shopping</button>
      </header>
      <section className="products-list">
        {cartProducts.length > 0 ? (
          cartProducts.map((product, index) => {
            return (
              <div key={index} className="product-card">
                <img src={product.image} />
                <p>{product.category}</p>
                <h3>{product.title}</h3>
                <h3>${product.price}</h3>
                <button onClick={() => deleteCartProduct(index)}>
                  Delete from cart
                </button>
              </div>
            );
          })
        ) : (
          <p>No items in your cart.</p>
        )}
      </section>
    </div>
  );
};

export default Cart;
