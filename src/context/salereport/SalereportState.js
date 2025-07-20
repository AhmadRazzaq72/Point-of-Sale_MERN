// context/salereport/SalereportState.js
import React, { useState } from 'react';
import salereportContext from './salereportContext';

const SalereportState = (props) => {
    const host = "http://localhost:5000";
    const [reports, setReports] = useState([]);
    const [productsData, setProductsData] = useState([]);

    // Get sales reports between a date range
    const getSalesReports = async (fromDate, toDate) => {
        const response = await fetch(`${host}/api/reports/salesreport?from=${fromDate}&to=${toDate}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const data = await response.json();

        setReports(data);
    };

    const fetchProductData = async (invoiceNumber) => {
        try {
            const response = await fetch(`${host}/api/reports/fetchproductswithinvoicenumber/${invoiceNumber}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            setProductsData(data);
            console.log('Fetched data:', data);
    
        } catch (error) {
            console.error('Error fetching product data:', error);
        }
    };
    

    const addReport = async (reportData) => {
        try {
            const response = await fetch(`${host}/api/reports/addreport/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reportData),
            });
    
            const result = await response.json();
    
            if (response.ok) {
                // Handle success (e.g., updating state, showing a success message)
                console.log("Report added successfully:", result);
            } else {
                // Handle errors (e.g., showing error messages)
                console.error("Error adding report:", result.error);
            }
        } catch (error) {
            console.error("Network error:", error);
        }
    };
    


    return (
        <salereportContext.Provider value={{ reports, productsData, getSalesReports, addReport, fetchProductData}}>
            {props.children}
        </salereportContext.Provider>
    );
};

export default SalereportState;
