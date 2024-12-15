import React, { useState } from "react";
import "./Modal.css"; // Import your CSS file for styling

const products = [
  { id: 1, name: "Product 1", description: "Description for Product 1" },
];

const Modal = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <h1>Products</h1>
      <div className="products">
        {products.map((product) => (
          <div key={product.id} className="product">
            <h3>{product.name}</h3>
            <button onClick={() => openModal(product)}>View Details</button>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>{selectedProduct.name}</h2>
            <p>{selectedProduct.description}</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
