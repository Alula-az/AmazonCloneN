const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const stripe = require("stripe")(process.env.STRIPE_KEY);

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

// ✅ Test route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Success!",
  });
});

app.post("/payment/create", async (req, res) => {
  try {
    const total = req.query.total;

    if (!total || isNaN(total) || total <= 0) {
      return res.status(400).json({ message: "Total must be greater than 0" });
    }

    console.log(`🛒 Payment request received. Total: ${total} cents`);

    // ✅ Fix: Add 'await' before stripe.paymentIntents.create()
    const paymentIntent = await stripe.paymentIntents.create({
      amount: parseInt(total),
      currency: "usd",
      payment_method_types: ["card"],
    });

    console.log(`✅ Client Secret Generated: ${paymentIntent.client_secret}`);

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("❌ Error creating payment intent:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Deployable Firebase function
exports.api = onRequest(app);
