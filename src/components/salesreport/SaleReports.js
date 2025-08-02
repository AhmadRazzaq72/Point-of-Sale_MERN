import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import salereportContext from '../../context/salereport/salereportContext';
import "./SaleReport.css";

const SaleReports = () => {
    const context = useContext(salereportContext);
    const { reports, productsData, getSalesReports, fetchProductData } = context;

    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleSearch = () => {
getSalesReports(new Date(fromDate).toISOString(), new Date(toDate).toISOString());
    };

    const handleRowClick = (report) => {
        fetchProductData(report.invoice_number)
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        fetchProductData(null);
    };

    return (
        <div className='container2'>
            <div className="bread">
                <div className="heading">
                    <h1><span className="material-symbols-outlined me-1">analytics</span>Report</h1>
                </div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link className='link2' to="/">Dashboard</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Report</li>
                    </ol>
                </nav>
            </div>
            <div className="search1">
                <label htmlFor="from">From</label>
                <input
                    type="date"
                    className='s1'
                    id="from"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                />
                <label htmlFor="to">To</label>
                <input
                    type="date"
                    className='s2'
                    id="to"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                />
                <button
                    type="button"
                    id="b1"
                    className="btn btn-info"
                    onClick={handleSearch}
                >
                    Search
                </button>
            </div>
            <table className="table table-bordered" id='sr4' style={{ textAlign: 'center', width : '97%' }}>
                <thead>
                    <tr>
                        <th scope="col">Invoice Number</th>
                        <th scope="col">Customer Name</th>
                        <th scope="col">Total</th>
                        <th scope="col">Cash</th>
                        <th scope="col">Change</th>
                        <th scope="col">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {reports.map((report) => (
                        <tr key={report._id} onClick={() => handleRowClick(report)} style={{ cursor: 'pointer' }}>
                            <td>{report.invoice_number}</td>
                            <td>{report.customer_name}</td>
                            <td>{report.total}</td>
                            <td>{report.cash}</td>
                            <td>{report.change}</td>
                            <td>{new Date(report.date_time).toLocaleDateString()} {new Date(report.date_time).toLocaleTimeString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal */}
            {showModal && productsData && (
                <div className="modal fade show" style={{ display: 'block'  }} tabIndex="-1" role="dialog">
                   <div className="custom-modal">

                    <div className="modal-dialog" id='sr1' role="document">
                        <div className="modal-content" id='sr3'>
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Report Details</h5>
                                <button type="button" className="close" onClick={handleCloseModal} aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body" id='sr2' >
                                <table className="table table-bordered" id='sr5' style={{ textAlign: 'center' }}>
                                    <thead>
                                        <tr>
                                            <th scope="col">Invoice Number</th>
                                            <th scope="col">Product Name</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Qty</th>
                                            <th scope="col">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {productsData.map((product, index) => (
                                            <tr key={index}>
                                                <td>{product.invoice_number}</td>
                                                <td>{product.product_name}</td>
                                                <td>{product.price}</td>
                                                <td>{product.qty}</td>
                                                <td>{product.amount}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
                            </div>
                        </div>
                    </div>
                    </div>

                </div>
            )}

        </div>
    );
};

export default SaleReports;
