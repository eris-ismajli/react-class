import React from "react";
import { useNavigate } from "react-router-dom";

const Default = () => {
  const navigate = useNavigate();
  return <div>
    <button onClick={() => navigate("/login")}>Go to login</button>
  </div>;
};

export default Default;
