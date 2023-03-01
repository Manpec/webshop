import React, { useEffect, useState } from "react";
import "./App.css";
import SearchResult from "./components/SearchResult";
import Search from "./components/Search";
import ShoppingCart from "./components/ShoppingCart";

function App() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  let getJson = () => {
    fetch("products.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setProducts(data); //Update jsonData
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  useEffect(() => {
    getJson();
  }, []);

  const onClickHandler = (e) => {
    const results = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    console.log(results);
    console.log(products);
    setSearchResults(results);
  };

  const onAdd = (product) => {
    const exist = cartItems.find(
      (x) => x.product.productnumber === product.productnumber
    );
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.product.productnumber === product.productnumber
            ? { ...exist, qty: exist.qty + 1 }
            : x
        )
      );
    } else {
      setCartItems([...cartItems, { product, qty: 1 }]);
    }
    console.log(cartItems);
  };

  return (
    <div className="app">
      <h1>The Magic Store 🔮</h1>

      <Search
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        clickHandler={onClickHandler}
      />

      <SearchResult searchResults={searchResults} onAdd={onAdd} />
      <ShoppingCart cartItems={cartItems} />
    </div>
  );
}

export default App;
