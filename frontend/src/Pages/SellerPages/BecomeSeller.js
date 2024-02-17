import React, { useState } from 'react';

const Becomeseller = () => {
  const [formData, setFormData] = useState({
    shopname: '',
    ownername: '',
    email: '',
    contactNumber: '',
    aadharCard: '',
    address: {
      state: '',
      city: '',
      district: '',
      postalCode: '',
      latitude: '',
      longitude: ''
    },
    category: '',
    imagefshop: null // Additional field for shop image
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      address: {
        ...prevState.address,
        [name]: value
      }
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData(prevState => ({
      ...prevState,
      imagefshop: file
    }));
  };
  const handlelocationChange=(e)=>{
    const geo=navigator
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can submit the form data, for example:
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Shop Name:
        <input type="text" name="shopname" value={formData.shopname} onChange={handleChange} />
      </label>
      <br />
      <label>Owner Name:
        <input type="text" name="ownername" value={formData.ownername} onChange={handleChange} />
      </label>
      <br />
      <label>Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </label>
      <br />
      <label>Contact Number:
        <input type="tel" name="contactNumber" value={formData.contactNumber} onChange={handleChange} />
      </label>
      <br />
      <label>Aadhar Card:
        <input type="text" name="aadharCard" value={formData.aadharCard} onChange={handleChange} />
      </label>
      <br />
      <label>Address - State:
        <input type="text" name="state" value={formData.address.state} onChange={handleAddressChange} />
      </label>
      <br />
      <label>Address - City:
        <input type="text" name="city" value={formData.address.city} onChange={handleAddressChange} />
      </label>
      <br />
      <label>Address - District:
        <input type="text" name="district" value={formData.address.district} onChange={handleAddressChange} />
      </label>
      <br />
      <label>Address - Postal Code:
        <input type="text" name="postalCode" value={formData.address.postalCode} onChange={handleAddressChange} />
      </label>
      <br />
      <label>Address - Latitude:
        <input type="text" name="latitude" value={formData.address.latitude} onChange={handleAddressChange} />
      </label>
      <br />
      <label>Address - Longitude:
        <input type="text" name="longitude" value={formData.address.longitude} onChange={handleAddressChange} />
      </label>
      <br />
      <label>Category:
        <input type="text" name="category" value={formData.category} onChange={handleChange} />
      </label>
      <br />
      <label>Shop Image:
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </label>
      <br />
        <div onClick={handlelocationChange}><button>Click To ADD Shop Location</button></div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Becomeseller;
