import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Exercises from "./components/Exercises"
import Login from "./components/Login"
import SimpleStore from "./components/SimpleStore"
import Users from "./components/Users"
import Cart from "./components/Cart"
import { useState } from "react"

// npm install react-router-dom

const App = () => {
  const [cartProducts, setCartProducts] = useState([])
  return <Router>
    <Routes>
      <Route path="/" element={<SimpleStore cartProducts={cartProducts} setCartProducts={setCartProducts}/>}/>
      <Route path="/cart" element={<Cart cartProducts={cartProducts} setCartProducts={setCartProducts} />}/>
    </Routes>
  </Router>
} 

export default App