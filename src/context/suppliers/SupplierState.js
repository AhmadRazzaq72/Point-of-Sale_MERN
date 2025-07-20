import React, { useState } from "react";
import supplierContext from "./supplierContext";

function SupplierState(props) {
    const host = "http://localhost:5000";
    const supplierInitial = [];
    const [suppliers, setSuppliers] = useState(supplierInitial);

    // Get all Suppliers
    const getSuppliers = async () => {
        // API Call
        const response = await fetch(`${host}/api/suppliers/fetchallsuppliers/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        });
        const json = await response.json();
        setSuppliers(json);
    };

    // Get Supplier By Name
    const getSupplierByName = async (supplierName) => {
        // API Call
        const response = await fetch(`${host}/api/suppliers/getsupplierByName/${supplierName}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        });
    
        const json = await response.json();
        // console.log(json)
        setSuppliers(json);
    };
    

    // Add Supplier
    const addSupplier = async (supplier_name, contact_person, c_number, address, note) => {
        // API Call
        const response = await fetch(`${host}/api/suppliers/addsupplier/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ supplier_name, contact_person, c_number, address, note }),
        });
        const supplier = await response.json();
        setSuppliers(suppliers.concat(supplier));
    };

    // Delete a Supplier
    const deleteSupplier = async (id) => {
        await fetch(`${host}/api/suppliers/deletesupplier/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
        });
        const newSuppliers = suppliers.filter((supplier) => supplier._id !== id);
        setSuppliers(newSuppliers);
    };

    // Edit a Supplier
    const editSupplier = async (id, supplier_name, contact_person, c_number, address, note) => {
        // API Call
        await fetch(`${host}/api/suppliers/updatesupplier/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ supplier_name, contact_person, c_number, address, note }),
        });

        let newSuppliers = [...suppliers];
        for (let index = 0; index < newSuppliers.length; index++) {
            if (newSuppliers[index]._id === id) {
                newSuppliers[index] = {
                    ...newSuppliers[index],
                    supplier_name,
                    contact_person,
                    c_number,
                    address,
                    note
                };
                break;
            }
        }
        setSuppliers(newSuppliers);
    };

    return (
        <supplierContext.Provider value={{ suppliers, getSuppliers, addSupplier, deleteSupplier, editSupplier, getSupplierByName }}>
            {props.children}
        </supplierContext.Provider>
    );
}

export default SupplierState;
