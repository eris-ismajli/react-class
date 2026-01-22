import React from "react";
import "./simpleStore.css"
import { useParams } from "react-router-dom";

const ProductDetails = ({ products, setProducts }) => {
  const { id } = useParams();

  const product = products.find((product) => product.id === Number(id));

  return (
    <main className="product-details">
      <div className="left-container">
        <img src={product.image} />
      </div>

      <div className="right-container">
        <h3>{product.title}</h3>
        <p>{product.description}</p>
        <h4>{product.price}</h4>
        <button>Add to cart</button>
      </div>
    </main>
  );
};

export default ProductDetails;
