import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Search from '../Search';
import productContext from '../../context/products/productContext';
import EditProduct from './EditProduct';

const Product = (props) => {
    const context = useContext(productContext);
    const { products, getProducts, deleteProduct } = context;
    const [showModal, setShowModal] = useState("");

    useEffect(() => {
        getProducts();
        // eslint-disable-next-line
    }, []);
const handleModalClose = () => {
  setShowModal(null); // closes modal by unmounting EditProduct
};
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <>
            <div className='container2'>
                <div className="bread">
                    <div className="heading">
                        <h1><span className="material-symbols-outlined me-1">inventory</span>Products</h1>
                    </div>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link className='link2' to="/">Dashboard</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Products</li>
                        </ol>
                    </nav>
                </div>

                <Search name="Add Product" title="Add Product" component={1} showAlert={props.showAlert} />

                <table className="table table-bordered" style={{ textAlign: 'center', width : '97%' }}>
                    <thead>
                        <tr>
                            <th scope="col">Product Name</th>
                            <th scope="col">Brand Name</th>
                            <th scope="col">Supplier</th>
                            <th scope="col">Description</th>
                            <th scope="col">Date Received</th>
                            <th scope="col">Expiry Date</th>
                            <th scope="col">O.Price</th>
                            <th scope="col">S.Price</th>
                            <th scope="col">QTY</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products?.map((product) => (
                            <tr key={product._id}>
                                <td >{product.product_name}</td>
                                <td>{product.brand_name}</td>
                                <td>{product.supplier_name}</td>
                                <td>{product.description}</td>
                                <td>{formatDate(product.rec_date)}</td>
                                <td>{formatDate(product.exp_date)}</td>
                                <td>{product.o_price}</td>
                                <td>{product.s_price}</td>
                                <td>{product.qty}</td>
                                <td className='d-flex align-items-center justify-content-center'>
                                    <button
                                        type="button"
                                        className="btn btn-info  btn-sm"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal1"
                                        onClick={() => setShowModal(product._id)}
                                    >
                                        Edit
                                    </button>
                                    <button className="btn btn-danger btn-sm" onClick={() => deleteProduct(product._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Render modal here once */}
            <EditProduct
                name="Edit"
                title="Edit Product"
                component={1}
                productid={showModal}
                showAlert={props.showAlert}
                onClose={handleModalClose}
            />
        </>
    );
};

export default Product;
