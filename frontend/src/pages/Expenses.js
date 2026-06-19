import React, { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";

function Expenses() {
  const [expenseName, setExpenseName] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState("");
  const [members, setMembers] = useState("");
  const [expenses, setExpenses] = useState([]);

  const addExpense = () => {
    if (!expenseName || !amount || !paidBy || !members) {
      alert("Please fill all fields.");
      return;
    }

    const splitAmount = Number(amount) / Number(members);

    const newExpense = {
      expenseName,
      amount,
      paidBy,
      members,
      splitAmount,
    };

    setExpenses([...expenses, newExpense]);

    setExpenseName("");
    setAmount("");
    setPaidBy("");
    setMembers("");
  };

  return (
    <DashboardLayout>
      <div className="fade-up" style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h1 className="section-title">Expense Manager</h1>
        <p className="section-sub">Track and split costs fairly</p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", alignItems: "start" }}>
          <div className="card">
            <h2 className="cinzel" style={{ fontSize: "1.2rem", marginBottom: "1.5rem" }}>Add Expense</h2>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <input type="text" placeholder="Expense Name" value={expenseName} onChange={(e) => setExpenseName(e.target.value)} className="input" />
              <input type="number" placeholder="Amount (NPR)" value={amount} onChange={(e) => setAmount(e.target.value)} className="input" />
              <input type="text" placeholder="Paid By (Name)" value={paidBy} onChange={(e) => setPaidBy(e.target.value)} className="input" />
              <input type="number" placeholder="Number of Members" value={members} onChange={(e) => setMembers(e.target.value)} className="input" />
              <button onClick={addExpense} className="btn btn-primary" style={{ marginTop: "0.5rem" }}>Add</button>
            </div>
          </div>

          <div className="card">
            <h2 className="cinzel" style={{ fontSize: "1.2rem", marginBottom: "1.5rem" }}>History</h2>
            
            {expenses.length === 0 ? (
              <p style={{ color: "var(--text-dim)", fontSize: "0.9rem" }}>No expenses added yet.</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {expenses.map((expense, index) => (
                  <div key={index} style={{ paddingBottom: "1rem", borderBottom: "1px solid var(--border)" }}>
                    <h3 style={{ fontSize: "1rem", color: "var(--accent)", marginBottom: "0.25rem" }}>{expense.expenseName}</h3>
                    <p style={{ fontSize: "0.85rem", color: "var(--text-dim)" }}>
                      NPR {expense.amount} paid by <span style={{ color: "var(--text)" }}>{expense.paidBy}</span>
                    </p>
                    <p style={{ fontSize: "0.85rem", color: "var(--text-dim)", marginTop: "0.25rem" }}>
                      Split: <span style={{ color: "var(--accent-2)" }}>NPR {expense.splitAmount.toFixed(2)}</span> each
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Expenses;