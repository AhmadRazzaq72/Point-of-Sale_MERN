import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import Alert from './components/Alert';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Sales from "./components/sales/Sales";
import Product from "./components/products/Product";
import Customers from "./components/customers/Customers";
import Suppliers from "./components/suppliers/Suppliers";
import SaleReports from "./components/salesreport/SaleReports";
import Preview from './components/sales/Preview';
import ProductState from './context/products/ProductState';
import CustomerState from './context/customers/CustomerState';
import SupplierState from './context/suppliers/SupplierState';
import SalereportState from './context/salereport/SalereportState';

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  return (
    <>
      <ProductState>
        <CustomerState>
        <SupplierState>
        <SalereportState>
          <Router>
            <Header />
            <Alert alert={alert}/>

            <div className="abc d-flex align-items-center justify-content-start">
              <Navbar />
              <Routes>
                <Route exact path="/" element={<Dashboard showAlert={showAlert} />} />
                <Route exact path="/sale" element={<Sales showAlert={showAlert} />} />
                <Route exact path="/product" element={<Product showAlert={showAlert} />} />
                <Route exact path="/customers" element={<Customers showAlert={showAlert} />} />
                <Route exact path="/suppliers" element={<Suppliers showAlert={showAlert} />} />
                <Route exact path="/salereport" element={<SaleReports showAlert={showAlert} />} />
                <Route exact path="/preview" element={<Preview showAlert={showAlert} />} />
              </Routes>
            </div>
          </Router>
        </SalereportState>
        </SupplierState>
        </CustomerState>
      </ProductState>
    </>
  );
}

export default App;
