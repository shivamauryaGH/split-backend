// const mongoose = require('mongoose');
// const Expense = require('../models/Expense'); // Update the path to your Expense model

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/splitWise', {
//   // Removed deprecated options
// });

// mongoose.connection.once('open', async () => {
//   console.log("Connected to MongoDB");

//   try {
//     // Update all expenses where 'category' does not exist, setting the default category to 'Other'
//     const result = await Expense.updateMany(
//       { category: { $exists: false } }, // Only update if the category field is missing
//       { $set: { category: "Other" } }    // Set the default category to 'Other'
//     );

//     console.log(`${result.modifiedCount} expenses updated with default category`); // Use modifiedCount instead of nModified
//   } catch (error) {
//     console.error("Error updating expenses", error);
//   } finally {
//     mongoose.connection.close(); // Close the connection when done
//   }
// });
