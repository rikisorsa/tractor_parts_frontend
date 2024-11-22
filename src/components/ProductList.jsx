import React from 'react';
import ProductItem from './ProductItem';

const ProductList = ({ products }) => {
  if (products.length === 0) {
    return <p>No products found.</p>;
  }

  return (
    <div>
      {products.map((product) => (
        <ProductItem key={product.number} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
