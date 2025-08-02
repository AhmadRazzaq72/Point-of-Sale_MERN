import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import supplierContext from '../../context/suppliers/supplierContext';
import Search from '../Search';
import { Modal, Button, Form } from 'react-bootstrap';

const Suppliers = (props) => {
  const context = useContext(supplierContext);
  const { getSuppliers, suppliers, deleteSupplier, editSupplier } = context;

  const [searchQuery, setSearchQuery] = useState("");
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    getSuppliers();
    // eslint-disable-next-line
  }, []);

  const handleEditSubmit = () => {
    if (editingSupplier) {
      editSupplier(
        editingSupplier._id,
        editingSupplier.supplier_name,
        editingSupplier.contact_person,
        editingSupplier.c_number,
        editingSupplier.address,
        editingSupplier.note
      );
      props.showAlert("Supplier updated successfully", "success");
      setShowEditModal(false);
      setEditingSupplier(null);
    }
  };

  return (
    <div className='container2'>
      <div className="bread">
        <div className="heading">
          <h1><span className="material-symbols-outlined me-1">group</span>Suppliers</h1>
        </div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link className='link2' to="/">Dashboard</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Suppliers</li>
          </ol>
        </nav>
      </div>

      {/* Use Search Component */}
      <Search
        name="Add Supplier"
        title="Add Supplier"
        component={3}
        showAlert={props.showAlert}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        placeholder="Search suppliers by name"
      />

      <table className="table table-bordered mt-3" style={{ textAlign: 'center', width : '97%' }}>
        <thead>
          <tr>
            <th scope="col">Supplier Name</th>
            <th scope="col">Contact Person</th>
            <th scope="col">Contact Number</th>
            <th scope="col">Address</th>
            <th scope="col">Note</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {suppliers
            .filter(supplier =>
              supplier.supplier_name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map(supplier => (
              <tr key={supplier._id}>
                <td >{supplier.supplier_name}</td>
                <td>{supplier.contact_person}</td>
                <td>{supplier.c_number}</td>
                <td>{supplier.address}</td>
                <td>{supplier.note}</td>
                <td className='d-flex align-items-center justify-content-center'>
                  <Button
                    type="button"
                    className="btn btn-info btn-sm mx-1"
                    onClick={() => {
                      setEditingSupplier({ ...supplier });
                      setShowEditModal(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteSupplier(supplier._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Edit Supplier Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}style={{ marginTop: '40px' }}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Supplier</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editingSupplier && (
            <Form>
              {[
                { label: "Supplier Name", key: "supplier_name" },
                { label: "Contact Person", key: "contact_person" },
                { label: "Contact Number", key: "c_number" },
                { label: "Address", key: "address" },
              ].map(field => (
                <Form.Group className="mb-3" key={field.key}>
                  <Form.Label>{field.label}</Form.Label>
                  <Form.Control
                    type="text"
                    name={field.key}
                    value={editingSupplier[field.key]}
                    onChange={(e) =>
                      setEditingSupplier({ ...editingSupplier, [field.key]: e.target.value })
                    }
                  />
                </Form.Group>
              ))}

              <Form.Group className="mb-3">
                <Form.Label>Note</Form.Label>
                <Form.Control
                  as="textarea"
                  name="note"
                  value={editingSupplier.note}
                  onChange={(e) =>
                    setEditingSupplier({ ...editingSupplier, note: e.target.value })
                  }
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditSubmit}>
            Update Supplier
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Suppliers;
 