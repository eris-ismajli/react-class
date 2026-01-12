import React, { useEffect } from "react";
import "./simpleStore.css";
import { useNavigate } from "react-router-dom";

const Cart = ({ cartProducts, setCartProducts }) => {
  const navigate = useNavigate();

  const deleteCartProduct = (index) => {
    const updatedCartProducts = cartProducts.filter((product, i) => i !== index)
    setCartProducts(updatedCartProducts)
  }

  return (
    <div>
      <header>
        <h1>Your Cart</h1>
        <button onClick={() => navigate("/")}>Continue Shopping</button>
      </header>
      <section className="products-list">
        {cartProducts.map((product, index) => {
          return (
            <div key={index} className="product-card">
              <img src={product.image} />
              <p>{product.category}</p>
              <h3>{product.title}</h3>
              <h3>${product.price}</h3>
              <button onClick={() => deleteCartProduct(index)}>Delete from cart</button>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default Cart;
