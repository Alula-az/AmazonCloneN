const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const stripe = require("stripe")(process.env.STRIPE_KEY);

const app = express();

app.use(cors({ origin: true }));
app.use(express.json()); // Use this instead of express.application()

// ✅ Define a test route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Success!",
  });
});

// ✅ Fix: Add `await` inside async function
app.post("/payment/create", async (req, res) => {
  const total = Number(req.query.total); // Convert to number

  if (total > 0) {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: total, // Stripe requires amount in cents
        currency: "usd",
      });

      res.status(201).json({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error) {
      console.error("Error creating payment intent:", error);
      res.status(500).json({
        message: "Payment failed",
        error: error.message,
      });
    }
  } else {
    res.status(400).json({
      message: "Total must be greater than 0",
    });
  }
});

// ✅ Fix: Improve error handling in `app.listen`
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `Amazon server Running on PORT: ${PORT}, http://localhost:${PORT}`
  );
});
