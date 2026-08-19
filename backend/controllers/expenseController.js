const pool = require("../config/db");

exports.getExpenses = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `SELECT expenses.*, users.name AS added_by
       FROM expenses
       JOIN users ON expenses.user_id = users.id
       WHERE expenses.trip_id = $1
       ORDER BY expenses.created_at ASC`,
      [id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load expenses" });
  }
};

exports.addExpense = async (req, res) => {
  const { id } = req.params;
  const { name, amount, paid_by_name, category, split_among } = req.body;

  if (isNaN(parseFloat(amount))) {
    return res.status(400).json({ error: "Invalid amount" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO expenses (trip_id, user_id, name, amount, paid_by_name, category, split_among)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [id, req.userId, name, amount, paid_by_name, category, split_among]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add expense" });
  }
};

exports.deleteExpense = async (req, res) => {
  const { expenseId } = req.params;
  try {
    const expense = await pool.query("SELECT * FROM expenses WHERE id=$1", [expenseId]);
    if (expense.rows.length === 0) {
      return res.status(404).json({ error: "Expense not found" });
    }

    const isAdmin = req.membership.role === "admin";
    const isOwner = expense.rows[0].user_id === req.userId;
    if (!isAdmin && !isOwner) {
      return res.status(403).json({ error: "Not allowed" });
    }

    await pool.query("DELETE FROM expenses WHERE id=$1", [expenseId]);
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete expense" });
  }
};
