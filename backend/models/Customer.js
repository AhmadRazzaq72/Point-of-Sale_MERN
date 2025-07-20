const mongoose = require('mongoose');
const { Schema } = mongoose;

const CustomersSchema = new Schema({
    
    full_name:{
        type: String
    },
    product_name:{
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
    },
    total:{
        type: Number
    },
    due_date:{
        type: Date
    },
    
});
module.exports = mongoose.model('customers', CustomersSchema); 