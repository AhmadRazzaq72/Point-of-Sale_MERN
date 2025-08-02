import React, { useContext, useState } from 'react';
import customerContext from '../../context/customers/customerContext';
import { Form, Button } from 'react-bootstrap';
import "./AddCustomer.css";

const AddCustomer = (props) => {
  const context = useContext(customerContext);
  const { addCustomer } = context;

  const [customer, setCustomer] = useState({
    full_name: "",
    product_name: "",
    address: "",
    c_number: "",
    note: "",
    total: "",
    due_date: ""
  });

  const handleClick = (e) => {
    e.preventDefault();
    if (!customer.full_name || !customer.product_name) {
      props.showAlert("Customer Name and Product Name are required", "danger");
      return;
    }
    addCustomer(
      customer.full_name,
      customer.product_name,
      customer.address,
      customer.c_number,
      customer.note,
      customer.total,
      customer.due_date
    );
    setCustomer({
      full_name: "",
      product_name: "",
      address: "",
      c_number: "",
      note: "",
      total: "",
      due_date: ""
    });
    props.showAlert("Customer Added Successfully", "success");
    props.closeModal(); // call passed prop to close modal
  };

  const onChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  return (
    <Form>
      {[
        { label: "Customer Name", key: "full_name", type: "text" },
        { label: "Product Name", key: "product_name", type: "text" },
        { label: "Address", key: "address", type: "text" },
        { label: "Contact Number", key: "c_number", type: "text" },
        { label: "Total", key: "total", type: "number" },
        { label: "Due Date", key: "due_date", type: "date" },
      ].map(field => (
        <Form.Group className="mb-3" key={field.key}>
          <Form.Label>{field.label}</Form.Label>
          <Form.Control
            type={field.type}
            name={field.key}
            value={customer[field.key]}
            onChange={onChange}
          />
        </Form.Group>
      ))}

      <Form.Group className="mb-3">
        <Form.Label>Note</Form.Label>
        <Form.Control
          as="textarea"
          name="note"
          value={customer.note}
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

export default AddCustomer;
