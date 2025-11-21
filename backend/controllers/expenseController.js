const xlsx = require("xlsx");
const Expense = require("../models/Expense");


// Add Expense Source
exports.addExpense = async (req, res) => {
    const userId = req.user?.id || req.user?._id;
    console.log('addExpense called - userId:', userId);
    console.log('addExpense body:', req.body);
    try {
        const { icon, category, amount, date } = req.body;

        // Validation
        if (!category || !amount || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date: new Date(date),
        });

        await newExpense.save();
        return res.status(201).json(newExpense);
    } catch (error) {
        console.error('addExpense error:', error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Get All Expense Source
exports.getAllExpense = async (req, res) => {
    const userId = req.user._id;
    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 });
        res.json(expense);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Delete Expense Source
exports.deleteExpense = async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.json({ message: "Expense deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Download Excel
exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id;
    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 });

        //Prepare data for Excel

        const data = expense.map((item) => ({
            category: item.category,
            Amount: item.amount,
            Date: item.date ? new Date(item.date).toISOString() : "",
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Expense");
        xlsx.writeFile(wb, 'expense_details.xlsx');
        res.download('expense_details.xlsx');
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};