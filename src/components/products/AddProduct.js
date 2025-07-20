import React,{useContext, useState} from 'react'
import "./AddProduct.css"
import productContext from '../../context/products/productContext';
const AddProduct = (props) => {
    const context = useContext(productContext);
    const {addProduct} = context;
    const [product, setProduct] = useState({product_name: "", brand_name:"", description: "", supplier_name: "", o_price: "", s_price: "", qty: "", rec_date: "", exp_date: ""})
  
    const handleClick = (e)=>{
        e.preventDefault();
        addProduct(product.product_name, product.brand_name, product.description, product.supplier_name, product.o_price, product.s_price, product.qty, product.rec_date, product.exp_date);
        setProduct({product_name: "", brand_name:"", description: "", supplier_name: "", o_price: "", s_price: "", qty: "", rec_date: "", exp_date: ""})
        props.showAlert("Product Added Successfully", "success");

    }
    const onChange = (e)=>{
        setProduct({...product, [e.target.name]: e.target.value})
    }

    return (
        <>
            <div className="modal-body " >

                <div className='group-items'>
                    <label htmlFor="Product Name">Product Name <sup>*</sup></label>
                    <input type="text" id="Product Name" name='product_name' value={product.product_name} onChange={onChange}/>
                </div>
                <div className='group-items'>
                    <label htmlFor="Brand Name">Brand Name<sup>*</sup></label>
                    <input type="text" id="Brand Name" name='brand_name' value={product.brand_name} onChange={onChange}/>
                </div>
                <div className='group-items'>
                    <label htmlFor="Supplier">Supplier<sup>*</sup></label>
                    <input type="text" id="Supplier" name='supplier_name' value={product.supplier_name} onChange={onChange}/>
                </div>
                <div className='group-items'>
                    <label htmlFor="Quantity">Quantity<sup>*</sup></label>
                    <input type="text" id="Quantity" name='qty' value={product.qty} onChange={onChange}/>
                </div>
                <div className='group-items'>
                    <label htmlFor="Quantity">Orignal Price<sup>*</sup></label>
                    <input type="text" id="o_price" name='o_price' value={product.o_price} onChange={onChange}/>
                </div>
                <div className='group-items'>
                    <label htmlFor="Quantity">Selling Price<sup>*</sup></label>
                    <input type="text" id="s_price" name='s_price' value={product.s_price} onChange={onChange}/>
                </div>
                <div className='group-items'>
                    <label htmlFor="Date Recieved">Date Recieved<sup>*</sup></label>
                    <input type="date" id="Date Recieved" name="rec_date" value={product.rec_date} onChange={onChange}/>
                </div>
                <div className='group-items'>
                    <label htmlFor="Expiry Date">Expiry Date<sup>*</sup></label>
                    <input type="date" id="Expiry Date" name="exp_date" value={product.exp_date} onChange={onChange} />
                </div>
                <div className='group-items'>
                    <label htmlFor="Description">Description<sup>*</sup></label>
                    <textarea type="text" id="Description" name='description' value={product.description} onChange={onChange} />
                </div>

            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleClick}>Save</button>
            </div>
        </>
    )
}

export default AddProduct