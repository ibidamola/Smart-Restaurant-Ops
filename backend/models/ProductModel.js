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
      "===============================Connected to Mongodb Successfully products !!!============================="
    );
  })
  .catch((err) => {
    console.log(
      `######### not Connected due to the error below ##########\n${err}`
    );
  });

const ProductsSchema = mongoose.Schema({
  Product_name: { type: String, required: true },
  Product_price: { type: Number, required: true },
  Product_description: { type: String, required: true },
  Product_image: {
    url: { type: String },
  },
  Category: { type: String },
});

const ProductModel = mongoose.model("Products", ProductsSchema);

export default ProductModel;
