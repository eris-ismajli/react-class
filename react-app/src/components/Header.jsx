import React from "react";
import { CART_PAGE, SHOP_PAGE, DETAILS_PAGE } from "../constants/pages";

const Header = ({ navigate, cartProducts, page }) => {
  let headerTitle = "";
  
  switch (page) {
    case CART_PAGE:
      headerTitle = "Your cart";
      break;    case SHOP_PAGE:
      headerTitle = "Simple Store";
      break;
    case DETAILS_PAGE:
      headerTitle = "Product Details";
    default:
      headerTitle = "unknown";
  }

  return (
    <header>
      <h1>{headerTitle}</h1>

      <div className="cart">
        <button onClick={() => navigate("/cart")}>Cart</button>
        <p>{cartProducts.length}</p>
      </div>
    </header>
  );
};

export default Header;
