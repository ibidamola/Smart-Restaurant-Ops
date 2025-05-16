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
      "===============================Connected to Mongodb Successfully using dotenv coupon!!!============================="
    );


  })
  .catch((err) => {
    console.log(
      `######### not Connected due to the error below ##########\n${err}`
    );
  });

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9]{5,10}$/,
  },
  discountType: {
    type: String,
    enum: [
      "percentage",
      "fixed",
      "free_shipping",
      "bogo",
      "tiered",
      "time_based",
      "bundle",
    ],
    required: true,
  },
  discountAmount: {
    type: Number,
  },
  expiryDate: { type: Date, default: new Date() },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const CouponModel = mongoose.model("Coupon", couponSchema);

export default CouponModel;
