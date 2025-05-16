import { Router } from "express";
import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.resolve(__dirname, '../.env');
dotenv.config();

// Check if the environment variable is available
if (process.env.STRIPE_KEY) {
  console.log("Stripe secret key:", process.env.STRIPE_KEY);
} else {
  console.log(
    "Stripe secret key not found. Make sure it is defined in your .env file."
  );
}

const STRIPE_KEY = process.env.STRIPE_KEY; // Retrieve the secret key from environment variables
const CLIENT_URL = "http://localhost:3000";

const stripe = Stripe(STRIPE_KEY);

const router = express.Router();

router.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'T-shirt',
            },
            unit_amount: 2000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${CLIENT_URL}/CheckoutSuccess`,
      cancel_url: `${CLIENT_URL}/Cart`,
    });

    // Send the URL of the checkout session back to the client
    res.json({ url: session.url });
  
});

export default router;
