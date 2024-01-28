import React, { useState } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import Navigation from "./Navigation";

const CreditCardUi = (props) => {
  const [gamesCount, setGamesCount] = useState(props.location.gamesCount);
  const [lastPrice, setLastPrice] = useState(props.location.lastPrice);
  const [couponCode, setCouponCode] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState(lastPrice);

  const [payment, setPayment] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    issuer: "",
    focused: "",
    formData: null,
  });

  const handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      setPayment({ issuer });
    }
  };

  const onInputFocus = ({ target }) => {};

  const onInputUpdate = ({ target }) => {
    console.log({ [target.name]: target.value });
  };

  const handleCouponApply = () => {
    if (couponCode.trim() !== "") {
      // For simplicity, applying a fixed 10% discount here.
      const discount = 0.1; // 10%
      const newDiscountedPrice = lastPrice - lastPrice * discount;
      setDiscountedPrice(newDiscountedPrice); alert("Congrats! you Save 10%")
    }
   
  };
  const handledecrement =() =>{
    alert("Thank you For Buying from our site, Have a Good Day")
    


}
  const handleSubmit = (e) => {
    // Handle form submission here
    e.preventDefault();
    // You can include additional logic for handling payment submission
    // ...

    console.log("Form submitted!");
  };

  const { name, number, expiry, cvc, focused, issuer } = payment;

  return (
    <div key="Payment">
      <div>
        <Cards
          number={number}
          name={name}
          expiry={expiry}
          cvc={cvc}
          focused={focused}
          callback={handleCallback}
        />
        <Navigation />
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3 mt-4">
            <div className="text-center">
              {gamesCount} Games in Your Shopping Cart
              <br></br>
              Total : {Math.trunc(discountedPrice)}₪
            </div>
            <div className="row mb-3">
            <div className="col-8">
              <input
                type="text"
                name="couponCode"
                className="form-control"
                placeholder="Coupon Code"
                onChange={(e) => setCouponCode(e.target.value)}
              />
            </div>
            <div className="col-4">
              <button
                type="button"
                className="btn btn-dark"
                onClick={handleCouponApply}
              >
                Apply Coupon to Save 10%
              </button>
            </div>
          </div>
            <input
              type="tel"
              name="number"
              className="form-control"
              placeholder="Card Number"
              pattern="[\d| ]{16,22}"
              required
              onChange={onInputUpdate}
              onFocus={onInputFocus}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Name"
              required
              onChange={onInputUpdate}
              onFocus={onInputFocus}
            />
          </div>
          <div className="row mb-3">
            <div className="col-6">
              <input
                type="tel"
                name="expiry"
                className="form-control"
                placeholder="Valid Thru"
                pattern="\d\d/\d\d"
                required
                onChange={onInputUpdate}
                onFocus={onInputFocus}
              />
            </div>
            <div className="col-6">
              <input
                type="tel"
                name="cvc"
                className="form-control"
                placeholder="CVC"
                pattern="\d{3,4}"
                required
                onChange={onInputUpdate}
                onFocus={onInputFocus}
              />
            </div>
          </div>
          <input type="hidden" name="issuer" value={issuer} />

        

          <div className="d-grid">
            <button onClick= {() => handledecrement()} className="btn btn-dark">Confirm</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreditCardUi;
