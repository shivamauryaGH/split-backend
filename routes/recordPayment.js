// const express = require('express');
// const router = express.Router();
// const { recordPayment } = require('../controllers/paymentController'); // Assuming you have this function in paymentController

// // Define the route to record the payment
// router.post('/recordPayment', recordPayment);

// module.exports = router;

const express = require("express");
const { recordPayment } = require("../controllers/paymentController");

const router = express.Router();

router.patch("/record", recordPayment);

module.exports = router;

