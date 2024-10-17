import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../ProductList.css";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "https://assignment-fer202.onrender.com/products"
      );
      if (!response.ok) {
        throw new Error("Unable to fetch products");
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container-fluid black-background">
      <h2 className="my-4">Product List</h2>
      {error && <p>Error: {error}</p>}
      <div className="row mt-4">
        {products.map((product) => (
          <div key={product.id} className="col-md-3 mb-4">
            <div className="card h-100">
              <img
                src={product.image}
                className="card-img-top align-self-center mt-auto"
                alt={product.name}
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">Price: {product.price}</p>
                <p className="card-text">
                  Current Price: {product.currentPrice}
                </p>
                <Link
                  to={`/products/${product.id}`}
                  className="btn btn-primary"
                >
                  Detail
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
