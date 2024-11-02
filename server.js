


// const express = require("express");
// const dotenv = require("dotenv").config();
// const app = express();
// const userRoutes = require("./routes/user");
// const userExpense = require("./routes/expense"); // This imports the expense routes
// const paymentHandle = require("./routes/recordPayment");
// const authRoutes = require("./routes/auth");
// const port = process.env.PORT || 5000;
//  const connectDb = require("./config/db");

// connectDb();

// app.use(express.json());

// app.use("/api/splits", userRoutes);
// app.use("/api/splits", userExpense); // Using the expense routes
// app.use("/api/splits", paymentHandle);
// app.use("/api/splits/auth", authRoutes); 

// app.listen(port, () => {
//     console.log(`Server is listening on the port ${port}`);
// });

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const dotenv = require("dotenv").config();
// const app = express();
// const connectDb = require("./config/db");
// connectDb();
// // Import routes
// const userRoutes = require("./routes/user");  
// const expenseRoutes = require("./routes/expense"); 
// const paymentRoutes = require("./routes/recordPayment"); 
// const authRoutes = require("./routes/auth"); // Add this line


// // Middleware
// app.use(express.json()); 
// app.use(cors());



// // Routes
// app.use("/api/splits", userRoutes);            // For user-related routes
// app.use("/api/splits", expenseRoutes);         // For expense-related routes
// app.use("/api/splits", paymentRoutes);         // For payment handling routes
// app.use("/api/splits/auth", authRoutes);       // For authentication (login/signup)

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));



// // server.js
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const dotenv = require("dotenv").config();
// const app = express();
// const connectDb = require("./config/db");
// connectDb();

// // Import routes
// const userRoutes = require("./routes/user");  
// const expenseRoutes = require("./routes/expense"); 
// const paymentRoutes = require("./routes/recordPayment"); 
// const authRoutes = require("./routes/auth"); // Ensure you have this if you're using auth routes
// const auth = require("./middleware/authenticate");
// // Middleware
// app.use(express.json()); 
// app.use(cors());

// // Routes
// app.use("/api/splits", userRoutes);
// app.use("/api/splits", auth,expenseRoutes);
// app.use("/api/splits", paymentRoutes);
// app.use("/api/splits/auth", authRoutes); // For authentication (login/signup)

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));

// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv").config();
const app = express();
const connectDb = require("./config/db");
// const auth = require("./middleware/authenticate"); // Auth middleware

connectDb(); // Connect to MongoDB

// Import routes
const userRoutes = require("./routes/user");
const expenseRoutes = require("./routes/expense");
const paymentRoutes = require("./routes/recordPayment");
// const authRoutes = require("./routes/auth"); // For signup/login

// Middleware
app.use(express.json());
app.use(cors());


// Allow requests from your frontend
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your front-end's origin
    credentials: true,
  }));


// Routes that do not require authentication
// app.use("/api/splits/auth", authRoutes); // For authentication (login/signup)

// Routes that require authentication
app.use("/api/splits",  expenseRoutes); // Apply auth middleware to expense-related routes
app.use("/api/splits",paymentRoutes); // Apply auth middleware to payment-related routes

// User routes (optional: apply auth if necessary)
app.use("/api/splits", userRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
