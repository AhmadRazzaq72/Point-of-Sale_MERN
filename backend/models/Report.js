const mongoose = require('mongoose');
const { Schema } = mongoose;

// Product Schema
const ProductSchema = new Schema({
    invoice_number: {
        type: Number,
        required: true,
        ref: 'invoices' // Reference to the Invoice collection
    },
    product_id: {
        type: String
    },
    product_name: {
        type: String
    },
    price: {
        type: Number
    },
    qty: {
        type: Number
    },
    discount: {
        type: Number
    },
    amount: {
        type: Number
    }
});

// Invoice Schema
const InvoiceSchema = new Schema({
    invoice_number: {
        type: Number,
        unique: true,
        required: true
    },
    date_time: {
        type: Date
    },
    customer_name: {
        type: String
    },
    total: {
        type: Number
    },
    cash: {
        type: Number
    },
    change: {
        type: Number
    }
});

// Export Models
const Productsale = mongoose.models.productsale || mongoose.model('productsale', ProductSchema);
const Invoice = mongoose.models.invoices || mongoose.model('invoices', InvoiceSchema);

module.exports = { Productsale, Invoice };
