const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator');
const Supplier = require('../models/Supplier');


//ROUTE-1: Get All the suppliers using: GET "/api/suppliers/fetchallsuppliers/"
router.get('/fetchallsuppliers', async (req, res) => {
    try {
        const suppliers = await Supplier.find()
        res.json(suppliers)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


//ROUTE-2: Add a new Supplier using: POST "/api/suppliers/addsupplier/"
router.post('/addsupplier', async (req, res) => {
    try {
        const { supplier_name, contact_person, address, c_number, note } = req.body;
        //If error return (Bad request and errors)
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const supplier = new Supplier({
            supplier_name, contact_person, address, c_number, note })
        const saveSupplier = await supplier.save()
        res.json(saveSupplier)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//ROUTE-3: Update a Supplier using: PUT "/api/suppliers/updatesupplier/:id"
router.put('/updatesupplier/:id', async (req, res) => {
    const { supplier_name, contact_person, address, c_number, note } = req.body;
    try {
        //Create a newSupplier object
        const newSupplier = {};
        if (supplier_name) {
            newSupplier.supplier_name = supplier_name
        }
        if (contact_person) {
            newSupplier.contact_person = contact_person
        }
        if (address) {
            newSupplier.address = address
        }
        if (c_number) {
            newSupplier.c_number = c_number
        }
        if (note) {
            newSupplier.note = note
        }
       
        // Find the supplier to be update and update it
        //parms.id is a id that are in route.post URL
        let supplier = await Supplier.findById(req.params.id);
        if (!supplier) {
            res.status(404).send("Not Found")
        }

        supplier = await Supplier.findByIdAndUpdate(req.params.id, { $set: newSupplier }, { new: true })
        res.json({ supplier });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


//ROUTE-4: Delete a Supplier using: DELETE "/api/suppliers/deletesupplier/:id"
router.delete('/deletesupplier/:id', async (req, res) => {
    try {
        // Find the supplier to be delete and delete it
        //parms.id is a id that are in route.post URL
        let supplier = await Supplier.findById(req.params.id);
        if (!supplier) {
            res.status(404).send("Not Found")
        }

        supplier = await Supplier.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Supplier Deleted", supplier: supplier });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//ROUTE-5: Get Supplier using: GET "/api/suppliers/getsupplierByName/:SupplierName"

router.get('/getsupplierByName/:name', async (req, res) => {
    try {
        // Find the Supplier by its name
        let suppliers = await Supplier.find({
            supplier_name: { $regex: `^${req.params.name}`, $options: 'i' }
        });
        
        if (!suppliers || suppliers.length === 0) {
            return res.status(404).json({ message: "Supplier Not Found" });
        }

        res.json({ suppliers });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});


module.exports = router;