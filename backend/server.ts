import express from "express";
import { connect } from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

import { errorHandling } from "./utils/error";
//import routes
import ProductsRoutes from "./routes/productsRoute";
import UserRoutes from "./routes/userRoute";
import OrdersRoutes from "./routes/ordersRoute";
import PaymentRoutes from "./routes/paymentRoute";

//import frontend path
const path = require("path");

const app = express();

//config
if (process.env.NODE_ENV !== "PRODUCTION") {
  //DEV env
  require("dotenv").config({ path: "backend/config/config.env" });
}

//connect to database
process.env.MONGO_URL &&
  connect(process.env.MONGO_URL, () => {
    console.log("Mongo connected");
  });

//middlewares
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
    methods: "GET,PUT,POST,DELETE",
  })
);
app.use(express.json());
app.use(cookieParser());

//routes
app.use("/api/products", ProductsRoutes);
app.use("/api/users", UserRoutes);
app.use("/api/orders", OrdersRoutes);
app.use("/api/payment", PaymentRoutes);

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"))
);

//error handling
app.use(errorHandling);

const server = app.listen(process.env.PORT, () => {
  console.log(
    `⚡️[server]: Server is running at https://localhost:${process.env.PORT}`
  );
});

//if can not handle async rejection close server
process.on("unhandledRejection", (err: any) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down server due to unhandledRejection");

  server.close(() => {
    process.exit(1);
  });
});
