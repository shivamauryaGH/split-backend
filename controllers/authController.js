// const User = require("../models/User");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const { validationResult } = require("express-validator");

// // Signup
// const signup = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   const { name, email, password } = req.body;

//   try {
//     let user = await User.findOne({ email });
//     if (user) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // const hashedPassword = await bcrypt.hash(password, 10);
      
//     // Create a new user
//    user = new User({
//       name,
//       email,
//       password,
//     });

//        // Hash the password
//        const salt = await bcrypt.genSalt(10);
//        user.password = await bcrypt.hash(password, salt);
   
//  await user.save();


//   // Return JWT token
//     const payload = { user:{
//          id:user.id,
//         }, 
//     };
//     jwt.sign(
//         payload,
//         process.env.JWT_SECRET,
//         { expiresIn: "1h" },
//         (err, token) => {
//           if (err) throw err;
//           res.json({ token });
//         }
//       );
//   } catch (error) {
//     console.error(err.message);

//     res.status(500).send("Server Error");
//   }
// };

// // Login controller
// const login = async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
  
//     const { email, password } = req.body;
  
//     try {
//       // Check if the user exists
//       let user = await User.findOne({ email });
//       if (!user) {
//         return res.status(400).json({ msg: "Invalid credentials" });
//       }
  
//       // Compare the password
//       const isMatch = await bcrypt.compare(password, user.password);
//       if (!isMatch) {
//         return res.status(400).json({ msg: "Invalid credentials" });
//       }
  
//       // Return JWT token
//       const payload = {
//         user: {
//           id: user.id,
//         },
//       };
  
//       jwt.sign(
//         payload,
//         process.env.JWT_SECRET,
//         { expiresIn: "1h" },
//         (err, token) => {
//           if (err) throw err;
//           res.json({ token });
//         }
//       );
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send("Server error");
//     }
//   };


//  module.exports = { signup, login };


const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User');

// User Signup
exports.signup = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, email, password } = req.body;

    try {
        // Check if the user already exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: 'User already exists' });

        // Create a new user
        user = new User({ name, email, password });

        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        // Generate JWT
        const payload = { user: { id: user.id } };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// User Login
exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        // Check if the password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        // Generate JWT
        const payload = { user: { id: user.id } };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
