import React, { useState, useContext, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import productContext from '../../context/products/productContext';

const EditProduct = (props) => {
    const context = useContext(productContext);
    const { editProduct, products } = context;

    const [product, setProduct] = useState({
        id: "",
        e_product_name: "",
        e_brand_name: "",
        e_description: "",
        e_supplier_name: "",
        e_o_price: "",
        e_s_price: "",
        e_qty: "",
        e_rec_date: "",
        e_exp_date: ""
    });

    const [show, setShow] = useState(false);

const handleClose = () => {
    setShow(false);
    if (props.onClose) props.onClose(); // notify parent to reset productid
};    const handleShow = () => setShow(true);

    useEffect(() => {
    if (props.productid) {
        const currentProduct = products.find(p => p._id === props.productid);
        if (currentProduct) {
            setProduct({
                id: currentProduct._id,
                e_product_name: currentProduct.product_name || "",
                e_brand_name: currentProduct.brand_name || "",
                e_description: currentProduct.description || "",
                e_supplier_name: currentProduct.supplier_name || "",
                e_o_price: currentProduct.o_price || "",
                e_s_price: currentProduct.s_price || "",
                e_qty: currentProduct.qty || "",
                e_rec_date: currentProduct.rec_date ? currentProduct.rec_date.split('T')[0] : "",
                e_exp_date: currentProduct.exp_date ? currentProduct.exp_date.split('T')[0] : ""
            });
            if (!show) handleShow(); // only open if not already open
        }
    } else {
        setShow(false); // close modal if no productid
    }
}, [props.productid, products]);


    const handleClick = () => {
        if (props.productid) {
            editProduct(
                props.productid,
                product.e_product_name,
                product.e_brand_name,
                product.e_description,
                product.e_supplier_name,
                product.e_o_price,
                product.e_s_price,
                product.e_qty,
                product.e_rec_date,
                product.e_exp_date
            );
      props.showAlert("Product updated successfully", "success");

            handleClose();
            setProduct({
                id: "",
                e_product_name: "",
                e_brand_name: "",
                e_description: "",
                e_supplier_name: "",
                e_o_price: "",
                e_s_price: "",
                e_qty: "",
                e_rec_date: "",
                e_exp_date: ""
            });
        } else {
            console.error("Product ID is not provided.");
        }
    };

    const onChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.title || "Edit Product"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className='mb-2'>
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control type="text" name="e_product_name" value={product.e_product_name} onChange={onChange} />
                        </Form.Group>
                        <Form.Group className='mb-2'>
                            <Form.Label>Brand Name</Form.Label>
                            <Form.Control type="text" name="e_brand_name" value={product.e_brand_name} onChange={onChange} />
                        </Form.Group>
                        <Form.Group className='mb-2'>
                            <Form.Label>Supplier Name</Form.Label>
                            <Form.Control type="text" name="e_supplier_name" value={product.e_supplier_name} onChange={onChange} />
                        </Form.Group>
                        <Form.Group className='mb-2'>
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control type="number" name="e_qty" value={product.e_qty} onChange={onChange} />
                        </Form.Group>
                        <Form.Group className='mb-2'>
                            <Form.Label>Original Price</Form.Label>
                            <Form.Control type="number" name="e_o_price" value={product.e_o_price} onChange={onChange} />
                        </Form.Group>
                        <Form.Group className='mb-2'>
                            <Form.Label>Selling Price</Form.Label>
                            <Form.Control type="number" name="e_s_price" value={product.e_s_price} onChange={onChange} />
                        </Form.Group>
                        <Form.Group className='mb-2'>
                            <Form.Label>Date Received</Form.Label>
                            <Form.Control type="date" name="e_rec_date" value={product.e_rec_date} onChange={onChange} />
                        </Form.Group>
                        <Form.Group className='mb-2'>
                            <Form.Label>Expiry Date</Form.Label>
                            <Form.Control type="date" name="e_exp_date" value={product.e_exp_date} onChange={onChange} />
                        </Form.Group>
                        <Form.Group className='mb-2'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" name="e_description" value={product.e_description} onChange={onChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={handleClick}>Update</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default EditProduct;
