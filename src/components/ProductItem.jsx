import React from 'react';

const ProductItem = ({ product }) => {
  return (
    <div
      style={{
        border: '1px solid #ddd',
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '5px',
      }}
    >
      <h3>{product.name}</h3>
      <p>Number: {product.number}</p>
      <p>Price: {product.price}</p>
      <a
        href={product.link}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: 'blue', textDecoration: 'underline' }}
      >
        View Product
      </a>
    </div>
  );
};

export default ProductItem;
