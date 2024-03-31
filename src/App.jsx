import React from "react";
import Filter from "./Filter";
import Products from "./Products";
import "./App.css";

const App = () => {
  return (
    <div className="container">
      <h1>Shopping Filter</h1>
      <Filter />
      <Products />
    </div>
  );
};

export default App;
