import React, { useEffect, useState } from "react";
import styles from './App.module.css';
import SearchResult from "./components/SearchResult";
import Search from "./components/Search";
import ShoppingCart from "./components/ShoppingCart";

function App() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0)

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

 

  const onAddHandler = (product) => {//(props.item)
     const exist = cartItems.find(
      (item) => {
        console.log(item.product.productnumber, product.productnumber);
        return item.product.productnumber === product.productnumber;
      }
    ); 
   

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
      //setTotal(total + product.price)
    } else {
      setCartItems([...cartItems, { product, qty: 1 }]);
    }
    setTotal(total + product.price) 
    console.log(cartItems);
  };

 


  const onDeleteHandler = (product) => {//(props.item)
    if(product.qty === 1){
      setCartItems(cartItems.filter((x)=> x.product.productnumber !== product.product.productnumber))
      setTotal(total - product.product.price) 
    }else{
      setCartItems(
        cartItems.map((x) =>
          x.product.productnumber === product.product.productnumber
            ? { ...product, qty: product.qty - 1 }
            : x
        )
      );
      setTotal(total - product.product.price) 
    }
  }


  return (
    <div >
      <h1 className={styles.appTitle}>The Magic Store 🔮</h1>
      <div className={styles.searchbar}>
      <Search
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
      <ShoppingCart cartItems={cartItems} total={total} onDelete={onDeleteHandler}/>
        </div>
        </div>
    </div>
  );
}

export default App;
