const express = require("express");
const verifyToken = require("../middleware/authmiddleware");
const checkTripMembership = require("../middleware/checkTripMembership");
const expenseController = require("../controllers/expenseController");

const router = express.Router();

router.get("/:id/expenses", verifyToken, checkTripMembership, expenseController.getExpenses);
router.post("/:id/expenses", verifyToken, checkTripMembership, expenseController.addExpense);
router.delete("/:id/expenses/:expenseId", verifyToken, checkTripMembership, expenseController.deleteExpense);

module.exports = router;