const express = require("express");
const app = express();
const cors = require("cors");
const warehousesJson = require('./data/warehouses.json')

//Routes setup
const warehouseRoute = require("./routes/warehouses");
const inventoryRoute = require("./routes/inventory");

//Config
require("dotenv").config();
const port = process.env.PORT;

//Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/warehouses", warehouseRoute);
app.use("/api/inventory", inventoryRoute);

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
