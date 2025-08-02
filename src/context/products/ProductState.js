import React, { useState } from "react";
import productContext from "./productContext";


const ProductState = (props) => {
    const host = "http://localhost:5000"
    const productInitial = []
    const [products, setProducts] = useState(productInitial)

    //Get all Products
    const getProducts = async () => {
        //API Call
        const response = await fetch(`${host}/api/products/fetchallproducts/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"

            },
        });
        const json = await response.json()
        // console.log(json)
        setProducts(json)
    }

    // Get a Product by name
const getProductByName = async (productName) => {
    // API Call
    const response = await fetch(`${host}/api/products/getproductByName/${productName}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    });

    const json = await response.json()
    // console.log(json)
    setProducts(json)
}

    //Add Product
    const addProduct = async (product_name, brand_name, description, supplier_name, o_price, s_price, qty, rec_date, exp_date) => {
        //API Call

        const response = await fetch(`${host}/api/products/addproduct/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ product_name, brand_name, description, supplier_name, o_price, s_price, qty, rec_date, exp_date }),
        });
        const product = await response.json();
        setProducts(products.concat(product))
    }

    //Delete a Product
    const deleteProduct = async (id) => {
        const response = await fetch(`${host}/api/products/deleteproduct/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
        });
        // eslint-disable-next-line no-unused-vars
        const json = response.json();
        const newProducts = products.filter((product) => { return product._id !== id })
        setProducts(newProducts)
    }

    //Edit a Product
    const editProduct = async (id, product_name, brand_name, description, supplier_name, o_price, s_price, qty, rec_date, exp_date) => {
        //API Call
        const response = await fetch(`${host}/api/products/updateproduct/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ product_name, brand_name, description, supplier_name, o_price, s_price, qty, rec_date, exp_date }),
        });
        // console.log(id, product_name, brand_name, description, supplier_name, o_price, s_price, qty, rec_date, exp_date)
        // eslint-disable-next-line no-unused-vars
        const json = await response.json();

        let newProducts = JSON.parse(JSON.stringify(products))
        //Logic to edit in client
        for (let index = 0; index < newProducts.length; index++) {
            const element = newProducts[index];
            if (element._id === id) {
                newProducts[index].product_name = product_name;
                newProducts[index].brand_name = brand_name;
                newProducts[index].description = description;
                newProducts[index].supplier_name = supplier_name;
                newProducts[index].o_price = o_price;
                newProducts[index].s_price = s_price;
                newProducts[index].qty = qty;
                newProducts[index].rec_date = rec_date;
                newProducts[index].exp_date = exp_date;
                break;
            }
        }
        setProducts(newProducts);
    }
        return (
            <productContext.Provider value={{ products, getProducts, addProduct, deleteProduct, editProduct, getProductByName }}>
                {props.children}
            </productContext.Provider>
        )
    }

    export default ProductState;