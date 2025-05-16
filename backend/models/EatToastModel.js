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
      "===============================Connected to Mongodb Successfully categories !!!============================="
    );
  })
  .catch((err) => {
    console.log(
      `######### not Connected due to the error below ##########\n${err}`
    );
  });

const CategoriesSchema = mongoose.Schema({
  category_name: { type: String, required: true },
});

const catModel = mongoose.model("Categories", CategoriesSchema);

export default catModel;
