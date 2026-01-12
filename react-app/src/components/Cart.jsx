import React, { useEffect } from "react";
import "./simpleStore.css";
import { useNavigate } from "react-router-dom";

const Cart = ({ cartProducts, setCartProducts }) => {
  const navigate = useNavigate()

  return (
    <div>
      <h1>Your Cart</h1>
      <button onClick={() => navigate("/")}>Continue Shopping</button>
      <section className="products-list">
        {cartProducts.map((product) => {
          return (
            <div key={product.id} className="product-card">
              <img src={product.image} />
              <p>{product.category}</p>
              <h3>{product.title}</h3>
              <h3>${product.price}</h3>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default Cart;
