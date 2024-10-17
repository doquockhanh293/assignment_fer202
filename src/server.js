// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Cho phép tất cả các miền
app.use(express.json()); // Parse JSON data

const corsOptions = {
  origin:
    "mongodb+srv://doquockhanh:doquockhanh@doquockhanh.idqr4.mongodb.net/products", // Địa chỉ của frontend của bạn
  methods: ["GET", "POST", "PUT", "DELETE"], // Các phương thức mà bạn cho phép
  credentials: true, // Cho phép cookie nếu cần
};

app.use(cors(corsOptions));
// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error: ", err));

// Routes for products
app.use("/api/products", require("./routes/products"));

// Ví dụ về route cho sản phẩm
app.get("/products", (req, res) => {
  res.json([
    { id: 1, name: "Product 1" },
    { id: 2, name: "Product 2" },
  ]);
});

// Stripe payment route
app.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe takes amount in cents
      currency: "usd",
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Payment error: ", error);
    res.status(500).json({ error: "Payment failed" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
