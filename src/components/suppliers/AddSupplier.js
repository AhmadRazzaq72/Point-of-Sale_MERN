import React, { useContext, useState } from 'react';
import supplierContext from '../../context/suppliers/supplierContext';
import { Form, Button } from 'react-bootstrap';
import "./AddSupplier.css";

const AddSupplier = (props) => {
  const context = useContext(supplierContext);
  const { addSupplier } = context;

  const [supplier, setSupplier] = useState({
    supplier_name: "",
    contact_person: "",
    c_number: "",
    address: "",
    note: ""
  });

  const handleClick = (e) => {
    e.preventDefault();
    if (!supplier.supplier_name) {
      props.showAlert("Supplier Name is required", "danger");
      return;
    }
    addSupplier(
      supplier.supplier_name,
      supplier.contact_person,
      supplier.c_number,
      supplier.address,
      supplier.note
    );
    setSupplier({
      supplier_name: "",
      contact_person: "",
      c_number: "",
      address: "",
      note: ""
    });
    props.showAlert("Supplier Added Successfully", "success");
    props.closeModal(); // closes modal programmatically
  };

  const onChange = (e) => {
    setSupplier({ ...supplier, [e.target.name]: e.target.value });
  };

  return (
    <Form>
      {[
        { label: "Supplier Name", key: "supplier_name", type: "text" },
        { label: "Contact Person", key: "contact_person", type: "text" },
        { label: "Contact Number", key: "c_number", type: "text" },
        { label: "Address", key: "address", type: "text" },
      ].map(field => (
        <Form.Group className="mb-3" key={field.key}>
          <Form.Label>{field.label}</Form.Label>
          <Form.Control
            type={field.type}
            name={field.key}
            value={supplier[field.key]}
            onChange={onChange}
          />
        </Form.Group>
      ))}

      <Form.Group className="mb-3">
        <Form.Label>Note</Form.Label>
        <Form.Control
          as="textarea"
          name="note"
          value={supplier.note}
          onChange={onChange}
        />
      </Form.Group>

      <div className="d-flex justify-content-end">
        <Button variant="secondary" onClick={props.closeModal} className="me-2">
          Close
        </Button>
        <Button variant="primary" onClick={handleClick}>
          Save
        </Button>
      </div>
    </Form>
  );
};

export default AddSupplier;
