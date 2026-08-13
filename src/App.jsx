//Uses index.css for styling
import React from "react";
import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar.jsx";
import ProductsCards from "./components/ProductsCards.jsx";

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    
    fetch("https://fakestoreapi.com/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      //API returns the products and stores the data in a state
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      })
      //error handling
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);
//For case-sensitivity
  useEffect(() => {
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]);
//Waits for the API to load , shows the error if something went wrong if not it renders the product list
  if (loading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Product Catalog</h1>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {filteredProducts.length === 0 ? (
        <p>No results.</p>
      ) : (
        <ProductsCards products={filteredProducts} />
      )}
    </div>
  );
}

export default App;
