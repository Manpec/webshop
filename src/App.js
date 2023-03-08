import React, { useEffect, useState } from "react";
import styles from "./App.module.css";
import SearchResult from "./components/SearchResult";
import Search from "./components/Search";
import ShoppingCart from "./components/ShoppingCart";
import magic from "./components/magic.mp4"

function App() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [suggestions, setSuggestions] = useState([]);


  useEffect(() => {
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
    getJson();
  }, []);

  /*
  * This function is used for dropdown that shows top 3 suggestions.
  * it triggered every time the value of searchTerm state change.
  */ 
  //Using useEffect to update the searchinput to be same as rendered results
  useEffect(() => {
    const onChangeHandler = (e) => {
      //Filter the list of products that match the searchTerm state
      const filteredProducts = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );  

      //Sort the products in the list by amount of searchHits to get a list of the most frequently searched products 
      const topSuggestions = filteredProducts.sort((a, b) => {
        if (b.searchHits === a.searchHits) {
          // If searchHits are equal, sort by productnumber
          return a.productnumber - b.productnumber;
        }
        // Otherwise, sort by searchHits
        return b.searchHits - a.searchHits;
      });
      //Slice the top 3 of the topSuggestions list and map their name only and set the suggestions state
      const topThree = topSuggestions.slice(0, 3).map((item) => item.name);
      setSuggestions(topThree);
      //console.log(topThree);
    };
    onChangeHandler();
  }, [searchTerm]);

  /**
   * This functioin is used to find SearchResults that match either the selected dropdown suggestion or searchTerm state
   */
  const onClickHandler = (dropdownItem) => {
    let results = [];
    if (dropdownItem?.length > 0) { 
      //Filter the products array based on the selected dropdown suggestion.
      results = products.filter(
        (product) =>
          product.name.toLowerCase().includes(dropdownItem.toLowerCase()) ||
          product.description.toLowerCase().includes(dropdownItem.toLowerCase())
      );
    } else {
      //If no dropdown suggestion is selected, filters the products array based on the searchTerm state
      results = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    //Increments the searchHits property for each item in the results array
    results.forEach((item) => {
      item.searchHits++;
    });
    //console.log(dropdownItem);
    //console.log(results);
    //console.log(products); //10 products 
    setSearchResults(results); //Updates the searchResults state with the filtered results

  };

  const onAddHandler = (product) => {
    //(props.item)
    const exist = cartItems.find((item) => {
      return item.product.productnumber === product.productnumber;
    });

    if (exist) {
      console.log(exist); //{product: {…}, qty: 1}
      console.log(exist.qty);
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
    setTotal(total + product.price);
    console.log(cartItems);
  };

  const onDeleteHandler = (product) => { //(props.item)
    if (product.qty === 1) {
      setCartItems(
        cartItems.filter(
          (x) => x.product.productnumber !== product.product.productnumber
        )
      );
      setTotal(total - product.product.price);
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.product.productnumber === product.product.productnumber
          ? { ...product, qty: product.qty - 1 }
          : x
          )
          );
          setTotal(total - product.product.price);
        }
      };
      
      return (
        <div>
        <video autoPlay loop muted id="video">
        <source src={magic} type="video/mp4"/>
        </video>
        <div>

      <h1 className={styles.appTitle}>🔮 The Magical Shop 🔮</h1>
      <div className={styles.searchbar}>
        <Search
          suggestions={suggestions}
          searchResults={searchResults}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          clickHandler={onClickHandler}
          />
      </div>
      <div className={styles.app}>
        <div className={styles.search}>
          <SearchResult searchResults={searchResults} onAdd={onAddHandler} />
        </div>
        <div className={styles.shoppingCart}>
          <ShoppingCart
            cartItems={cartItems}
            total={total}
            onDelete={onDeleteHandler}
            />
        </div>
      </div>
            </div>
    </div>
  );
}

export default App;
