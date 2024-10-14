import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import ProductEdit from "./components/ProductEdit";
import Manage from "./components/Manage";
import ProductAdd from "./components/ProductAdd"; // Import ProductAdd

function App() {
 
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Product App
          </Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Product List
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/manage">
                  Manage
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/add">
                  Add Product
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/products/:id/edit" element={<ProductEdit />} />
        <Route path="/manage" element={<Manage />} />
        <Route path="/add" element={<ProductAdd />} /> {/* Add route for ProductAdd */}
      </Routes>
    </div>
  );
}

export default App;
