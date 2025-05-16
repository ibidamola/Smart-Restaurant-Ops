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
      "===============================Connected to Mongodb Successfully !!!============================="
    );
  })
  .catch((err) => {
    console.log(
      `######### not Connected due to the error below ##########\n${err}`
    );
  });

const UserSchema = mongoose.Schema({
  Firstname: { type: String, required: true },
  Lastname: { type: String, required: true },
  Mobile: { type: Number, required: true },
  email: { type: String, required: true },
  Address: { type: String, required: true },
  Password: { type: String, required: true },
  Usertype: {
    type: String,
    enum: ["ADMIN", "MANAGER", "EMPLOYEE"],
    required: true,
  },
});

const UsersModel = mongoose.model("Userss", UserSchema);

export default UsersModel;
