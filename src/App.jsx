import React, { useEffect, useState } from 'react';
import './App.css';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api"; // Ensure correct backend URL

// Lisätään testidata
const mockProducts = [
  {
    id: 1,
    name: "Hydrauliikkapumppu MF 165",
    oemNumbers: ["516437M91", "516437M92", "1860300M91"],
    prices: [
      { price: 245.90, url: "https://example.com/store1", storeName: "AgriParts" },
      { price: 289.00, url: "https://example.com/store2", storeName: "TractorStore" },
      { price: 199.99, url: "https://example.com/store3", storeName: "FarmParts" }
    ]
  },
  {
    id: 2,
    name: "Valtra N-sarjan öljynsuodatin",
    oemNumbers: ["V836862591", "V836862592"],
    prices: [
      { price: 29.90, url: "https://example.com/store1", storeName: "AgriParts" },
      { price: 34.50, url: "https://example.com/store2", storeName: "TractorStore" }
    ]
  },
  {
    id: 3,
    name: "John Deere 6000-sarjan jarrupalat",
    oemNumbers: ["AL169573", "AL169574", "AL169575", "AL169576"],
    prices: [
      { price: 89.00, url: "https://example.com/store2", storeName: "TractorStore" },
      { price: 79.90, url: "https://example.com/store1", storeName: "AgriParts" },
      { price: 95.00, url: "https://example.com/store3", storeName: "FarmParts" }
    ]
  },
  {
    id: 4,
    name: "Zetor Proxima kytkinsarja",
    oemNumbers: ["53071930", "53071931", "53071932", "53071933", "53071934"],
    prices: [
      { price: 445.00, url: "https://example.com/store3", storeName: "FarmParts" },
      { price: 489.90, url: "https://example.com/store1", storeName: "AgriParts" }
    ]
  },
  {
    id: 5,
    name: "Hydrauliikkaletku 1/2\" 2m",
    oemNumbers: ["HE1234-2M", "HL1234-2M", "HU1234-2M"],
    prices: [
      { price: 45.90, url: "https://example.com/store1", storeName: "AgriParts" },
      { price: 39.90, url: "https://example.com/store3", storeName: "FarmParts" },
      { price: 49.90, url: "https://example.com/store2", storeName: "TractorStore" }
    ]
  }
];

const App = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    // Korvataan API-kutsu testidatalla
    setProducts(mockProducts);
    setFilteredProducts(mockProducts);
    
    // Alkuperäinen API-kutsu kommentoitu pois
    /*
    fetch(`${API_URL}/products`)
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch(error => console.error("Error fetching products:", error));
    */
  }, []);

  useEffect(() => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  const ProductCard = ({ product }) => {
    const [showOemNumbers, setShowOemNumbers] = useState(false);
    // Järjestetään hinnat halvimmasta kalleimpaan
    const sortedPrices = [...product.prices].sort((a, b) => a.price - b.price);
    
    // Lasketaan säästö kalleimpaan verrattuna
    const savingsFromHighest = sortedPrices[sortedPrices.length - 1].price - sortedPrices[0].price;

    // Lasketaan mediaanihinta ja säästö siitä
    const medianPrice = sortedPrices[Math.floor(sortedPrices.length / 2)].price;
    const savingsFromMedian = medianPrice - sortedPrices[0].price;

    const handleOemClick = (e) => {
      // Estetään OEM-listan sulkeutuminen, kun klikataan listaa
      if (e.target.closest('.oem-numbers')) {
        e.stopPropagation();
        return;
      }
      setShowOemNumbers(!showOemNumbers);
    };

    return (
      <div className="product-card">
        <h2>{product.name}</h2>
        <div className="oem-container">
          <div 
            className={`oem-trigger ${showOemNumbers ? 'active' : ''}`}
            onClick={handleOemClick}
          >
            OEM ({product.oemNumbers.length})
            <div className="oem-numbers">
              {product.oemNumbers.map((number, index) => (
                <span 
                  key={index} 
                  className="oem-number"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigator.clipboard.writeText(number);
                  }}
                  title="Klikkaa kopioidaksesi"
                >
                  {number}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="price-list">
          <div className="savings-container">
            {savingsFromHighest > 0 && (
              <span className="savings-badge">
                -{savingsFromHighest.toFixed(2)} € kalleimpaan
              </span>
            )}
            {savingsFromMedian > 0 && (
              <span className="savings-badge">
                -{savingsFromMedian.toFixed(2)} € mediaaniin
              </span>
            )}
          </div>
          {sortedPrices.map((price, index) => (
            <a
              key={index}
              href={price.url}
              target="_blank"
              rel="noopener noreferrer"
              className="store-link"
            >
              <span>{price.storeName}</span>
              <span>{price.price.toFixed(2)} €</span>
            </a>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      <h1 className='page-header'>Farmeri</h1>
      <div className="divider"></div>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Etsi traktorin osia..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div>Ei hakutuloksia</div>
        )}
      </div>
    </div>
  );
};

export default App;
