import React from "react";
import Filter from "./Filter";
import Products from "./Products";
import "./App.css";

const App = () => {
  return (
    <div className="container">
      <h1>Product Filters</h1>
      <Filter />
      <Products />
    </div>
  );
};

export default App;
