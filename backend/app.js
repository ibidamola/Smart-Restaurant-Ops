//console.log("welcome");

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { Error, Query } from "mongoose";
import eatToastModel from "./models/EatToastModel.js";
import productModel from "./models/ProductModel.js";
import ProductModel from "./models/ProductModel.js";
import UsersModel from "./models/UsersModel.js";
import CustomersModel from "./models/CustomerModel.js";
import OrderModel from "./models/OrderModel.js";
import ReviewsModel from "./models/ReviewModel.js";
import CouponModel from "./models/CouponModel.js";
import tableModel from "./models/TableBooking.js";
import bcrypt from "bcrypt";
import imageaxiosModel from "./models/ImageModel.js";
import Stripe from "stripe";
import cors from "cors";
import express from "express";
import dotenv from "dotenv";
dotenv.config();

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const admin = require("firebase-admin");

const app = express();
// Use CORS middleware with desired configuration
app.use(
  cors({
    origin: "https://thriving-praline-b27945.netlify.app",
  })
);
var serviceAccount = require("./clothingstore-a76eb-firebase-adminsdk-sf291-848c617f1b.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  
});

console.log('Test variable:', process.env.TEST_VARIABLE);
var bucket = admin.storage().bucket();
const CLIENT_URL = "http://localhost:3000";

