const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductsSchema = new Schema({
    
    product_name:{
        type: String
    },
    brand_name:{
        type: String
    },
    description:{
        type: String
    },
    supplier_name:{
        type: String
    },
    o_price:{
        type: Number
    },
    s_price:{
        type: Number
    },
    qty:{
        type: Number
    },
    rec_date:{
        type: Date
    },
    exp_date:{
        type: Date
    },
});
module.exports = mongoose.model('products', ProductsSchema); 