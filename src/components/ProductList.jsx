import React, { useState, useEffect } from 'react';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [compatibleTractors, setCompatibleTractors] = useState([]);
    const [selectedTractor, setSelectedTractor] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch product data from API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://94.237.32.45:5000/api/products'); // Update URL if needed
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();

                setProducts(data);
                setFilteredProducts(data); // Initialize filteredProducts

                // Extract unique compatible tractors for the dropdown
                const tractors = new Set();
                data.forEach((product) => {
                    if (Array.isArray(product.compatibleTractors)) {
                        product.compatibleTractors.forEach((tractor) => tractors.add(tractor));
                    }
                });
                setCompatibleTractors(Array.from(tractors)); // Convert Set to Array
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Filter products based on search term and selected tractor
    useEffect(() => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();

        setFilteredProducts(
            products.filter((product) => {
                const nameMatch = product.name.toLowerCase().includes(lowerCaseSearchTerm);
                const oemMatch = Array.isArray(product.oemNumbers)
                    ? product.oemNumbers.some((oem) =>
                          oem.toLowerCase().includes(lowerCaseSearchTerm)
                      )
                    : false;
                const tractorMatch =
                    !selectedTractor ||
                    (Array.isArray(product.compatibleTractors) &&
                        product.compatibleTractors.includes(selectedTractor));

                return (nameMatch || oemMatch) && tractorMatch;
            })
        );
    }, [searchTerm, selectedTractor, products]);

    if (loading) {
        return <p>Loading products...</p>;
    }

    if (error) {
        return <p>Error loading products: {error}</p>;
    }

    return (
        <div>
            <h1>Product List</h1>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '20px' }}>
                {/* Search Bar */}
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by Name or OEM Number"
                    style={{
                        padding: '10px',
                        fontSize: '16px',
                        width: '300px',
                        border: '1px solid #ddd',
                        borderRadius: '5px',
                    }}
                    
                />
                {/* Tractor Dropdown */}
                <select
                    value={selectedTractor}
                    onChange={(e) => setSelectedTractor(e.target.value)}
                    style={{
                        padding: '10px',
                        fontSize: '16px',
                        width: '300px',
                        border: '1px solid #ddd',
                        borderRadius: '5px',
                    }}
                >
                    <option value="">All Tractors</option>
                    {compatibleTractors.map((tractor) => (
                        <option key={tractor} value={tractor}>
                            {tractor}
                        </option>
                    ))}
                </select>
                
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>OEM Numbers</th>
                        <th>Number</th>
                        <th>Price</th>
                        <th>Compatible Tractors</th>
                        <th>Link</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.map((product) => (
                        <tr key={product._id}>
                            <td>{product.name}</td>
                            <td>
                                {product.oemNumbers && product.oemNumbers.length > 0
                                    ? product.oemNumbers.join(', ')
                                    : 'N/A'}
                            </td>
                            <td>{product.number}</td>
                            <td>{product.price}</td>
                            <td>
                                {product.compatibleTractors && product.compatibleTractors.length > 0
                                    ? product.compatibleTractors.join(', ')
                                    : 'N/A'}
                            </td>
                            <td>
                                <a
                                    href={product.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    View Product
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;
