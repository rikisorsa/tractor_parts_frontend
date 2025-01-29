import React, { useEffect, useState } from 'react';
import ProductList from './components/ProductList';

const App = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the backend API using a relative URL
    const API_URL = '/api/products';

    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
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
