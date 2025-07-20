const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator');
const Customer = require('../models/Customer');


//ROUTE-1: Get All the customers using: GET "/api/customers/fetchallcustomers/"
router.get('/fetchallcustomers', async (req, res) => {
    try {
        const customers = await Customer.find()
        res.json(customers)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//ROUTE-2: Add a new Customer using: POST "/api/customers/addcustomer/"
router.post('/addcustomer', async (req, res) => {
    try {
        const { full_name, product_name, address, note, c_number, total, due_date } = req.body;
        //If error return (Bad request and errors)
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const customer = new Customer({ full_name, product_name, address, note, c_number, total, due_date })
        const saveCustomer = await customer.save()
        res.json(saveCustomer)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//ROUTE-3: Update a Customer using: PUT "/api/customers/updatecustomer/:id"
router.put('/updatecustomer/:id', async (req, res) => {
    const { full_name, product_name, address, note, c_number, total, due_date} = req.body;
    try {
        //Create a newCustomer object
        const newCustomer = {};
        if (full_name) {
            newCustomer.full_name = full_name
        }
        if (product_name) {
            newCustomer.product_name = product_name
        }
        if (note) {
            newCustomer.note = note
        }
        if (address) {
            newCustomer.address = address
        }
        if (c_number) {
            newCustomer.c_number = c_number
        }
        if (total) {
            newCustomer.total = total
        }
        if (due_date) {
            newCustomer.due_date = due_date
        }
       
        // Find the customer to be update and update it
        //parms.id is a id that are in route.post URL
        let customer = await Customer.findById(req.params.id);
        if (!customer) {
            res.status(404).send("Not Found")
        }

        customer = await Customer.findByIdAndUpdate(req.params.id, { $set: newCustomer }, { new: true })
        res.json({ customer });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


//ROUTE-4: Delete a Customer using: DELETE "/api/customers/deletecustomer/:id"
router.delete('/deletecustomer/:id', async (req, res) => {
    try {
        // Find the customer to be delete and delete it
        //parms.id is a id that are in route.post URL
        let customer = await Customer.findById(req.params.id);
        if (!customer) {
            res.status(404).send("Not Found")
        }

        customer = await Customer.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Customer Deleted", customer: customer });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router;