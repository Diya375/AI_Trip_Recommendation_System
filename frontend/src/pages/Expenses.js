import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import mountain from "../assets/images/area.jpg";

const cardClass =
  "bg-white/[0.08] backdrop-blur-xl rounded-2xl p-8 mb-6 border border-white/15";

const inputClass =
  "w-full p-4 mb-4 rounded-xl border-none text-base text-black outline-none";

const buttonClass =
  "px-7 py-4 rounded-2xl border-none bg-white/[0.18] text-white font-['Cinzel',serif] cursor-pointer hover:bg-white/30 transition";

function Expenses() {
  const navigate = useNavigate();

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
    <div
      className="relative min-h-screen p-6 sm:p-12 text-white bg-cover bg-center"
      style={{ backgroundImage: `url(${mountain})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/65" />

      <div className="relative z-10 max-w-3xl mx-auto">
        <h1 className="font-['Cinzel',serif] text-4xl sm:text-5xl mb-6">
          Expense Manager
        </h1>

        {/* Form */}
        <div className={cardClass}>
          <input
            type="text"
            placeholder="Expense Name"
            value={expenseName}
            onChange={(e) => setExpenseName(e.target.value)}
            className={inputClass}
          />

          <input
            type="number"
            placeholder="Amount (NPR)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={inputClass}
          />

          <input
            type="text"
            placeholder="Paid By"
            value={paidBy}
            onChange={(e) => setPaidBy(e.target.value)}
            className={inputClass}
          />

          <input
            type="number"
            placeholder="Number of Members"
            value={members}
            onChange={(e) => setMembers(e.target.value)}
            className={inputClass}
          />

          <button onClick={addExpense} className={buttonClass}>
            Add Expense
          </button>
        </div>

        {/* Expense History */}
        <div className={cardClass}>
          <h2 className="font-['Cinzel',serif] text-2xl mb-4">
            Expense History
          </h2>

          {expenses.length === 0 ? (
            <p>No expenses added yet.</p>
          ) : (
            expenses.map((expense, index) => (
              <div
                key={index}
                className="mb-5 border-b border-white/15 pb-4"
              >
                <h3 className="text-lg font-medium">{expense.expenseName}</h3>
                <p>Amount: NPR {expense.amount}</p>
                <p>Paid By: {expense.paidBy}</p>
                <p>Members: {expense.members}</p>
                <p>
                  Each Person Owes: NPR {expense.splitAmount.toFixed(2)}
                </p>
              </div>
            ))
          )}
        </div>

        <button onClick={() => navigate("/home")} className={buttonClass}>
          Return Home
        </button>
      </div>
    </div>
  );
}

export default Expenses;