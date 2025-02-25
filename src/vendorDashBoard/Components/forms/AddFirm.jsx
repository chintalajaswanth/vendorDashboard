import React, { useState } from 'react';
import { API_URL } from '../../data/ApiPath';

const AddFirm = () => {
  const [firmname, setFirmName] = useState("");
  const [area, setAreaName] = useState("");
  const [category, setCategory] = useState([]);
  const [region, setRegion] = useState([]);
  const [file, setFile] = useState(null);
  const [offer, setOffer] = useState("");

  const handleFirmSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginToken = localStorage.getItem('loginToken');
      if (!loginToken) {
        console.error("User not authenticated");
      
      }

      const formData = new FormData();
      formData.append('firmName', firmname);
      formData.append('area', area);
      formData.append('offer', offer);
      if (file) {
        formData.append('image', file);
      }

      category.forEach((value) => formData.append('category[]', value));
      region.forEach((value) => formData.append('region[]', value));

  
      const response = await fetch(`${API_URL}/firm/add-firm`,{
        method:'POST',
        headers:{
          'token': `${loginToken}`
        },
        body: formData
      });

      const data = await response.json();
      if (!response.ok) {
        alert("only one firm can have or failed to add  firm")
        
        throw new Error(data.message || "vendor can have only one firm");
       
        
      }

      console.log(data);
      alert("Firm added successfully");
      setFirmName("");
      setAreaName("");
      setCategory([])
      setOffer("");
      setFile(null);
      setRegion([]);
      console.log(data.FirmId);
      const mango=data.FirmId;
      localStorage.setItem('firmid',mango);


    } catch (error) {
      console.error("Error:",error);
    }
  };

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    setCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const handleRegionChange = (event) => {
    const value = event.target.value;
    setRegion((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const handleImageUpload = (event) => {
    const selectedImage = event.target.files[0];
    setFile(selectedImage);
  };

  return (
    <div className='firmSection'>
      <form className="tableForm" onSubmit={handleFirmSubmit}>
        <h3>Add Firm</h3>

        <label>Firm Name </label>
        <input name="firmname" type='text' value={firmname} onChange={(e) => setFirmName(e.target.value)} />

        <label>Area</label>
        <input name="area" type='text' value={area} onChange={(e) => setAreaName(e.target.value)} />

        <div className="checkInp">
          <label>Category</label>
          <div className="inputContainer">
            <div className="checkboxContainer">
              <label>Veg</label>
              <input type="checkbox" name="category" value="veg" checked={category.includes('veg')} onChange={handleCategoryChange} />
            </div>
            <div className="checkboxContainer">
              <label>Non-Veg</label>
              <input type="checkbox" name="category" value="non-veg" checked={category.includes('non-veg')} onChange={handleCategoryChange} />
            </div>
          </div>
        </div>

        <div className="checkInp">
          <label>Region</label>
          <div className="inputContainer">
            <div className="checkboxContainer">
              <label>South-Indian</label>
              <input type="checkbox" name="region" value="south-indian" checked={region.includes("south-indian")} onChange={handleRegionChange} />
            </div>
            <div className="checkboxContainer">
              <label>North-Indian</label>
              <input type="checkbox" name="region" value="north-indian" checked={region.includes("north-indian")} onChange={handleRegionChange} />
            </div>
            <div className="checkboxContainer">
              <label>Chinese</label>
              <input type="checkbox" name="region" value="chinese" checked={region.includes("chinese")} onChange={handleRegionChange} />
            </div>
          </div>
        </div>

        <label>Offer </label>
        <input type='text' name='offer' value={offer} onChange={(e) => setOffer(e.target.value)} />

        <label>Firm Image </label>
        <input type='file' accept="image/*" onChange={handleImageUpload} />

        <div className="btnSubmit">
          <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddFirm;
