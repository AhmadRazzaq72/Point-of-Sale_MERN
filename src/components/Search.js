import React, { useState, useEffect } from 'react';
import "./Search.css";
import AddProduct from './products/AddProduct';
import AddCustomer from './customers/AddCustomer';
import AddSupplier from './suppliers/AddSupplier';
import { Modal, Button } from 'react-bootstrap';

const Search = (props) => {
  const [selectedComponent, setSelectedComponent] = useState(1);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setSelectedComponent(props.component);
  }, [props.component]);

  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case 1:
        return <AddProduct showAlert={props.showAlert} closeModal={() => setShowModal(false)} />;
      case 2:
        return <AddCustomer showAlert={props.showAlert} closeModal={() => setShowModal(false)} />;
      case 3:
        return <AddSupplier showAlert={props.showAlert} closeModal={() => setShowModal(false)} />;
      default:
        return null;
    }
  };

  return (
    <div className="search-container">
<input
  type="text"
  id="search-input"
  placeholder="Search..."
  onChange={(e) => props.setSearchQuery && props.setSearchQuery(e.target.value)}
/>
      <Button variant="info" className="mx-1" onClick={() => setShowModal(true)}>
        {props.name}
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {renderSelectedComponent()}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Search;
