import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import Search from '../Search';
import customerContext from '../../context/customers/customerContext';

const Customers = (props) => {
  const context = useContext(customerContext);
  const { deleteCustomer, getCustomers, customers, editCustomer } = context;

  const [searchQuery, setSearchQuery] = useState("");
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getCustomers();
    // eslint-disable-next-line
  }, []);

  const handleEditSubmit = () => {
    if (editingCustomer) {
      editCustomer(
        editingCustomer._id,
        editingCustomer.full_name,
        editingCustomer.product_name,
        editingCustomer.address,
        editingCustomer.c_number,
        editingCustomer.note,
        editingCustomer.total,
        editingCustomer.due_date
      );
      props.showAlert("Customer updated successfully", "success");
      setShowModal(false);
      setEditingCustomer(null);
    }
  };

  const handleEditClick = (customer) => {
    setEditingCustomer({ ...customer });
    setShowModal(true);
  };

  return (
    <div className='container2'>
      <div className="bread">
        <div className="heading">
          <h1><span className="material-symbols-outlined me-1">group</span>Customer</h1>
        </div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link className='link2' to="/">Dashboard</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Customer</li>
          </ol>
        </nav>
      </div>

      {/* Use your Search component here */}
      <Search
        name="Add Customer"
        title="Add Customer"
        component={2}
        showAlert={props.showAlert}
        setSearchQuery={setSearchQuery} // pass setter
      />

      <table className="table table-bordered" style={{ textAlign: 'center', width : '97%' }}>
        <thead>
          <tr>
            <th scope="col">Customer Name</th>
            <th scope="col">Product Name</th>
            <th scope="col">Address</th>
            <th scope="col">Contact Number</th>
            <th scope="col">Note</th>
            <th scope="col">Total</th>
            <th scope="col">Due Date</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {customers
            .filter(customer =>
              customer.full_name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map(customer => (
              <tr key={customer._id}>
                <td >{customer.full_name}</td>
                <td>{customer.product_name}</td>
                <td>{customer.address}</td>
                <td>{customer.c_number}</td>
                <td>{customer.note}</td>
                <td>{customer.total}</td>
                <td>{customer.due_date}</td>
                <td className='d-flex align-items-center justify-content-center'>
                  <button
                    type="button"
                    className="btn btn-info btn-sm mx-1"
                    onClick={() => handleEditClick(customer)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteCustomer(customer._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Edit Customer Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editingCustomer && (
            <>
              {[
                { label: "Customer Name", key: "full_name" },
                { label: "Product Name", key: "product_name" },
                { label: "Address", key: "address" },
                { label: "Contact Number", key: "c_number" },
                { label: "Note", key: "note" },
                { label: "Total", key: "total" },
                { label: "Due Date", key: "due_date" }
              ].map(field => (
                <div className="mb-2" key={field.key}>
                  <label>{field.label}</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editingCustomer[field.key]}
                    onChange={(e) =>
                      setEditingCustomer({ ...editingCustomer, [field.key]: e.target.value })
                    }
                  />
                </div>
              ))}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditSubmit}>
            Update Customer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Customers;
