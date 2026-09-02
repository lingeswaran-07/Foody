import React, { useContext, useState } from "react";
import "./Placeorder.css";
import { StoreContext } from "../../Context/StoreContext";

const Placeorder = () => {
  const { getTotalCartAmount } = useContext(StoreContext);

  // State to store form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Validate form data
  const isFormValid = () => {
    const { firstName, email, street, city, state, zipCode, country, phone } =
      formData;

    return (
      firstName &&
      email &&
      street &&
      city &&
      state &&
      zipCode &&
      country &&
      phone
    );
  };

  const handleSubmit123 = (event) => {
    event.preventDefault();

    // Check if form is valid
    if (!isFormValid()) {
      alert("Please fill in all required fields.");
      return;
    }

    // Calculate the total amount in paise (Razorpay uses paise)
    const totalAmount =
      getTotalCartAmount() === 0 ? 0 : (getTotalCartAmount() + 2) * 100;

    const options = {
      key: "rzp_test_TX59xF0CvUZNU3",
      amount: totalAmount,
      currency: "INR",
      name: "FOODY",
      description: "For testing purpose",
      prefill: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        contact: formData.phone,
      },
      notes: {
        address: formData.street,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const pay = new window.Razorpay(options);
    pay.open();
  };

  return (
    <form className="place_order">
      <div className="place_order_left">
        <p className="title">Delivery Information</p>
        <div className="multi_fields">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="street"
          placeholder="Street"
          value={formData.street}
          onChange={handleChange}
          required
        />
        <div className="multi_fields">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            required
          />
        </div>
        <div className="multi_fields">
          <input
            type="text"
            name="zipCode"
            placeholder="Zip Code"
            value={formData.zipCode}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
            required
          />
        </div>
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>
      <div className="place_order_right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>Rs.{getTotalCartAmount()}</p>
            </div>
            <div className="cart-total-details">
              <p>Delivery fee</p>
              <p>Rs.{getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                Rs.{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
              </b>
            </div>
          </div>
          <button type="button" onClick={handleSubmit123}>
            Proceed To Payment
          </button>
        </div>
      </div>
    </form>
  );
};

export default Placeorder;
