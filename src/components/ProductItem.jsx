import React from 'react';

const ProductItem = ({ name, oemNumbers, price, site }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{oemNumbers}</td>
      <td>{price}</td>
      <td>
        <a href={`https://${site}`} target="_blank" rel="noopener noreferrer">
          {site}
        </a>
      </td>
    </tr>
  );
};

export default ProductItem;
