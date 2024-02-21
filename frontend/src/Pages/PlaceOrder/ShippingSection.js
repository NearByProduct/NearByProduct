import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Order/Shipping.css";

const ShippingSection = ({ onNext, onChange }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    state: "",
    country: "",
    emailAddress: "",
    zipCode: "",
    city: "",
    address: "",
  });

  // const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    onNext();
    onChange(formData);
  };

  return (
    <div>
      <div className="container2">
        <div className="formData">
          <form action="#" onSubmit={handleSubmit}>
            <div className="form-column">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                onChange={handleChange}
                required
              />

              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                onChange={handleChange}
                required
              />

              <label htmlFor="state">State</label>
              <input
                type="text"
                id="state"
                name="state"
                onChange={handleChange}
                required
              />

              <label htmlFor="country">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-column">
              <label htmlFor="emailAddress">Email Address</label>
              <input
                type="email"
                id="emailAddress"
                name="emailAddress"
                onChange={handleChange}
                required
              />

              <label htmlFor="zipCode">Zip Code</label>
              <input type="text" id="zipCode" name="zipCode" required />

              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                onChange={handleChange}
                required
              />

              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                onChange={handleChange}
              />
            </div>
          </form>
        </div>

        <div className="total">
          <div className="order-summary">
            <h2>Order Summary</h2>
            <div className="summary-item">
              <span>Subtotal:</span>
              <span>$100.00</span>
            </div>
            <div className="summary-item">
              <span>Shipping Charges:</span>
              <span>$10.00</span>
            </div>
            <div className="summary-item">
              <span>Discount:</span>
              <span>-$15.00</span>
            </div>
            <hr />
            <div className="summary-item total">
              <span>Total:</span>
              <span>$95.00</span>
            </div>

            <div className="next">
              <button className="next-btn" onClick={handleSubmit}>
                NEXT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingSection;
