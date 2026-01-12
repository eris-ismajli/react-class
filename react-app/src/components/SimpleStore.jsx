import React, { useEffect, useState } from "react";
import "./simpleStore.css";
import { useNavigate } from "react-router-dom";

const SimpleStore = ({cartProducts, setCartProducts}) => {
  const navigate = useNavigate()

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);

  const addToCart = (product) => {
    setCartProducts(prev => ([
        ...prev,
        product
    ]))
  }

  return (
    <main>
      <header>
        <h1>Simple store</h1>

        <div className="cart">
            <button onClick={() => navigate("/cart")}>Cart</button>
            <p>{cartProducts.length}</p>
        </div>
      </header>

      <section className="products-list">
        {products.map((product) => {
          return (
            <div key={product.id} className="product-card">
              <img src={product.image} />
              <p>{product.category}</p>
              <h3>{product.title}</h3>
              <h3>${product.price}</h3>
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          );
        })}
      </section>
    </main>
  );
};

export default SimpleStore;
