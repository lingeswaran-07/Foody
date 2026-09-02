import React, { useContext, useState } from "react";
import axios from "axios";
import "./Placeorder.css";
import { StoreContext } from "../../Context/StoreContext";

const Placeorder = () => {
  const { getTotalCartAmount, cartitems, food_list, url, token } =
    useContext(StoreContext);

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

  const buildItemsArray = () => {
    return food_list
      .filter((item) => cartitems[item._id] > 0)
      .map((item) => ({
        ...item,
        quantity: cartitems[item._id],
      }));
  };

  const handleSubmit123 = async (event) => {
    event.preventDefault();

    if (!isFormValid()) {
      alert("Please fill in all required fields.");
      return;
    }

    const finalAmount =
      getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2;

    try {
      // Step 1: create Razorpay order via backend
      const { data } = await axios.post(
        `${url}/api/order/create`,
        { amount: finalAmount },
        { headers: { token } },
      );

      const razorpayOrder = data.order;

      const options = {
        key: "rzp_test_TX59xF0CvUZNU3",
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "FOODY",
        description: "For testing purpose",
        order_id: razorpayOrder.id,
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
        handler: async function (response) {
          try {
            const orderPayload = {
              items: buildItemsArray(),
              amount: finalAmount,
              address: formData,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            };

            await axios.post(`${url}/api/order/place`, orderPayload, {
              headers: { token },
            });

            alert("Order placed successfully!");
          } catch (err) {
            console.error("Error saving order:", err);
            alert(
              "Payment succeeded but saving the order failed. Please contact support.",
            );
          }
        },
      };

      const pay = new window.Razorpay(options);
      pay.open();
    } catch (error) {
      console.error("Error creating Razorpay order:", error);
      alert("Could not initiate payment. Please try again.");
    }
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
