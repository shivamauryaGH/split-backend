// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   name: { type: String,
//      required: true },

//   email: { type: String, 
//     required: true,
//      unique: true },
//   password: { type: String, required: true },
//   balance: { type: Number, default: 0 },
// });
// module.exports = mongoose.model('User', userSchema);


const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    amount: { type: Number, default: 0 }, // Initial balance
    credit: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        amount: Number,
    }], // People who owe this user money
    debit: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        amount: Number,
    }], // People this user owes money to
});

module.exports = mongoose.model('User', userSchema);
