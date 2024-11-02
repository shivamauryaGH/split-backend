// const jwt = require("jsonwebtoken");

// module.exports = function (req, res, next) {
//   const token = req.header("x-auth-token");

//   if (!token) {
//     return res.status(401).json({ message: "No token, authorization denied" });
//   }

//   try {
//     const decoded = jwt.verify(token, "your_jwt_secret");
//     req.user = decoded.userId;
//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Invalid token" });
//   }
// };


// const jwt = require('jsonwebtoken');

// // Middleware to verify JWT token
// const authMiddleware = function (req, res, next) {
//     console.log('Auth middleware triggered');
//     const token = req.header('Authorization');
//     if (!token) return res.status(401).json({ message: "Access denied. No token provided." });

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded; // Attach user info to the request
//         next(); // Proceed to the next middleware/route
//     } catch (error) {
//         res.status(400).json({ message: "Invalid token" });
//     }
// };

// module.exports = authMiddleware;


const authMiddleware = function (req, res, next) {
    console.log('Auth middleware triggered');
    console.log('Authorization Header:', req.header('Authorization')); // Log the Authorization header
    const token = req.header('Authorization')?.split(' ')[1]; // Extract token

    if (!token) {
        console.log('No token provided'); // Log if no token is found
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure JWT_SECRET is set
        req.user = decoded; // Attach user info to the request
        console.log('Token decoded:', req.user); // Log the decoded token for verification
        next(); // Proceed to the next middleware/route
    } catch (error) {
        console.error("Token verification failed:", error); // Log errors for debugging
        res.status(400).json({ message: "Invalid token" });
    }
};

module.exports = authMiddleware;