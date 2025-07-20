import React, { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Preview.css';

const Preview = () => {
  const location = useLocation();
  const { state } = location;
  const reportData = state?.reportData || {};

  const sectionRef = useRef(null);

  const handlePrint = () => {
    const printContents = sectionRef.current.innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  };

  return (
    <div className='container2'>
      <div className="bread">
        <div className="heading">
          <h1>
            <span className="material-symbols-outlined me-1">point_of_sale</span>
            Sale
          </h1>
        </div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link className='link2' to="/">Dashboard</Link></li>
            <li className="breadcrumb-item"><Link className='link2' to="/sale">Sale</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Preview</li>
          </ol>
        </nav>
      </div>

      <h1 className='ph1'>Order's Bill</h1>

      <div ref={sectionRef} className="print-section">
        <table>
          <tbody>
            <tr>
              <th className='pth1'>Invoice Number:</th>
              <td>{reportData.invoice_number}</td>
            </tr>
            <tr>
              <th className='pth1'>Date:</th>
              <td>{new Date(reportData.date_time).toLocaleDateString()} {new Date(reportData.date_time).toLocaleTimeString()}</td>
            </tr>
          </tbody>
        </table>

        <table id='pt1' className="table table-bordered border-dark">
          <thead>
            <tr>
              <th scope="col">Product Name</th>
              <th scope="col">Price</th>
              <th scope="col">Qty</th>
              <th scope="col">Discount</th>
              <th scope="col">Amount</th>
            </tr>
          </thead>
          <tbody>
            {reportData.products?.map((product) => (
              <tr key={product._id}>
                <td>{product.product_name}</td>
                <td>{product.s_price}</td>
                <td>{product.qty}</td>
                <td>0</td> {/* Assuming no discount field in product */}
                <td>{product.t_price.toFixed(2)}</td>
              </tr>
            ))}
            <tr>
              <th colSpan={5} scope="row"><br /></th>
            </tr>
            <tr>
              <th className='text-end' colSpan={4} scope="row">Total:</th>
              <td colSpan={1}>{reportData.total}</td>
            </tr>
            <tr>
              <th className='text-end' colSpan={4} scope="row">Cash:</th>
              <td colSpan={1}>{reportData.cash}</td>
            </tr>
            <tr>
              <th className='text-end' colSpan={4} scope="row">Change:</th>
              <td colSpan={1}>{reportData.change.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="btn1">
        <button className='btn btn-primary' id="print-button" onClick={handlePrint}>Print</button>
      </div>
    </div>
  );
};

export default Preview;
