import React, { useContext, useState } from "react";
import classes from "./Payment.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { axiosInstance } from "../../Api/axios";
import { ClipLoader } from "react-spinners";
import { db } from "../../Components/Utility/firbase";
import { useNavigate } from "react-router-dom";
import { Type } from "../../Components/Utility/action.type";

function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const totalItem = basket?.reduce((amount, item) => amount + item.amount, 0);
  const total = basket.reduce(
    (amount, item) => amount + item.price * item.amount,
    0
  );

  const handleChange = (e) => {
    setCardError(e?.error?.message || "");
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setCardError("Stripe is not loaded. Please try again.");
      return;
    }

    try {
      setProcessing(true);
      setCardError(null);

      console.log("Requesting client secret...");

      // 1. Get Client Secret from Backend
      const response = await axiosInstance.post(
        `/payment/create?total=${total * 100}`
      );

      if (!response.data?.clientSecret) {
        throw new Error("Failed to retrieve client secret.");
      }

      const clientSecret = response.data.clientSecret;
      console.log("Received Client Secret:", clientSecret);

      // 2. Confirm Payment with Stripe
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );

      if (error) {
        console.error("Payment Error:", error);
        setCardError(error.message);
        setProcessing(false);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        console.log("Payment successful!", paymentIntent);

        // 3. Store order in Firestore
        await db
          .collection("users")
          .doc(user?.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });

        // Clear Basket
        dispatch({ type: Type.EMPTY_BASKET });

        // Redirect to Orders Page
        setProcessing(false);
        navigate("/orders", { state: { msg: "Your order has been placed!" } });
      } else {
        setCardError("Payment failed. Please try again.");
        setProcessing(false);
      }
    } catch (error) {
      console.error("Payment Error:", error.message);
      setCardError(
        error.message || "An error occurred during payment. Please try again."
      );
      setProcessing(false);
    }
  };

  return (
    <LayOut>
      <div className={classes.payment__header}>
        Checkout ({totalItem}) items
      </div>
      <section className={classes.payment}>
        {/* Delivery Address */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 React Lane</div>
            <div>Chicago, IL</div>
          </div>
        </div>
        <hr />

        {/* Review Items */}
        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item, i) => (
              <ProductCard key={i} product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />

        {/* Payment Method */}
        <div className={classes.flex}>
          <h3>Payment methods</h3>
          <div className={classes.payment__card__container}>
            <div className={classes.payment__details}>
              <form onSubmit={handlePayment}>
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}

                <CardElement onChange={handleChange} />

                <div className={classes.payment__price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p>Total Order |</p> <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button
                    type="submit"
                    disabled={processing || !stripe || !elements}
                  >
                    {processing ? (
                      <div className={classes.loading}>
                        <ClipLoader color="gray" size={12} />
                        <p>Please Wait ...</p>
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;
