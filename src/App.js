import React, { useEffect, useState } from "react";
import styles from "./App.module.css";
import SearchResult from "./components/SearchResult";
import Search from "./components/Search";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";
import magic from "./components/UI/magic.mp4";

function App() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [suggestions, setSuggestions] = useState([]);

  /**
   * Fetch data from JSON and updata products state
   */

  useEffect(() => {
    let getJson = () => {
      fetch("products.json")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setProducts(data); //Update products
        })
        .catch((error) => {
          console.error(error.message);
        });
    };
    getJson();
  }, []);

  /*
   * This function is used for dropdown that shows top 3 suggestions.
   * The useEffect hook is used to run this function every time the value of searchTerm state changes. (Using useEffect to update the searchinput to be same as rendered results)
   */
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
    };
    onChangeHandler();
  }, [searchTerm]);

  /**
   * This functioin is used to find SearchResults that match either the selected dropdown suggestion or searchTerm state
   */
  const onClickHandler = (dropdownItem) => {
    // Update the disabledRating property with false to be able to rate again
    setProducts(resetDisabledRating());
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
    setSearchResults(results); //Updates the searchResults state with the filtered results
  };

  /**
   * onAddHandler and onDeleteHandler to add or remove products from the ShoppingCart,
   * as well as update the total price.
   */
  const onAddHandler = (product) => {
    //Search the ShoppingCart's existing products to see if the product is already there.
    const exist = cartItems.find((item) => {
      return item.product.productnumber === product.productnumber;
    });
    //If the product is already in the shopping cart, the quantity of the existing product in the shopping cart is updated by one.
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.product.productnumber === product.productnumber
            ? { ...exist, qty: exist.qty + 1 }
            : x
        )
      );
    } else {
      //If the product is not in the shopping cart, it is added with the quantity:1.
      setCartItems([...cartItems, { product, qty: 1 }]);
    }
    setTotal(total + product.price);
  };

  const onDeleteHandler = (product) => {
    //checks if the quantity of the product in the shopping cart is equal to one
    if (product.qty === 1) {
      //Remove the product from the shopping cart
      setCartItems(
        cartItems.filter(
          (x) => x.product.productnumber !== product.product.productnumber
        )
      );
    } else {
      //otherwise the quantity of the product is reduced by one
      setCartItems(
        cartItems.map((x) =>
          x.product.productnumber === product.product.productnumber
            ? { ...product, qty: product.qty - 1 }
            : x
        )
      );
    }
    setTotal(total - product.product.price);
  };

  const addRating = (productnumber, ratingValue) => {
    setProducts(updateRating(productnumber, ratingValue));
  };

  const updateRating = (productnumber, ratingValue) => {
    // Create a copy of the original products array
    const copyOfProducts = [...products];

    for (let i = 0; i < copyOfProducts.length; i++) {
      if (copyOfProducts[i].productnumber == productnumber) {
        copyOfProducts[i].rating.push(ratingValue); // push the user rating into the property "rating" array
        copyOfProducts[i].disabledRating = true; //disable the rating stars to prevent spam
      }
    }
    return copyOfProducts; // Return the updated array
  };

  const resetDisabledRating = () => {
    // Create a copy of the original products array
    const copyOfProducts = [...products];
    // Update the disabledRating property with false to be able to rate again
    for (let i = 0; i < copyOfProducts.length; i++) {
      copyOfProducts[i].disabledRating = false;
    }
    return copyOfProducts; // Return the updated array
  };

  return (
    <div>
      <video autoPlay loop muted id="video">
        <source src={magic} type="video/mp4" />
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
            <SearchResult
              searchResults={searchResults}
              addRating={addRating}
              onAdd={onAddHandler}
            />
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
