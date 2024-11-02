

// const User = require('../models/User');

// const recordPayment = async (req, res) => {
//     const { fromUserId, toUserId, amount } = req.body;

//     try {
//         // Find the payer and receiver by their IDs
//         const payer = await User.findById(fromUserId);
//         const receiver = await User.findById(toUserId);

//         // Check if payer or receiver is null (user not found)
//         if (!payer || !receiver) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         // Update payer's debit array
//         const debitIndex = payer.debit.findIndex(debt => debt.userId.toString() === toUserId);
//         if (debitIndex !== -1) {
//             payer.debit[debitIndex].amount -= amount;
//             if (payer.debit[debitIndex].amount <= 0) {
//                 payer.debit.splice(debitIndex, 1); // Remove if fully paid
//             }
//         }
//         payer.balance -= amount; // Deduct from payer's balance
//         await payer.save();

//         // Update receiver's credit array
//         const creditIndex = receiver.credit.findIndex(credit => credit.userId.toString() === fromUserId);
//         if (creditIndex !== -1) {
//             receiver.credit[creditIndex].amount -= amount;
//             if (receiver.credit[creditIndex].amount <= 0) {
//                 receiver.credit.splice(creditIndex, 1); // Remove if fully paid
//             }
//         }
//         receiver.balance += amount; // Add to receiver's balance
//         await receiver.save();

//         res.status(200).json({ message: "Payment recorded successfully" });
//     } catch (error) {
//         console.error("Error recording payment:", error); // This will log the actual error to the console
//         res.status(500).json({ message: "Server Error", error: error.message || error });
//     }
// };

// const User = require('../models/User'); // Import the User model

// const recordPayment = async (req, res) => {
//     const { fromUserId, toUserId, amount } = req.body;

//     try {
//         const payer = await User.findById(fromUserId);
//         const receiver = await User.findById(toUserId);

//         // Check if payer or receiver is null
//         if (!payer || !receiver) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         let remainingAmount = amount;

//         // Update payer's debit array
//         const debitIndex = payer.debit.findIndex(debt => debt.userId.toString() === toUserId);
//         if (debitIndex !== -1) {
//             if (payer.debit[debitIndex].amount <= remainingAmount) {
//                 remainingAmount -= payer.debit[debitIndex].amount;
//                 payer.debit.splice(debitIndex, 1); // Fully paid, remove the debit
//             } else {
//                 payer.debit[debitIndex].amount -= remainingAmount;
//                 remainingAmount = 0;
//             }
//         }
//         payer.balance -= amount;
//         await payer.save();
//          console.log(remainingAmount);
//         // Update receiver's credit array
//         const creditIndex = receiver.credit.findIndex(credit => credit.userId.toString() === fromUserId);
//         if (creditIndex !== -1) {
//             if (receiver.credit[creditIndex].amount <= amount) {
//                 // amount -= receiver.credit[creditIndex].amount;
//                 receiver.credit.splice(creditIndex, 1); // Fully paid, remove the credit
//             } else {
//                 receiver.credit[creditIndex].amount -= amount;
//                 amount = 0;
//             }
//         }
//         receiver.balance += amount;
//         await receiver.save();

//         // If there is an excess amount, add it to the receiver's debit array
//         if (remainingAmount > 0) {
//             // const receiverDebitIndex = receiver.debit.findIndex(debt => debt.userId.toString() === fromUserId);
//             // if (receiverDebitIndex !== -1) {
//             //     receiver.debit[receiverDebitIndex].amount += remainingAmount;
//             // } else {
//                 receiver.debit.push({ userId: fromUserId, amount: remainingAmount });
//                 await receiver.save();

//                 credit.payer.push({userId:toUserId,amount:remainingAmount});
//                 await payer.save();
//             // }
           
//         }

//         res.status(200).json({ message: "Payment recorded successfully" });
//     } catch (error) {
//         console.error("Error recording payment:", error);
//         res.status(500).json({ message: "Server Error", error: error.message || error });
//     }
// };

const User = require('../models/User'); // Import the User model

const recordPayment = async (req, res) => {
    const { fromUserId, toUserId, amount } = req.body;

    try {
        const payer = await User.findById(fromUserId);
        const receiver = await User.findById(toUserId);

        // Check if payer or receiver is null
        if (!payer || !receiver) {
            return res.status(404).json({ message: "User not found" });
        }

        let remainingAmount = amount; // Declare as let to modify the value
        let paymentAmount = amount; // Separate payment amount to use when updating credit/debit

        // Update payer's debit array
        const debitIndex = payer.debit.findIndex(debt => debt.userId.toString() === toUserId);
        if (debitIndex !== -1) {
            if (payer.debit[debitIndex].amount <= remainingAmount) {
                remainingAmount -= payer.debit[debitIndex].amount;
                payer.debit.splice(debitIndex, 1); // Fully paid, remove the debit
            } else {
                payer.debit[debitIndex].amount -= remainingAmount;
                remainingAmount = 0;
            }
        }
        payer.amount -= paymentAmount; // Deduct full payment amount from payer's balance
        await payer.save();

        // Update receiver's credit array
        const creditIndex = receiver.credit.findIndex(credit => credit.userId.toString() === fromUserId);
        if (creditIndex !== -1) {
            if (receiver.credit[creditIndex].amount <= paymentAmount) {
                paymentAmount -= receiver.credit[creditIndex].amount;
                receiver.credit.splice(creditIndex, 1); // Fully paid, remove the credit
            } else {
                receiver.credit[creditIndex].amount -= paymentAmount;
                paymentAmount = 0;
            }
        }
        receiver.amount += amount; // Add full payment amount to receiver's balance
        await receiver.save();

        // If there is an excess amount, add it to the receiver's debit array
        if (remainingAmount > 0) {
            const receiverDebitIndex = receiver.debit.findIndex(debt => debt.userId.toString() === fromUserId);
            if (receiverDebitIndex !== -1) {
                receiver.debit[receiverDebitIndex].amount += remainingAmount;
            } else {
                receiver.debit.push({ userId: fromUserId, amount: remainingAmount });
            }
            await receiver.save();

            // Add the excess amount to payer's credit array
            payer.credit.push({ userId: toUserId, amount: remainingAmount });
            await payer.save();
        }

        res.status(200).json({ message: "Payment recorded successfully" });
    } catch (error) {
        console.error("Error recording payment:", error);
        res.status(500).json({ message: "Server Error", error: error.message || error });
    }
};




module.exports = {
    recordPayment
};

// module.exports = {
//         recordPayment
//      };
    
