import React, { useEffect, useState } from 'react';
import ProductList from './components/ProductList';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api"; // Ensure correct backend URL

const App = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error("Error fetching products:", error));
  }, []);

  return (
    <div>
      <h1>Tractor Parts Inventory</h1>
      {products.length > 0 ? (
        <ProductList products={products} />
      ) : (
        <div>Loading products...</div>
      )}
    </div>
  );
};

export default App;
