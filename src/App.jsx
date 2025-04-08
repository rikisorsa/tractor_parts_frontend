import React, { useEffect, useState, useRef } from 'react';
import './App.css';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api"; // Ensure correct backend URL

// Lisätään testidata
let mockProducts = [
  {
    id: 1,
    name: "Hydrauliikkapumppu MF 165",
    oemNumbers: ["516437M91", "516437M92", "1860300M91"],
    price: 245.90,
    url: "https://example.com/store1",
    storeName: "AgriParts"
  },
  {
    id: 2,
    name: "Valtra N-sarjan öljynsuodatin",
    // oemNumbers: ["V836862591", "V836862592"],
    oemNumbers: [],
    price: 29.90,
    url: "https://example.com/store1",
    storeName: "AgriParts"
  },
  {
    id: 3,
    name: "John Deere 6000-sarjan jarrupalat",
    oemNumbers: ["AL169573", "AL169574", "AL169575", "AL169576"],
    price: 89.00,
    url: "https://example.com/store2",
    storeName: "TractorStore"
  },
  {
    id: 4,
    name: "Zetor Proxima kytkinsarja",
    oemNumbers: ["53071930", "53071931", "53071932", "53071933", "53071934"],
    price: 445.00,
    url: "https://example.com/store3",
    storeName: "FarmParts"
  },
  {
    id: 5,
    name: "Hydrauliikkaletku 1/2\" 2m",
    oemNumbers: ["HE1234-2M", "HL1234-2M", "HU1234-2M"],
    price: 45.90,
    url: "https://example.com/store1",
    storeName: "AgriParts"
  },
  {
    id: 6,
    name: "Hydrauliikkaletku 1/2\" 2m",
    oemNumbers: ["HE1234-2M", "HL1234-2M", "HU1234-2M"],
    price: null,
    url: "https://example.com/store2",
    storeName: "TractorStore"
  },
  {
    id: 7,
    name: "Hydrauliikkaletku 1/2\" 2m",
    oemNumbers: ["HE1234-2M", "HL1234-2M", "HU1234-2M"],
    price: 123.45,
    url: "https://example.com/store5",
    storeName: "Villen kauppa"
  },
  {
    id: 8,
    name: "Hydrauliikkaletku 1/2\" 2m",
    oemNumbers: ["HE1234-2M", "HL1234-2M", "HU1234-2M"],
    price: 22.46,
    url: "https://example.com/store4",
    storeName: "Kola kauppa"
  },
  {
    id: 9,
    name: "Hydrauliikkaletku 1/2\" 2m",
    oemNumbers: ["HE1234-2M", "HL1234-2M", "HU1234-2M"],
    price: 22.46,
    url: "https://example.com/store4",
    storeName: "Kola kauppa"
  }
];

const App = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [matchingProducts, setMatchingProducts] = useState([]);

    // Luodaan viite drawer-elementille
    const drawerRef = useRef(null);

  useEffect(() => {
    mockProducts = mockProducts.sort((a, b) => a.price - b.price);
    setProducts(mockProducts);
    setFilteredProducts(mockProducts);
  }, []);

  useEffect(() => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  const handleShowMatching = (selectedProduct) => {
    const selectedOEMs = selectedProduct.oemNumbers;
    const matches = products.filter(product =>
      product.oemNumbers.some(oem => selectedOEMs.includes(oem))
    );
    setMatchingProducts(matches);
    setDrawerOpen(true);
  };

  // Asetetaan tapahtumakuuntelija, joka sulkee drawerin, jos klikkaus tapahtuu sen ulkopuolella
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        setDrawerOpen(false);
      }
    };

    if (drawerOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [drawerOpen]);

  const ProductCard = ({ product, onShowMatching, hideMatchingButton }) => {
    const [showOemNumbers, setShowOemNumbers] = useState(false);

    const handleOemClick = (e) => {
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
          {!hideMatchingButton && onShowMatching && product.oemNumbers.length > 0 && (
            <button 
              className="show-matching-btn" 
              onClick={() => onShowMatching(product)}
            >
              Näytä vastaavat
            </button>
          )}
        </div>
        <div className="price-list">
          <a
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className="store-link"
          >
            <span>{product.storeName}</span>
            {/* Näytetään hinta vain jos tiedossa */}
            {product.price != null ? <span>{product.price.toFixed(2)} €</span> : <span>?</span>}
          </a>
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
            <ProductCard 
              key={product.id} 
              product={product} 
              onShowMatching={handleShowMatching} 
            />
          ))
        ) : (
          <div>Ei hakutuloksia</div>
        )}
      </div>
      {drawerOpen && (
        <div ref={drawerRef} className={`drawer ${drawerOpen ? 'open' : ''}`}>
          <div className="drawer-header">
            <h3>Vastaavat tuotteet</h3>
            <button onClick={() => setDrawerOpen(false)}>Sulje</button>
          </div>
          <div className="drawer-products">
            {matchingProducts.length > 0 ? (
              matchingProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  hideMatchingButton={true}
                />
              ))
            ) : (
              <p>Ei löytynyt vastaavia tuotteita.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;