


const Expense = require("../models/Expense");
const User = require("../models/User");

// Controller to create an expense
const createExpense = async (req, res) => {
    const { description, amount, paidBy, participants, category } = req.body;

    try {
        const expense = new Expense({ description, amount, paidBy, participants, category });
        await expense.save();

        const share = amount / participants.length;

        const payer = await User.findById(paidBy);
        payer.amount -= amount;
        await payer.save();

        for (let participantId of participants) {
            if (participantId !== paidBy) {
                const participant = await User.findById(participantId);
                participant.debit.push({ userId: paidBy, amount: share });
                await participant.save();
                payer.credit.push({ userId: participantId, amount: share });
            }
        }

        await payer.save();

        res.status(201).json({ message: "Expense created successfully", expense });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

// Controller to get expenses by participant ID
const getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({ participants: req.params.id });
        res.json(expenses);
    } catch (error) {
        res.status(500).send("Server error");
    }
};

// Controller to get expenses by category
// const categoryExpense = async (req, res) => {
//     const { category } = req.params;
//     try {
//         const expenses = await Expense.find({ category });
//         if (expenses.length === 0) {
//             return res.status(404).json({ message: "No expenses found for this category" });
//         }
//         res.status(200).json(expenses);
//     } catch (error) {
//         console.error("Error fetching expenses by category:", error);
//         res.status(500).json({ message: "Server Error", error: error.message || error });
//     }
// };
// Controller to get expenses by category
const categoryExpense = async (req, res) => {
    console.log(req.params); // Log incoming parameters

    const { category } = req.params; // Ensure this is getting the correct category
    console.log("Fetching expenses for category:", category); // Log for debugging

    try {
        const expenses = await Expense.find({ category });
        if (expenses.length === 0) {
            return res.status(404).json({ message: "No expenses found for this category" });
        }
        res.status(200).json(expenses);
    } catch (error) {
        console.error("Error fetching expenses by category:", error);
        res.status(500).json({ message: "Server Error", error: error.message || error });
    }
};


module.exports = { createExpense, getExpenses, categoryExpense };

