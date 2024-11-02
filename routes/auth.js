

// const express = require("express");
// const { check } = require("express-validator");
// const { signup, login } = require("../controllers/authController");

// const router = express.Router();

// // Signup route
// router.post(
//   "/register",
//   [
//     check("name", "Name is required").not().isEmpty(),
//     check("email", "Please include a valid email").isEmail(),
//     check("password", "Password should be at least 6 characters").isLength({
//       min: 6,
//     }),
//   ],
//   (req, res, next) => {  // Add this middleware to process validation
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     next();  // Move to the next middleware (signup function)
//   },
//   signup
// );

// // Login route
// router.post(
//   "/login",
//   [
//     check("email", "Please include a valid email").isEmail(),
//     check("password", "Password is required").exists(),
//   ],
//   (req, res, next) => {  // Add validation handling here as well
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     next();  // Move to the next middleware (login function)
//   },
//   login
// );

// module.exports = router;

const express = require('express');
const { check } = require('express-validator');
const { signup, login } = require('../controllers/authController');

const router = express.Router();

// Signup Route
router.post('/register', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters long').isLength({ min: 6 })
], signup);

// Login Route
router.post('/login', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
], login);

module.exports = router;
