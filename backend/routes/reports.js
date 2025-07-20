const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator');
const { Productsale, Invoice } = require('../models/Report');


// ROUTE-1: Get All the reports using: GET "/api/reports/fetchreportsbetweendates/"
// router.get('/fetchallreports', async (req, res) => {
//     try {
//         const reports = await Invoice.find()
//         // console.log(reports)
//         res.json(reports)
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send("Internal Server Error");
//     }
// })

// Route to fetch product data based on invoice_numberusing: GET "/api/reports/fetchproductswithinvoicenumber/1234"
router.get('/fetchproductswithinvoicenumber/:invoice_number', async (req, res) => {
    try {
        const { invoice_number } = req.params; // Get the invoice_number from the route parameters

        const products = await Productsale.find({ invoice_number: invoice_number });
        res.json(products);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});


// ROUTE: Get sales report within a date range using: GET "/api/reports/salesreport?from=2024-08-01&to=2024-08-11"
router.get('/salesreport', async (req, res) => {
    try {
        // Extract 'from' and 'to' date parameters from the query string
        const { from, to } = req.query;

        // Validate that both 'from' and 'to' parameters are provided
        if (!from || !to) {
            return res.status(400).json({ error: "Both 'from' and 'to' parameters are required" });
        }

        // Convert query parameters to Date objects
        const startDate = new Date(from);
        const endDate = new Date(to);

        // Check if the dates are valid
        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            return res.status(400).json({ error: "Invalid date format" });
        }

        // Query the reports within the date range
        const reports = await Invoice.find({
            date_time: {
                $gte: startDate,
                $lte: endDate
            }
        });

        // Return the found reports as JSON
        res.json(reports);
    } catch (error) {
        // Log the error and return a 500 status
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});


// ROUTE-2: Add a new Report using: POST "/api/reports/addreport/"
router.post('/addreport', async (req, res) => {
    try {
        const { invoice_number, customer_name, date_time, products, total, cash, change } = req.body;

        // Check if products is an array and has at least one product
        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ error: "Products should be a non-empty array" });
        }

        // Map the products array to format each product for insertion into the database
        const productData = products.map(product => ({
            invoice_number: invoice_number,  // Reference to the invoice number
            product_name: product.product_name,
            product_id: product.product_id,  // Assuming product_id is correctly provided in the product object
            amount: product.t_price,         // Total price of the product
            qty: product.qty,                // Quantity of the product
            price: product.s_price           // Selling price of a single unit
        }));


        // Create and save the invoice
        const invoice = new Invoice({
            invoice_number,  // Unique identifier for the invoice
            customer_name,   // Name of the customer
            date_time,       // Date and time of the invoice
            total,           // Total amount of the invoice
            cash,            // Cash received
            change           // Change returned
        });
        const saveInvoice = await invoice.save();

        // Save all product data with the invoice number reference
        const saveProductsale = await Productsale.insertMany(productData);

        res.json({ saveInvoice, saveProductsale });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});




module.exports = router;