import React from 'react'
import { useState } from 'react'
import { API_URL } from '../data/ApiPath';
const AddProducts = () => {

    const [productName,setProductName]=useState("");
    const [price,setPrice]=useState("");
    const [category,setCategory]=useState([]);
    const [BestSeller,setBestSeller]=useState(false);
    const [image,setImage]=useState(null);
    const [description,setDescription]=useState("")
    const handleCategoryChange = (event) => {
      const value = event.target.value;
      setCategory((prev) =>
        prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
      );
    };

    const handleBestSeller=(e)=>
    {
const value=e.target.value==='true';
setBestSeller(value);

    }
    const handleImageUpload = (event) => {
      const selectedImage = event.target.files[0];
      setImage(selectedImage);
    };
  
  
    const handleAddProduct=async(e)=>{
      e.preventDefault();
     try{
        const loginToken=localStorage.getItem('loginToken')
        
        const firmId=localStorage.getItem('firmId');
       if(!loginToken || firmId)
       {
      console.error("user not authenticated")
       }
       const formData = new FormData();
       formData.append('productName', productName);
       formData.append('price', price);
       formData.append('description', description);
       if (image) {
         formData.append('image', image);
       }
       formData.append("bestSeller",BestSeller)
 
       category.forEach((value) => formData.append('category[]', value));
    

       const response=await fetch(`${API_URL}/product/add-product/${firmId}`,
        {
          method:"POST",
          body:formData
        }
       )
       const data=await response.json();
       
       if(response.ok)
       {
        alert("Product added Successfully")
       }
      }
      catch(error)
      {
        console.error(error);
      }
      } 
    
  return (
    <div className='firmSection'>
    <form className="tableForm" onSubmit={handleAddProduct}>
        <h3>Add Product</h3>
        <label>Product Name </label><br />
        <input type='text' value={productName} onChange={(e)=>setProductName(e.target.value)}></input>
        <label>Price</label><br />
        <input type='text' value={price} onChange={(e)=>setPrice(e.target.value)}></input>
        <div className="checkInp">
         
         <label>Category</label>
         <div className="inputContainer">
         <div className="checkboxContainer">
           <label>veg</label>
           <input type="checkbox" checked={category.includes('veg')} value="veg" onChange={handleCategoryChange}/>
         </div>
         <div className="checkboxContainer">
           <label>non-veg</label>
           <input type="checkbox" checked={category.includes('non-veg')} value="non-veg"onChange={handleCategoryChange}/>
         </div>
         </div>
       </div>
       <div className="checkInp">
        
         <label>Best Seller</label>
         <div className="inputContainer">
         <div className="checkboxContainer">
           <label>Yes</label>
           <input type="radio" checked={BestSeller===true} value="yes" onChange={handleBestSeller}/>
         </div>
         <div className="checkboxContainer">
           <label>No</label>
           <input type="radio" checked={BestSeller===false} value="no" onChange={handleBestSeller}/>
         </div>
         </div>
       </div>
       
        <label>Description </label><br />
        <input type='text' value={description} onChange={(e)=>setDescription(e.target.value)}></input>
        <label>Image </label><br />
        <input type='file' onChange={handleImageUpload}></input>
        
        <div className="btnSubmit" >
            <button type="submit">Submit</button></div>
    </form>
   </div>
  )
}

export default AddProducts