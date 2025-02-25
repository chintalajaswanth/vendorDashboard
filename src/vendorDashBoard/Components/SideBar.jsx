import React from 'react'

const SideBar = ({showFirmHandler,showProductHandler,showAllProductsHandler,showFirmName}) => {
  return (
    <div className='sideBarSection'>
        <ul>
          {showFirmName ?(
          <li onClick={showFirmHandler}>Add Firm</li>):("")}
          <li onClick={showProductHandler}>Add Product</li>
          <li onClick={showAllProductsHandler}>All Products</li>
          <li>User Details</li>  
        </ul>
    </div>
  )
}

export default SideBar