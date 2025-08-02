import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap"; // Import Modal & Button
import productContext from "../../context/products/productContext";
import salereportContext from "../../context/salereport/salereportContext";
import "./Sale.css";

const Sales = () => {
  const productCtx = useContext(productContext);
  const saleReportCtx = useContext(salereportContext);

  const { products, getProductByName } = productCtx;
  const { addReport } = saleReportCtx;
  const navigate = useNavigate();

  const [currentNumber, setCurrentNumber] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false); // Modal visibility state

  const dropdownRef = useRef(null);
  const [currentProduct, setCurrentProduct] = useState([]);
  const [productList, setProductList] = useState([]);
  const [customer_name, setCustomerName] = useState("");
  const [cash, setCash] = useState("");
  const [total, setTotalAmount] = useState(0);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    getProductByName(e.target.value);
    setShowDropdown(true);
  };

  const handleProductSelect = (product) => {
    setSearchTerm(product.product_name);
    setCurrentProduct([product]);
    setShowDropdown(false);
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      getProductByName(null);
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const total = productList.reduce(
      (total, product) => total + product.s_price * product.qty,
      0
    );
    setTotalAmount(total.toFixed(2));
  }, [productList]);

  const incrementNumber = () => {
    setCurrentNumber((prevNumber) => prevNumber + 1);
  };

  const decrementNumber = () => {
    if (currentNumber > 0) {
      setCurrentNumber((prevNumber) => prevNumber - 1);
    }
  };

  const deleteProduct = (id) => {
    setProductList(productList.filter((product) => product._id !== id));
  };

  const addProduct = () => {
    if (currentProduct.length === 0) return;

    const updatedProduct = {
      ...currentProduct[0],
      t_price: currentProduct[0].s_price * currentNumber,
      qty: currentNumber,
    };

    setProductList((prevProductList) => [...prevProductList, updatedProduct]);

    setCurrentProduct([]);
    setSearchTerm("");
    setShowDropdown(false);
    setCurrentNumber(0);
    getProductByName(null);
  };

  const handleAddReport = () => {
    if (productList.length === 0) {
      alert("No products to add to the report.");
      return;
    }

    if (!customer_name || !cash) {
      alert("Please enter customer name and cash.");
      return;
    }

    const d = new Date();
    const t = new Date().getTime();
    const randomnum = Math.floor(Math.random() * 90000) + 10000;

    const f = (n) => (n < 10 ? "0" + n : n);

    const uniqueInvoiceNumber = `${d.getFullYear()}${f(d.getMonth() + 1)}${f(d.getDate())}${randomnum}`;

    const reportData = {
      products: productList,
      total,
      customer_name,
      cash,
      invoice_number: uniqueInvoiceNumber,
      change: parseFloat(cash) - parseFloat(total),
      date_time: t,
    };

    addReport(reportData);
    navigate("/preview", { state: { reportData } });

    setProductList([]);
    setCustomerName("");
    setCash("");
    setShowModal(false); // Close modal after saving
  };

  return (
    <div className="container2">
      <div className="bread">
        <div className="heading">
          <h1>
            <span className="material-symbols-outlined me-1">
              point_of_sale
            </span>
            Sale
          </h1>
        </div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link className="link2" to="/">
                Dashboard
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Sale
            </li>
          </ol>
        </nav>
      </div>

      {/* Product Search */}
      <div className="search-container">
        <input
          type="text"
          id="search-input"
          placeholder="Search......"
          onChange={handleInputChange}
          value={searchTerm}
        />

        <div className="number-container">
          <button className="icon-button" onClick={decrementNumber}>
            -
          </button>
          <div className="number" id="number-display">
            {currentNumber}
          </div>
          <button className="icon-button" onClick={incrementNumber}>
            +
          </button>
        </div>

        <button
          type="button"
          id="button"
          className="btn btn-info mx-1"
          onClick={addProduct}
          disabled={currentNumber === 0 || searchTerm === ""}
        >
          Add
        </button>
      </div>

      {/* Dropdown Table */}
      {showDropdown && Object.keys(products).length > 0 && (
        <table className="dropdown-table" ref={dropdownRef}>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Brand Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {products?.product?.map((product) => (
              <tr
                key={product._id}
                onClick={() => handleProductSelect(product)}
                style={{ cursor: "pointer" }}
              >
                <td>{product.product_name}</td>
                <td>{product.brand_name}</td>
                <td>{product.s_price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Product List Table */}
      <table className="table table-bordered" style={{ textAlign: 'center', width : '97%' }}>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Brand Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {productList.length > 0 ? (
            productList.map((product) => (
              <tr key={product._id}>
                <td>{product.product_name}</td>
                <td>{product.brand_name}</td>
                <td>{product.description}</td>
                <td>{product.s_price}</td>
                <td>{product.qty}</td>
                <td>{product.t_price.toFixed(2)}</td>
                <td>
                  <div
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteProduct(product._id)}
                  >
                    Delete
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No products found</td>
            </tr>
          )}
          <tr>
            <th colSpan={5}>Total:</th>
            <th colSpan={2}>{total}</th>
          </tr>
        </tbody>
      </table>

      {/* Save Button */}
      <Button
        id="sbutton"
        variant="secondary"
        onClick={() => setShowModal(true)}
      >
        Continue
      </Button>

      {/* React-Bootstrap Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-2">
            <label htmlFor="customer_name" className="form-label">
              Customer Name
            </label>
            <input
              type="text"
              className="form-control"
              id="customer_name"
              value={customer_name}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="cash" className="form-label">
              Cash
            </label>
            <input
              type="number"
              className="form-control"
              id="cash"
              value={cash}
              onChange={(e) => setCash(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddReport}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Sales;
