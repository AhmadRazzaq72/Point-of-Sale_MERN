import React, { useState } from "react";
import customerContext from "./customerContext";


function CustomerState(props) {
    const host = "http://localhost:5000"
    const customerInitial = []
    const [customers, setCustomers] = useState(customerInitial)

    //Get all Customers
    const getCustomers = async () => {
        //API Call
        const response = await fetch(`${host}/api/customers/fetchallcustomers/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"

            },
        });
        const json = await response.json()
        // console.log(json)
        setCustomers(json)
    }
    //Add Customer
    const addCustomer = async (full_name, product_name, address, c_number, note, total, due_date) => {
        //API Call
        const response = await fetch(`${host}/api/customers/addcustomer/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ full_name, product_name, address, c_number, note, total, due_date}),
        });
        const customer = await response.json();
        setCustomers(customers.concat(customer))
    }

    //Delete a Customer
    const deleteCustomer = async (id) => {
        const response = await fetch(`${host}/api/customers/deletecustomer/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
        });
        // eslint-disable-next-line no-unused-vars
        const json = response.json();
        const newCustomers = customers.filter((customer) => { return customer._id !== id })
        setCustomers(newCustomers)
    }

    //Edit a Customer
    const editCustomer = async (id, full_name, product_name, address, c_number, note, total, due_date) => {
        //API Call
        const response = await fetch(`${host}/api/customers/updatecustomer/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ full_name, product_name, address, c_number, note, total, due_date}),
        });
        // console.log(id, customer_name, brand_name, description, supplier_name, o_price, s_price, qty, rec_date, exp_date)
        // eslint-disable-next-line no-unused-vars
        const json = await response.json();

        let newCustomers = JSON.parse(JSON.stringify(customers))
        //Logic to edit in client
        for (let index = 0; index < newCustomers.length; index++) {
            const element = newCustomers[index];
            if (element._id === id) {
                newCustomers[index].full_name = full_name;
                newCustomers[index].product_name = product_name;
                newCustomers[index].address = address;
                newCustomers[index].c_number = c_number;
                newCustomers[index].note = note;
                newCustomers[index].total = total;
                newCustomers[index].due_date = due_date;
                
                break;
            }
        }
        setCustomers(newCustomers);
    }
        return (
            <customerContext.Provider value={{ customers, getCustomers, addCustomer, deleteCustomer, editCustomer }}>
                {props.children}
            </customerContext.Provider>
        )
    }

export default CustomerState