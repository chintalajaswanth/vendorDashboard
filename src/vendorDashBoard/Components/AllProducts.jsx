import React from 'react'
import { useState,useEffect } from 'react'
import { API_URL } from '../data/ApiPath'
const AllProducts = () => {

    const [products,setProducts]=useState([])


    const productsHandler=async()=>{
        const firmId=localStorage.getItem('firmId');

        try{
            const response=await fetch(`${API_URL}/product/${firmId}/products`)
             const newProductData=await response.json();
             setProducts(newProductData.products);
             console.log(newProductData.products);
            
        }
        catch(error)
        {

        }
    }
        useEffect(()=>{
    productsHandler();
  console.log('this is use effect');
  products.map((item)=>console.log(item._id));
        },[])
    
    const deleteProductById=async(productId)=>{
        try{
            const response = await fetch(`${API_URL}/product/${productId}`,{
                method: 'DELETE'
            })
if(response.ok)
{
    setProducts(products.filter(product=>product._id!==productId));
    confirm("are you sure you want to delete this product")
    alert("Product deleted succefully");
} 
} 
    catch(error)
    {
      console.log("Failed to delete product")
      alert("failed to delete product")
    }
}

  return (
    <div>
        {!products ?(
            <p>No Products found</p>
        ):(<table className='product-table'>
            <thead>
                <tr>
                    <th>
                    Product Name
                        </th>
                        <th>
                    Price
                        </th>
                        <th>
                    Image
                        </th>
                        <th>
                    Delete
                        </th>
                        </tr>
                        </thead>
                        <tbody>
                            {products.map((item)=>{
                                return (
                                    <>
                          <tr  key={item._id}>
                            <td >
                                {item.productName}
                            </td>
                            <td>
                                {item.price}
                            </td>
                            <td>
                                {item.image && (
                                    <img src={`${API_URL}/uploads/${item.image}`} alt={item.productName} style={{width:'200px',height:'200px'}}/>
                                )}
                            </td>
                            <td>
                                <button onClick={()=>deleteProductById(item._id)}>Delete</button>
                            </td>
                          </tr>
                          </>
                         )   })}
                                
    
                        </tbody>
                        </table>
        )}
    </div>
  )
}

export default AllProducts