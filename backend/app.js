const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");





//enable HTTP cookies over CORS
//  cookie 
app.use(cors(
    {
        origin: 'http://localhost:3000',
        credentials: true
    }
));


app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());


const product = require('../backend/routes/productRoute');
const user = require('../backend/routes/userRoute');
const order = require('../backend/routes/orderRoute');
const payment = require('../backend/routes/paymentRoute')

app.use('/api/v1',product);
app.use('/api/v1',user);
app.use('/api/v1',order);
app.use('/api/v1',payment);





module.exports = app;