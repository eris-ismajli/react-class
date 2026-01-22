import React, { useEffect, useState } from "react";
import "./simpleStore.css";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const SimpleStore = ({ cartProducts, setCartProducts, products, setProducts }) => {
  const navigate = useNavigate();

  const [newProductData, setNewProductData] = useState({
    title: "",
    category: "",
    price: null,
    image: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingProductData, setEditingProductData] = useState({
    title: "",
    category: "",
    price: null,
  });

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);

  const addToCart = (product, e) => {
    e.stopPropagation()
    setCartProducts((prev) => [...prev, product]);
  };

  const deleteProduct = (index, e) => {
    e.stopPropagation()
    const updatedProducts = products.filter((product, i) => i !== index);
    setProducts(updatedProducts);
  };

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;

    if (!isEditing) {
      setNewProductData((prev) => ({
        ...prev,
        [name]: type === "file" ? files[0] : value,
      }));
    } else {
      setEditingProductData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const addProduct = () => {
    const { title, category, price, image } = newProductData;

    if (
      title.trim() === "" ||
      category.trim() === "" ||
      price === null ||
      image == ""
    ) {
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

  const applyChanges = (index) => {
    const {title, category, price} = editingProductData

    if (title.trim() === "" || category.trim() === "" || price === null) {
      alert("Please provide valid data")
      return
    }

    const updatedProducts = products.map((product, i) =>
      i === index ? { ...product, ...editingProductData } : product
    );

    setProducts(updatedProducts);
  };
  

  const toggleEdit = (product, index, e) => {
    e.stopPropagation()
    setIsEditing(!isEditing);
    if (isEditing) {
      applyChanges(index);
      setEditingIndex(null);
    } else {
      const {category, title, price} = product
      setEditingIndex(index);
      setEditingProductData({
        category,
        title,
        price
      })
    }
  };

  return (
    <main>
      <Header navigate={navigate} cartProducts={cartProducts} page={"shop"}/>

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
            <div onClick={() => navigate(`/product/${product.id}`)} key={index} className="product-card">
              <img
                src={
                  product.image instanceof File
                    ? URL.createObjectURL(product.image)
                    : product.image
                }
                alt={product.title}
              />

              {isEditing && index === editingIndex ? (
                <div>
                  <input
                    onChange={handleChange}
                    name="category"
                    type="text"
                    placeholder="category"
                    value={editingProductData.category}
                  />
                  <input
                    onChange={handleChange}
                    name="title"
                    type="text"
                    placeholder="title"
                    value={editingProductData.title}
                  />
                  <input
                    onChange={handleChange}
                    name="price"
                    type="number"
                    placeholder="price"
                    value={editingProductData.price}
                  />
                </div>
              ) : (
                <div>
                  <p>{product.category}</p>
                  <h3>{product.title}</h3>
                  <h3>${product.price}</h3>
                  <button onClick={(e) => addToCart(product, e)}>
                    Add to Cart
                  </button>
                  <button onClick={(e) => deleteProduct(index, e)}>Delete</button>
                </div>
              )}

              <button onClick={(e) => toggleEdit(product, index, e)}>
                {isEditing && index === editingIndex ? "Apply changes" : "Edit"}
              </button>
            </div>
          );
        })}
      </section>
    </main>
  );
};

export default SimpleStore;
