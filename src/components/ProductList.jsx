import React, { useState } from 'react';
import ProductItem from './ProductItem';
import SearchBar from './SearchBar';

const ProductList = ({ products }) => {
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleSearch = (query) => {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(lowerCaseQuery) ||
      product.oemNumbers.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredProducts(filtered);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>OEM Numbers</th>
            <th>Price</th>
            <th>Site</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product, index) => (
            <ProductItem key={index} {...product} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
