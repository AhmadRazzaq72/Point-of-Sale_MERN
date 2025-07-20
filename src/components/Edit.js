import React, {useState, useEffect} from 'react'
import AddCustomer from './customers/AddCustomer';
import AddSupplier from './suppliers/AddSupplier';
import EditProduct from './products/EditProduct';
const Edit = () => {
    const [selectedComponent, setSelectedComponent] = useState(1);
    const renderSelectedComponent = () => {
      switch (selectedComponent) {
        case 1:
          return <EditProduct  />;
        case 2:
          return <AddCustomer />;
        case 3:
          return <AddSupplier />;
        default:
          return null;
      }
    }
    // useEffect(() => {
    //   setSelectedComponent(props.component);
    // }, [props.component]);
    // console.log(props.data)

  return (
    <>
    
      {renderSelectedComponent()}
 
 
  
    
    </>
  )
}

export default Edit