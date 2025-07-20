const mongoose = require('mongoose');
const { Schema } = mongoose;

const SupplierSchema = new Schema({
    
    supplier_name:{
        type: String
    },
    contact_person:{
        type: String
    },
    address:{
        type: String
    },
    c_number:{
        type: Number
    },
    note:{
        type: String
    }
});
module.exports = mongoose.model('suppliers', SupplierSchema); 