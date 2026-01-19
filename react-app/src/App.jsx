import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Exercises from "./components/Exercises";
import Login from "./components/Login";
import SimpleStore from "./components/SimpleStore";
import Users from "./components/Users";
import Cart from "./components/Cart";
import { useState } from "react";
import ProductDetails from "./components/ProductDetails";

//https://github.com/eris-ismajli/react-class

const App = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [products, setProducts] = useState([]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <SimpleStore
              cartProducts={cartProducts}
              setCartProducts={setCartProducts}
              products={products}
              setProducts={setProducts}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <Cart
              cartProducts={cartProducts}
              setCartProducts={setCartProducts}
            />
          }
        />
        <Route
          path="/product/:id"
          element={
            <ProductDetails products={products} setProducts={setProducts} />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
