const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(express.json());


const product = require('../backend/routes/productRoute');
const user = require('../backend/routes/userRoute');

app.use('/api/v1',product);
app.use('/api/v1',user);




module.exports = app;