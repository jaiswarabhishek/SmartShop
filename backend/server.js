const app = require('./app');
const dotenv = require('dotenv');
const connectDB = require('./config/db')
const cloudinary = require('cloudinary')

//Configuration 
dotenv.config({path:'./config/.env'}) // it helps to use environment variables or load the environment variable

//connection with database
connectDB();

//cloudinary configuration
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})



app.listen(process.env.PORT,()=>{
    console.log(`Server is listening on port ${process.env.PORT}...`)
})