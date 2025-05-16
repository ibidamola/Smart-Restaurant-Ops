import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

//const uri = "mongodb+srv://test123:Conestoga@cestar-node.wzsxe.mongodb.net/car_craze?retryWrites=true&w=majority";
const uri = process.env.DATABASE_URL;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(
      "===============================Connected to Mongodb Successfully order!!!============================="
    );
  })
  .catch((err) => {
    console.log(
      "######### not Connected due to the error below ##########\n${err}"
    );
  });

const orderSchema = mongoose.Schema({
  orderItems: [
    {
      product_name: { type: String },
      product_price: { type: Number },
      Quantity: { type: Number },
    },
  ],
  product_name: { type: String },
  product_price: { type: Number },
  quantity: { type: Number },
  CustomerFirstname: { type: String },
  Customer_email: { type: String },
  CustomerLastname: { type: String },
  CustomerMobile: { type: Number },
  Product_name: { type: String },
  Product_price: { type: Number },
  quantity: { type: Number },
  TotalPriceWithTax: { type: Number },
  Date: { type: Date, default: new Date() },
  CurrentDate: { type: Date, default: new Date() },
  Time: { type: String },
  DeliveryType: {
    type: String,
    enum: ["Online Delivery", "Pick up order"],
  },
  PaymentBy: {
    type: String,
    enum: ["Card Payment", "Cash on delivery"],
    default: "Card Payment",
  },
  CustomerId: {
    type: mongoose.Types.ObjectId,
    ref: "CustomerModel",
  },
  Status: { type: String, default: "Pending" },
});

const OrderModel = mongoose.model("Orders", orderSchema);

export default OrderModel;
