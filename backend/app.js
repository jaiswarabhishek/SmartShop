const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");


app.use(cors());
app.use(cookieParser());
app.use(express.json());


const product = require('../backend/routes/productRoute');
const user = require('../backend/routes/userRoute');
const order = require('../backend/routes/orderRoute');

app.use('/api/v1',product);
app.use('/api/v1',user);
app.use('/api/v1',order);




module.exports = app;