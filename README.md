
<h1 align="center">SmartShop</h1>


Welcome to the MERN SmartShop e-commerce website! This project is built using the MERN stack, which includes MongoDB, Express.js, React.js, and Node.js. It provides a comprehensive platform for online retail businesses and offers a seamless shopping experience for customers.

 > **Warning**: This project is still under development and is not ready for production use. Please feel free to explore the codebase and try out the features. However, do not use it for any commercial purposes.

## Tech-Stack

The SmartShop e-commerce website utilizes the following technologies:

- **MongoDB**: A flexible and scalable NoSQL database for efficient data management.
- **Express.js**: A robust web application framework for handling server-side operations and routing.
- **React.js**: A popular JavaScript library for building dynamic and interactive user interfaces.
- **Node.js**: A runtime environment for executing server-side JavaScript code.
- **Redux**: A predictable state container for managing application state.
- **Tailwind CSS**: A utility-first CSS framework for designing responsive web pages.
- **Stripe**: A payment processing platform for securely accepting payments online.
- **Chart.js**: A JavaScript library for creating beautiful charts and graphs.
  

## Installation

To run the SmartShop e-commerce website locally, please follow these steps:

1. Clone the repository:

   ```bash
   git clone git@github.com:jaiswarabhishek/SmartShop.git
   ```

2. Navigate to the project directory:

    ```bash
    cd frontend
    npm start
    ```


3. Install the dependencies for both the server and client:

   ```bash
   # Install server dependencies from the root directory
   npm install
   
   # Install client dependencies
   cd frontend
   npm install
   ```

4. Configure environment variables:

   - Create a `.env` file in the config folder from the backend directory 
   - Set the following environment variables:
     - `MONGODB_URI`: The connection URL for your MongoDB database.
     - `JWT_SECRET`: A secret key for JSON Web Token (JWT) generation.
     - ` STRIPE_PUBLISH_KEY `: The client ID for integrating Stripe payments.
     - ` STRIPE_SECRET_KEY `: The secret key for integrating Stripe payments.

5. Start the development server:

   ```bash
   # Start the server
   cd backend
   nodemon server

   # Start the client
   cd frontend
   npm start
   ```

6. Open your browser and navigate to `http://localhost:3000` to access the SmartShop e-commerce website.

## Features

Once the SmartShop e-commerce website is up and running, you can perform the following actions:

- User-friendly and intuitive interface for an exceptional shopping experience.
- Browse through various product categories.
- Robust authentication and authorization system for secure user accounts.
- Search for specific products using the search feature.
- Add items to your shopping cart.
- Proceed to the checkout process and securely complete the purchase.
- Create an account to manage your profile and track your orders.
- Sellers can manage product listings, update stock levels, and process orders.
- Gain insights into sales performance, customer behavior, and inventory trends through comprehensive analytics and reporting tools.

Feel free to explore all the features and functionalities of the SmartShop e-commerce website and enjoy the seamless shopping experience it offers!

**Happy Shopping!**