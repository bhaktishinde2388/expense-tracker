import React, { useState, useEffect } from "react";
import "./Home.css";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";
import TransactionCard from "../../components/TransactionCard/TransactionCard.js";
import AddImage from "./add (1).png";

function Home() {
  const [user, setUser] = useState(null); // set null initially
  const [transactions, setTransactions] = useState([]);
  const [netIncome, setNetIncome] = useState(0);
  const [netExpense, setNetExpense] = useState(0);

  // Get current user from localStorage
  useEffect(() => {
    try {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if (currentUser && currentUser._id) {
        setUser(currentUser);
      } else {
        localStorage.clear();
        window.location.href = "/login";
      }
    } catch (err) {
      // if JSON.parse fails
      localStorage.clear();
      window.location.href = "/login";
    }
  }, []);

  // Load transactions
  const loadTransactions = async () => {
    if (!user?._id) return; // check user._id exists

    toast.loading("Loading transactions...");

    try {
      const token = localStorage.getItem("token"); // JWT token

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/transactions?userId=${user._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const allTransactions = response.data?.data || []; // prevent undefined

      setTransactions(allTransactions);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to load transactions");
      setTransactions([]);
    } finally {
      toast.dismiss();
    }
  };

  useEffect(() => {
    loadTransactions();
  }, [user]);

  // Calculate net income & expense
  useEffect(() => {
    let income = 0;
    let expense = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "credit") income += transaction.amount;
      else expense += transaction.amount;
    });

    setNetIncome(income);
    setNetExpense(expense);
  }, [transactions]);

  if (!user) return null; // render nothing until user is loaded

  return (
    <div>
      <h1 className="user-greeting">
        Hello.... <span className="user-greeting-name">{user.name}😊</span>
      </h1>
      <h3 className="heading">Welcome To Expense Tracker</h3>

      <span
        className="logout"
        onClick={() => {
          localStorage.clear();
          toast.success("Logout successfully");
          setTimeout(() => {
            window.location.href = "/login";
          }, 2000);
        }}
      >
        Logout
      </span>

      {/* Net balance */}
      <div className="net-transactions-container">
        <div className="net-transactions-value-item green">
          <span className="net-transaction-value-amount">+ {netIncome}</span>
          <p className="net-transaction-value-title">Net Income</p>
        </div>
        <span>➕</span>
        <div className="net-transactions-value-item red">
          <span className="net-transaction-value-amount">- {netExpense}</span>
          <p className="net-transaction-value-title">Net Expense</p>
        </div>
        =
        <div className="net-transactions-value-item yellow">
          <span className="net-transaction-value-amount">
            + {netIncome - netExpense}
          </span>
          <p className="net-transaction-value-title">Net Balance</p>
        </div>
      </div>

      <div className="transaction-container">
        {transactions.map((transaction) => {
          const { _id, title, amount, category, type, createdAt } = transaction;

          return (
            <TransactionCard
              key={_id}
              _id={_id}
              title={title}
              amount={amount}
              category={category}
              type={type}
              createdAt={createdAt}
              loadTransactions={loadTransactions}
            />
          );
        })}
      </div>

      <Toaster />
      <Link to="/addTransaction">
        <img src={AddImage} className="add-img" />
      </Link>
    </div>
  );
}

export default Home;
