import React, { useState } from 'react';

const ProductAdd = () => {
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', currentPrice: '' });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setNewProduct(prevProduct => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });
      if (!response.ok) {
        throw new Error('Failed to add product');
      }
      const data = await response.json();
      console.log('Product added:', data);
      setSuccess(true);
      setNewProduct({ name: '', description: '', price: '', currentPrice: '' });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container">
      <h2>Add Product</h2>
      {error && <p>Error: {error}</p>}
      {success && <p>Product added successfully!</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={newProduct.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={newProduct.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="text"
            className="form-control"
            id="price"
            name="price"
            value={newProduct.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="currentPrice">Current Price</label>
          <input
            type="text"
            className="form-control"
            id="currentPrice"
            name="currentPrice"
            value={newProduct.currentPrice}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Product</button>
      </form>
    </div>
  );
};

export default ProductAdd;