const typeDefs = `
scalar Date



type Image { 
  url: String! 
}

type Booking {
  id: ID!
  available: Boolean!
}

type TimeSlot{
  time: String!
  date: String!
}

type Table{
  name: String!
  times: [TimeSlot!]
}
type TableBooking {
  _id: ID,
  tableName: String!
  time: String!
  date: String!
  capacity: String!
  available: Boolean!
  firstname: String,
  lastname: String,
  phonenumber: Int,
  email:String,
}
type Coupon{
  _id: ID,
  code: String,
  discountType: String,
  discountAmount: Int,
  
  expiryDate: Date,
  isActive:String,
}
type Order{

  _id: ID,
  CustomerFirstname: String,
  CustomerLastname: String,
  CustomerMobile: Int,
  Product_name: String,
  Product_price: Int,
  Quantity:Int,
  TotalPriceWithTax:Float,
  Date: Date,
  CurrentDate:Date,
  DeliveryType:String ,
  PaymentBy: String,
  CustomerId: ID,
  Time:String,
}

type Orders {
  _id: ID
  CustomerFirstname: String
  CustomerLastname: String
  CustomerMobile: Int
  orderItems: [OrderItem] 
  TotalPriceWithTax: Float
  Date: Date
  CurrentDate: Date
  DeliveryType: String
  PaymentBy: String
  CustomerId: ID
  Time: String
}

type OrderItem {
  product_name: String
  product_price: Int
  Quantity: Int
}
input CouponInput{
  
  code: String,
  discountType: String,
  discountAmount: Int,
  
  expiryDate: Date,
  isActive:String,

}
input OrderInput{
  
  CustomerFirstname: String,
  CustomerLastname: String,
  CustomerMobile: Int,
  Product_name: String,
  Product_price: Int,
  Quantity:Int,
  TotalPriceWithTax:Float,
  Date: Date,
  CurrentDate:Date,
  DeliveryType:String ,
  PaymentBy: String,
  CustomerId: ID,
  Time:String,
  
}
input CartItemInput{
  Product_name: String!
  Product_price: Float!
  quantity: Int!
  CustomerId: ID,
}
type Review{
  _id: ID,
  Firstname: String,
  Lastname: String,
  email: String,
  Message: String,
  Mobile: Int,

}
input ReviewInput{
  Firstname: String,
  Lastname: String,
  email: String,
  Message: String,
  Mobile: Int,
}
type User{
  _id: ID,
  Firstname: String,
  Lastname: String,
  email: String,
  Address: String,
  Mobile: Int,
  Password: String,
  Usertype: UserType,
}
input UserInput{
  Firstname: String,
  Lastname: String,
  email: String,
  Address: String,
  Password: String,
  Mobile: Int,
  Usertype: UserType,
}
type Customer{
  _id: ID,
  Firstname: String,
  Lastname: String,
  email: String,
 
  Mobile: Int,
  Password: String,
  Address1: String,
  Address2: String,
  PostalCode: String,
  State: String,
  Country: String,

 
}
input CustomerInput{
  Firstname: String,
  Lastname: String,
  email: String,
  Password: String,
  Mobile: Int,
  Address1: String,
  Address2: String,
  PostalCode: String,
  State: String,
  Country: String,
 

}


type Category{
    _id:ID,
    category_name : String
}

type CategoryInfo{
  
  category_name : String
}

type Products{
  _id: ID,
  Product_name: String,
  Product_price: Float,
  Product_description: String,
  Product_image: Image,
  Category: String
}

enum UserType{
  ADMIN
  MANAGER
  EMPLOYEE
}

input ProductDetails
{
  Product_name: String,
  Product_price: Float,
  Product_description: String,
  Product_image: String!,
  Category: String
}

input CategoryList
{
  category_name : String
}

input ImageInput { 
  
  url: String! 
}

input TimeSlotInput{
  time: String!
  date: String!
}


type Query{
  createCheckoutSession: String # '{url: "STRIPEURL.com"}'
  getAllCategory: [Category]
    getAllCategory_db: [Category]
    getAllReview_db: [Review]
    getAllCoupon_db:[Coupon]
    getAllProducts_db: [Products]
    getCategoryById_db(cat_id:ID) : Category
    getProductById_db(pro_id:ID) : Products
    getAllUsers_db: [User]
    getAllCustomers_db: [Customer]
    checkExistingUser (email: String, Usertype: UserType) : [User]
    getAllOrder_db: [Orders]
    getOrderByCusomerId_db(CustomerId:ID) : [Orders]
    images: [Image!]!
    getAllTableBooking_db:[TableBooking]
   
}

type Mutation{
  cCheckoutSession(order: [OrderInput!]): String # '{url: "STRIPEURL.com"}'
  createProducts(
    Product_name: String!
    Product_price: Float!
    Product_description: String!
    Product_image: String!
    Category: String!
  ): Products

  createReview(ReviewInput: ReviewInput): Review
  
  db_updateProductById(
    Proid: ID!, 
    updatedPro: ProductDetails
  ): Products

  ProductById(proId: ID!, updatedPro: ProductDetails): Products
  db_deleteOrderById(OrderId:ID):Orders
  db_deleteProductById(pro_id:ID):Products

  insertCategories(categoryInsert: CategoryList): Category
  db_updateCategoryById(cat_id:ID,updated_data :CategoryList): Category
  db_deleteCategoryById(cat_id:ID):Category

  signupUser(userInput: UserInput): User
  signupCustomer(CustomerInput: CustomerInput): Customer
  db_updateCustomerById(Customer_id:ID,updated_data :CustomerInput): Customer
  AddOrder(OrderInput: OrderInput): Order
  AddCoupon(CouponInput: CouponInput): Coupon

  checkExistingUser(email: String!, Password:String!, Usertype: UserType!): User
  checkExistingCustomer(email: String!, Password:String!): Customer
  checkExistingCustomerwithemailonly (email: String!) : Customer
  getOrderById_db(CustomerId:ID!) : [Order]

  uploadImage(url: String!): Image

  addTableBooking(tableName: String!, time: String!, date: String!, capacity: String!, available: Boolean!): TableBooking

  bookTable(tableName: String!, date: String!, time: String!, capacity: String!, firstname: String,
    lastname: String,
    phonenumber: Int,
    email:String,): TableBooking
}


`;

