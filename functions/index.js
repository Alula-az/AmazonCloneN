const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

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

app.post("/payment/create", async(req,res)=>{
    const total =req.query.total
    if(total>0){
        const paymentIntent = stripe.paymentIntents.create({

            amount: total,
            currency: "usd"
        })

        res.status(200).json({
            clientSecret: paymentIntent.client_secret
        })
    }else{
        res.status(403).json({
            message: "total must be greater than 0"
        })
    }
})



exports.api = onRequest(app);
