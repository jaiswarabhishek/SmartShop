const app = require('./app');
const dotenv = require('dotenv');
const connectDB = require('./config/db')

//Configuration 
dotenv.config({path:'./config/.env'}) // it helps to use environment variables or load the environment variable

//connection with database
connectDB();


app.listen(process.env.PORT,()=>{
    console.log(`Server is listening on port ${process.env.PORT}...`)
})