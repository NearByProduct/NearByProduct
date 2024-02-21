import React, { useState } from "react";
import ShippingSection from "./ShippingSection";
import PaymentSection from "./PaymentSection";
import SuccessSection from "./SuccessSection";
import { useLocation } from "react-router-dom";
import "../styles/Order/PlaceOrder.css";

const OrderPage = () => {
  const [activeSection, setActiveSection] = useState("address");
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

  const location = useLocation();
  const cart = location.state.cart;
  console.log(cart);

  const handleSectionChange = () => {
    const sections = ["address", "payment", "success"];
    const currentIndex = sections.indexOf(activeSection);
    const nextSection = sections[currentIndex + 1];

    if (nextSection) {
      setActiveSection(nextSection);
    }
  };

  const handleFormDataChange = (newFormData) => {
    setFormData(newFormData);
  };

  return (
    <div>
      <div className="header">
        <h1>Header</h1>
      </div>
      <div className="container">
        <div className="process">
          <div
            className={`step ${activeSection === "address" ? "active" : ""}`}
          >
            <button
              onClick={() => handleSectionChange("address")}
              className="order-process-btn"
            >
              Address
            </button>
          </div>
          <div className="lines"></div>
          <div
            className={`step ${activeSection === "payment" ? "active" : ""}`}
          >
            <button
              onClick={() => handleSectionChange("payment")}
              className="order-process-btn"
            >
              Payment
            </button>
          </div>
          <div className="lines"></div>
          <div
            className={`step ${activeSection === "success" ? "active" : ""}`}
          >
            <button
              className="order-process-btn"
              onClick={() => handleSectionChange("success")}
            >
              Success
            </button>
          </div>
        </div>

        <div className="content">
          {activeSection === "address" && (
            <ShippingSection
              onNext={handleSectionChange}
              onChange={handleFormDataChange}
            />
          )}
          {activeSection === "payment" && (
            <PaymentSection
              onNext={handleSectionChange}
              formData={formData}
              onChange={handleFormDataChange}
            />
          )}
          {activeSection === "success" && <SuccessSection />}
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
