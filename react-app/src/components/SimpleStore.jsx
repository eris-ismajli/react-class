import React, { useEffect, useState } from "react";
import "./simpleStore.css";
import { useNavigate } from "react-router-dom";

const SimpleStore = ({ cartProducts, setCartProducts }) => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [newProductData, setNewProductData] = useState({
    title: "",
    category: "",
    price: null,
    image: "",
  });

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);

  const addToCart = (product) => {
    setCartProducts((prev) => [...prev, product]);
  };

  const deleteProduct = (index) => {
    const updatedProducts = products.filter((product, i) => i !== index);
    setProducts(updatedProducts);
  };

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;

    setNewProductData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const addProduct = () => {
    const { title, category, price, image } = newProductData;

    if (title.trim() === "" || category.trim() === "" || price === null || image.trim() === "") {
      alert("Please provide all the data");
      return;
    }

    const productToAdd = {
      id: Date.now(),
      title,
      category,
      price,
      image,
    };

    setProducts((prev) => [...prev, productToAdd]);
  };

  return (
    <main>
      <header>
        <h1>Simple store</h1>

        <div className="cart">
          <button onClick={() => navigate("/cart")}>Cart</button>
          <p>{cartProducts.length}</p>
        </div>
      </header>

      <input
        onChange={handleChange}
        type="text"
        name="title"
        placeholder="new product title"
      />
      <input
        onChange={handleChange}
        type="text"
        name="category"
        placeholder="new product category"
      />
      <input
        onChange={handleChange}
        type="number"
        name="price"
        placeholder="new product price"
      />
      <input onChange={handleChange} type="file" name="image" accept="/image" />
      <button onClick={addProduct}>Add product</button>

      <section className="products-list">
        {products.map((product, index) => {
          return (
            <div key={index} className="product-card">
              <img
                src={
                  product.image instanceof File
                    ? URL.createObjectURL(product.image)
                    : product.image
                }
                alt={product.title}
              />

              <p>{product.category}</p>
              <h3>{product.title}</h3>
              <h3>${product.price}</h3>
              <button onClick={() => addToCart(product)}>Add to Cart</button>
              <button onClick={() => deleteProduct(index)}>Delete</button>
            </div>
          );
        })}
      </section>
    </main>
  );
};

export default SimpleStore;
