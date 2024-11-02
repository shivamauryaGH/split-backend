// const mongoose=require("mongoose");

// const expenseSchema=new mongoose.Schema({
//     description:String,
//     amount:Number,
//     paidBy:{type:mongoose.Schema.Types.ObjectId,ref:"User"
//     },
//     participants:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}],
//     createdAt:{type:Date,default:Date.now},
// });

// module.exports=mongoose.model('Expense',expenseSchema);

const mongoose = require('mongoose');

// Expense Schema
const expenseSchema = new mongoose.Schema({
    description: String,
    amount: Number,
    paidBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // ID of user who paid
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // List of participants involved in the expense
   category: {
    type: String,
    enum: ["Food", "Travel", "Utilities", "Health","Shopping","Other"], // Define categories
    default: "Other", // Default to 'Other' if no category is specified
  },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Expense', expenseSchema);
