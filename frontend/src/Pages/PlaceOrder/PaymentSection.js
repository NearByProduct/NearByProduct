import React, { useState } from "react";
import "../styles/Order/Payment.css";

const PaymentSection = ({ onNext, onChange }) => {
  const [paymentOption, setPaymentOption] = useState("");

  const handlePaymentOptionChange = (option) => {
    setPaymentOption(option);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
    onChange(paymentOption);
  };

  return (
    <div>
      <div className="container2">
        <div className="paymentData">
          <div className="payment-options">
            <div className="input-result">
              <div>
                <input
                  type="radio"
                  name="paymentOption"
                  value="card"
                  checked={paymentOption === "card"}
                  onChange={() => handlePaymentOptionChange("card")}
                />
                <span>Pay with Debit/Credit Card</span>
              </div>

              <div>
                {paymentOption === "card" && (
                  <div className="card-details">
                    <div className="card-details-top">
                      <div>
                        <label htmlFor="cardNumber">Card Number:</label>
                        <input
                          type="text"
                          id="cardNumber"
                          name="cardNumber"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="expiry">Expiry:</label>
                        <input type="text" id="expiry" name="expiry" required />
                      </div>
                    </div>

                    <div>
                      <div>
                        <label htmlFor="cvv">CVV:</label>
                        <input type="text" id="cvv" name="cvv" required />
                      </div>

                      <div>
                        <label htmlFor="billing-address">
                          Billing address:
                        </label>
                        <input
                          type="text"
                          id="billing-address"
                          name="billing-address"
                          required
                        />
                      </div>
                    </div>
                    <button className="submit-payment-btn">Submit</button>
                  </div>
                )}
              </div>
            </div>

            <div>
              <div>
                <input
                  type="radio"
                  name="paymentOption"
                  value="paypal"
                  checked={paymentOption === "paypal"}
                  onChange={() => handlePaymentOptionChange("paypal")}
                />
                <span>Pay with PayPal</span>
              </div>

              {paymentOption === "paypal" && (
                <div className="paypal-details">
                  <div className="paypal-details">
                    <div>
                      <label htmlFor="paypal-email">Paypal Email:</label>
                      <input
                        type="email"
                        id="paypal-email"
                        name="paypal-email"
                        required
                      />
                    </div>
                  </div>

                  <button className="submit-payment-btn">Submit</button>
                </div>
              )}
            </div>

            <div>
              <div>
                <input
                  type="radio"
                  name="paymentOption"
                  value="cod"
                  checked={paymentOption === "cod"}
                  onChange={() => handlePaymentOptionChange("cod")}
                />
                <span>Cash on Delivery (COD)</span>
              </div>

              <div>
                {paymentOption === "cod" && (
                  <div className="cod-details">
                    <div>
                      <button className="submit-payment-btn">Confirm</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
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

export default PaymentSection;