const resolvers = {
  Query: {
    createCheckoutSession: async () => {
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: "T-shirt",
              },
              unit_amount: 2000,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${CLIENT_URL}/CheckoutSuccess`,
        cancel_url: `${CLIENT_URL}/Cart`,
      });
      return JSON.stringify({
        url: session.url,
      });
    },
    images: async () => {
      try {
        const images = await imageaxiosModel.find();
        return images;
      } catch (error) {
        throw new Error(`Failed to fetch images: ${error.message}`);
      }
    },

    getAllCategory_db: async (parent, args, context, info) => {
      try {
        const categories_from_db = await eatToastModel.find({});

        console.log(parent);
        console.log(categories_from_db);

        return categories_from_db;
      } catch (err) {
        console.log(err);
      }
    },
    getAllCoupon_db: async (parent, args, context, info) => {
      try {
        const Coupon_from_db = await CouponModel.find({});

        console.log(parent);
        console.log(Coupon_from_db);

        return Coupon_from_db;
      } catch (err) {
        console.log(err);
      }
    },
    getAllReview_db: async (parent, args, context, info) => {
      try {
        const reviews_from_db = await ReviewsModel.find({});

        console.log(parent);
        console.log(reviews_from_db);

        return reviews_from_db;
      } catch (err) {
        console.log(err);
      }
    },

    getAllProducts_db: async (parent, args, context, info) => {
      try {
        const products_from_db = await productModel.find({});
        const productsWithImage = products_from_db.map((product) => {
          const {
            _id,
            Product_name,
            Product_price,
            Product_description,
            Product_image,
            Category,
          } = product;
          return {
            _id,
            Product_name,
            Product_price,
            Product_description,
            Product_image:
              Product_image && Product_image.url
                ? { url: Product_image.url }
                : { url: "default_image_url" }, // Adjust this line

            Category,
          };
        });

        console.log(parent);
        console.log(productsWithImage);

        return productsWithImage;
      } catch (err) {
        console.log(err);
      }
    },
    getAllTableBooking_db: async (parent, args, context, info) => {
      try {
        const tablebooking_from_db = await tableModel.find({});

        console.log(parent);
        console.log(tablebooking_from_db);
        return tablebooking_from_db;
      } catch (err) {
        console.log(err);
      }
    },

    getCategoryById_db: async (parent, args, context, info) => {
      try {
        console.log(parent);
        const id = args.cat_id;

        console.log(id);

        const category_from_db = await eatToastModel.findById(id);

        console.log(category_from_db);

        return category_from_db;
      } catch (err) {
        console.log(
          `getCategoryById_db Failed due to the erroe below \n ${err}`
        );
      }
    },
    getProductById_db: async (parent, args, context, info) => {
      try {
        console.log(parent);
        const id = args.pro_id;

        console.log(id);

        const product_from_db = await productModel.findById(id);

        console.log(product_from_db);

        return product_from_db;
      } catch (err) {
        console.log(err);
      }
    },
    getAllCustomers_db: async (parent, args, context, info) => {
      try {
        const customers_from_db = await CustomersModel.find({});

        console.log(parent);
        console.log(customers_from_db);

        return customers_from_db;
      } catch (err) {
        console.log(err);
      }
    },
    getAllUsers_db: async (parent, args, context, info) => {
      try {
        const users_from_db = await UsersModel.find({});

        console.log(parent);
        console.log(users_from_db);

        return users_from_db;
      } catch (err) {
        console.log(err);
      }
    },

    checkExistingUser: async (parent, args, context, info) => {
      try {
        const { email, Usertype } = args;
        const existingUser = await UsersModel.find({ email, Usertype });
        return existingUser;
      } catch (err) {
        console.log(err);
      }
    },
    getOrderByCusomerId_db: async (parent, args, context, info) => {
      try {
        const { CustomerId } = args;
        const Oder_by_CustomerId = await OrderModel.find({ CustomerId });

        await OrderModel.populate(Oder_by_CustomerId, { path: "orderItems" });
        return Oder_by_CustomerId;
      } catch (err) {
        console.log(err);
      }
    },
    getAllOrder_db: async (parent, args, context, info) => {
      try {
        const order_from_db = await OrderModel.find({});

        console.log(parent);
        console.log(order_from_db);

        return order_from_db;
      } catch (err) {
        console.log(err);
      }
    },
  },

  Mutation: {
    db_deleteOrderById: async (parent, args, context, info) => {
      try {
        const id = args.OrderId;
        const order_deleted = await OrderModel.findByIdAndDelete(id);
        console.log(order_deleted);
        return order_deleted;
      } catch (err) {}
    },
    cCheckoutSession: async (_, { order }, args, context, info) => {
      try {
        const { email } = args;

        // Check if DeliveryType and PaymentBy are provided

        const lineItems = order.map((orderItem) => ({
          price_data: {
            currency: "usd",
            product_data: {
              name: orderItem.Product_name,
            },
            unit_amount: orderItem.Product_price * 100,
            // Change to 'unit_amount' instead of 'Product_price'
          },

          //unit_amount: orderItem.Product_price * 100,
          quantity: orderItem.Quantity,
          // Keep as 'quantity'
        }));

        const session = await stripe.checkout.sessions.create({
          line_items: lineItems,
          mode: "payment",
          success_url: `${CLIENT_URL}/CheckoutSuccess?success=true`,
          cancel_url: `${CLIENT_URL}/Cart`,
        });

        // Extracting name, quantity, and price from lineItems
        const orderItems = lineItems.map((lineItem) => ({
          product_name: lineItem.price_data.product_data.name,
          product_price: lineItem.price_data.unit_amount / 100, // Convert back to actual price
          Quantity: lineItem.quantity,
        }));

        // Create new OrderModel with orderItems
        //const newOrder = new OrderModel({
        // orderItems: orderItems,
        //});
        console.log(orderItems);
        const newOrder = new OrderModel({
          orderItems,
          CustomerFirstname: order[0].CustomerFirstname, // Assuming customer info is same for all items
          CustomerLastname: order[0].CustomerLastname,
          CustomerMobile: order[0].CustomerMobile,
          DeliveryType: order[0].DeliveryType,
          PaymentBy: order[0].PaymentBy,
          CustomerId: order[0].CustomerId,
          TotalPriceWithTax: order[0].TotalPriceWithTax,
          Quantity: order[0].Quantity,
          Time: order[0].Time,
        });

        console.log(newOrder);
        // Save the order to the database
        const savedOrder = await newOrder.save();

        return JSON.stringify({
          url: session.url,
          order: savedOrder,
        });
      } catch (err) {
        console.error("Error creating checkout session:", err);
        throw new Error("Failed to create checkout session");
      }
    },
    checkExistingCustomerwithemailonly: async (parent, args, context, info) => {
      try {
        const { email } = args;
        const logexistingUser = await CustomersModel.findOne({ email });

        // if (!logexistingUser) {
        //   throw new Error("User not found");
        // }

        return logexistingUser;
      } catch (error) {
        throw error;
      }
    },
    createProducts: async (
      _,
      {
        Product_name,
        Product_price,
        Product_description,
        Product_image,
        Category,
      }
    ) => {
      try {
        const newProduct = new productModel({
          Product_name,
          Product_price,
          Product_description,
          Product_image: { url: Product_image }, // Use the provided Product_image URL directly
          Category,
        });
        const savedProduct = await newProduct.save();

        console.log(savedProduct);

        return { product: savedProduct };
      } catch (err) {
        console.log(err);
        throw new Error("Failed to create product");
      }
    },

    uploadImage: async (_, { url }) => {
      const image = new imageaxiosModel({ url });
      const savedImage = await image.save();
      return savedImage;
      //return { _id: savedImage._id, url: savedImage.url };
    },

    createReview: async (parent, args, context, info) => {
      try {
        const newReview = new ReviewsModel(args.ReviewInput);

        const savedReview = await newReview.save();
        console.log(savedReview);
        return savedReview;
      } catch (err) {
        console.log(err);
      }
    },
    db_deleteProductById: async (parent, args, context, info) => {
      try {
        const id = args.pro_id;

        const product_deleted = await ProductModel.findByIdAndDelete(id);

        console.log(product_deleted);

        return product_deleted;
      } catch (err) {
        console.log(`Delete Failed due to the error below \n ${err}`);
      }
    },
    db_updateProductById: async (_, { Proid, updatedPro }) => {
      try {
        const {
          Product_name,
          Product_price,
          Product_description,
          Product_image,
          Category,
        } = updatedPro;
        const updatedProduct = await productModel.findByIdAndUpdate(
          Proid,
          {
            Product_name,
            Product_price,
            Product_description,
            Product_image: { url: Product_image },
            Category,
          },
          { new: true }
        );

        console.log(updatedProduct);

        if (!updatedProduct) {
          throw new Error("Product not found");
        }

        return { product: updatedProduct };
      } catch (err) {
        console.log(err);
        throw new Error("Failed to update product");
      }
    },

    insertCategories: async (parent, args, context, info) => {
      try {
        const newCategory = new eatToastModel(args.categoryInsert);

        const savedCategories = await newCategory.save();
        console.log(newCategory);
        return savedCategories;
      } catch (err) {
        console.log(err);
      }
    },
    db_deleteCategoryById: async (parent, args, context, info) => {
      try {
        const id = args.cat_id;

        const category_deleted = await eatToastModel.findByIdAndDelete(id);

        console.log(category_deleted);

        return category_deleted;
      } catch (err) {
        console.log(`Delete Failed due to the error below \n ${err}`);
      }
    },
    db_updateCategoryById: async (parent, args, context, info) => {
      try {
        const id = args.cat_id;

        const updated_cat = args.updated_data;

        const updated_cat_from_db = await eatToastModel.findByIdAndUpdate(
          id,
          updated_cat
        );

        console.log(updated_cat);

        return updated_cat;
      } catch (err) {
        console.log(`Update Failed due to the error below \n ${err}`);
      }
    },

    signupCustomer: async (parent, args, context, info) => {
      try {
        if (!args.CustomerInput) {
          throw new Error("User input data is missing.");
        }
        const { email } = args.CustomerInput;
        // Check for existing user with the same email and usertype
        const existingUser = await CustomersModel.findOne({ email });

        if (existingUser) {
          // Throw an error if the user already exists with the same email and usertype
          throw new Error(
            "User with the provided email and usertype already exists."
          );
        }

        const salt = 15;
        const hashedPassword = await bcrypt.hash(
          args.CustomerInput.Password,
          salt
        );

        // If no existing user found, proceed with user creation logic
        const newCustomer = new CustomersModel({
          ...args.CustomerInput,
          Password: hashedPassword,
        });

        const savedCustomer = await newCustomer.save();

        return savedCustomer;
      } catch (error) {
        throw error; // Rethrow the error to be caught by Apollo Server and returned to the client
      }
    },
    signupUser: async (parent, args, context, info) => {
      try {
        if (!args.userInput) {
          throw new Error("User input data is missing.");
        }
        const { email, Usertype } = args.userInput;
        // Check for existing user with the same email and usertype
        const existingUser = await UsersModel.findOne({ email, Usertype });

        if (existingUser) {
          // Throw an error if the user already exists with the same email and usertype
          throw new Error(
            "User with the provided email and usertype already exists."
          );
        }

        const salt = 15;
        const hashedPassword = await bcrypt.hash(args.userInput.Password, salt);

        // If no existing user found, proceed with user creation logic
        const newUser = new UsersModel({
          ...args.userInput,
          Password: hashedPassword,
        });

        const saveduser = await newUser.save();

        return saveduser;
      } catch (error) {
        throw error; // Rethrow the error to be caught by Apollo Server and returned to the client
      }
    },

    checkExistingUser: async (parent, args, context, info) => {
      try {
        const { email, Usertype, Password } = args;
        const logexistingUser = await UsersModel.findOne({ email, Usertype });

        if (!logexistingUser) {
          throw new Error("User not found");
        }

        const isPasswordValid = await bcrypt.compare(
          Password,
          logexistingUser.Password
        );

        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }
        return logexistingUser;
      } catch (error) {
        throw error;
      }
    },
    checkExistingCustomer: async (parent, args, context, info) => {
      try {
        const { email, Password } = args;
        const logexistingUser = await CustomersModel.findOne({ email });

        if (!logexistingUser) {
          throw new Error("User not found");
        }

        const isPasswordValid = await bcrypt.compare(
          Password,
          logexistingUser.Password
        );

        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }
        return logexistingUser;
      } catch (error) {
        throw error;
      }
    },
    db_updateCustomerById: async (parent, args, context, info) => {
      try {
        const id = args.Customer_id;

        const updated_customer = args.updated_data;

        const updated_customer_from_db = await CustomersModel.findByIdAndUpdate(
          id,
          updated_customer
        );

        console.log(updated_customer);

        return updated_customer;
      } catch (err) {
        console.log(`Update Failed due to the error below \n ${err}`);
      }
    },

    getOrderById_db: async (parent, args, context, info) => {
      try {
        const { CustomerId } = args;
        const orderByCustomers = await OrderModel.find({ CustomerId });

        // if (!logexistingUser) {
        //   throw new Error("User not found");
        // }

        return orderByCustomers;
      } catch (error) {
        throw error;
      }
    },
    AddCoupon: async (parent, args, context, info) => {
      try {
        const newCoupon = new CouponModel(args.CouponInput);

        const savedCoupon = await newCoupon.save();
        console.log(savedCoupon);
        return savedCoupon;
      } catch (err) {
        console.log(err);
      }
    },
    AddOrder: async (parent, args, context, info) => {
      try {
        const newOrder = new OrderModel(args.OrderInput);

        const savedOrder = await newOrder.save();
        console.log(savedOrder);
        return savedOrder;
      } catch (err) {
        console.log(err);
      }
    },

    addTableBooking: async (
      _,
      { tableName, time, date, capacity, available }
    ) => {
      const Tablebook = new tableModel({
        tableName,
        time,
        date,
        capacity,
        available,
      });
      const tablebooked = await Tablebook.save();
      return tablebooked;
    },

    bookTable: async (
      _,
      {
        tableName,
        date,
        time,
        capacity,
        firstname,
        lastname,
        email,
        phonenumber,
      }
    ) => {
      try {
        // Find the table with the specified details
        const table = await tableModel.findOne({
          tableName,
          date,
          time,
          capacity,
        });

        // If the table doesn't exist or is already booked, throw an error
        if (!table || !table.available) {
          throw new Error("Table not available for booking");
        }

        // Update the table's availability
        table.available = false;

        // Update the table's booking details with user-provided data
        table.firstname = firstname;
        table.lastname = lastname;
        table.email = email;
        table.phonenumber = phonenumber;

        // Save the updated table data
        const updatedTable = await table.save();

        return updatedTable;
      } catch (error) {
        console.error("Error booking table:", error);
        throw new Error("Failed to book table");
      }
    },
  },
};

app.use(express.static("public"));

var corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));

const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET; // Make sure to set this in your environment variables

// Configure webhook endpoint for Stripe events

app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        stripeWebhookSecret
      );
    } catch (err) {
      console.error("Webhook error:", err.message);
      return res.sendStatus(400);
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object;

        const sessionId = session.id;
        const orderId = session.client_reference_id;

        const order = await OrderModel.findById(orderId);

        if (!order) {
          return res.sendStatus(400);
        }
        // Here you can update your database to mark the order as paid
        order.status = "paid";
        await order.save();
        // and clear the cart items, for example:
        // const orderId = session.client_reference_id;
        // Your database update logic here...
        console.log(`order marked as paid: ${orderId}`);
        break;
      // Handle other event types as needed
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.sendStatus(200);
  }
);

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    req, checkExistingCustomer;
  },
  plugins: [
    {
      requestDidStart: () => ({
        willSendResponse: ({ response }) => {
          if (response.http) {
            response.http.headers.set(
              "Access-Control-Allow-Origin",
              "http://localhost:3000"
            ); // Update with your client origin
          }
        },
      }),
    },
  ],
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const port = process.env.GRAPHQL_PORT;
const { url } = await startStandaloneServer(server, {
  listen: { port: port },
});

console.log(`🚀  Server ready at: ${url}`);
export default app;
