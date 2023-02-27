import React, { useEffect, useState } from "react";
import "./App.css";
import SearchResult from "./components/SearchResult";
import Search from "./components/Search";
import ShoppingCart from "./components/ShoppingCart";

function App() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
 

  let getJson = () => {
    fetch("products.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setProducts(data); //Update jsonData
        //console.log(data);
      })
      // .then(
      //   setSearchResults(products)
      // )
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
    setSearchResults(results);
    
  };


 

  return (
    <div className="app">
      <h1>The Magic Store 🔮</h1>
      
      <Search
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}  
        clickHandler={onClickHandler}
      />
      
      <SearchResult
       searchResults={searchResults}
      />
      <ShoppingCart />
    </div>
  );
}

export default App;
