const express = require('express');
const router = express.Router();
const { createExpense, getExpenses, categoryExpense } = require('../controllers/expenseController');
// const auth = require("../middleware/authenticate");

// Define expense routes
router.post("/add", createExpense);
router.get("/expense/:id",getExpenses);
router.get("/expense/category/:category", categoryExpense); // Ensure this is correctly structured

module.exports = router; // Export the router



// const express = require('express');
// const { createExpense, getExpenses, categoryExpense } = require('../controllers/expenseController');
// const authMiddleware = require('../middleware/authenticate');


// console.log('createExpense:', createExpense); // Should log a function
// console.log('getExpenses:', getExpenses); // Should log a function
// console.log('categoryExpense:', categoryExpense); // Should log a function

// const router = express.Router();


// router.post("/add", authMiddleware, createExpense);
// router.get("/expense/:id", authMiddleware, getExpenses); 
// router.get("/expense/category/:category", authMiddleware, categoryExpense); 

// module.exports = router;

// // const express = require('express');
// // const { createExpense, getExpenses, categoryExpense } = require('../controllers/expenseController');
// // const authMiddleware = require('../middleware/authMiddleware');

// // const router = express.Router();

// // router.post("/add", authMiddleware, createExpense);
// // router.get("/expense/:id", authMiddleware, getExpenses);
// // router.get("/expense/category/:category", authMiddleware, categoryExpense);

// // module.exports = router;


