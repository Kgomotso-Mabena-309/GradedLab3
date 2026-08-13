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
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]);

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
