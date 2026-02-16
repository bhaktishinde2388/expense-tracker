import "./AddTransaction.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast"; // <- added this import

function AddTransaction() {
  const [user, setUser] = useState("");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState("credit");
  const [category, setCategory] = useState("shopping");

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      setUser(currentUser);
    } else {
      window.location.href = "/login";
    }
  }, []);

  const addTransaction = async () => {
    try {
      const token = localStorage.getItem("token"); // get JWT

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/transaction`,
        {
          title,
          amount,
          type,
          category,
          user: user._id,
        },
        {
          headers: { Authorization: `Bearer ${token}` }, // send token
        }
      );

      toast.success(response.data.message);

      setTitle("");
      setType("credit");
      setCategory("shopping");
      setAmount(0);

      // timeout
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to add transaction");
    }
  };

  // ------------------ JSX ------------------
  return (
    <div>
      <h1>AddTransaction</h1>
      <form className="add-transaction-container">
        <input
          className="transaction-input b"
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="transaction-input b"
          type="number"
          placeholder="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select
          className="transaction-input"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="credit">Credit</option>
          <option value="debit">Debit</option>
        </select>

        <select
          className="transaction-input"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Learning">Learning</option>
          <option value="shopping">shopping</option>
          <option value="food">food</option>
          <option value="salary">salary</option>
          <option value="health">health</option>
          <option value="traveling">traveling</option>
          <option value="accessories">accessories</option>
        </select>

        <button type="button" className="btn" onClick={addTransaction}>
          Add Transaction
        </button>
      </form>
      <Toaster /> {/* Add toaster to show toast notifications */}
    </div>
  );
}

export default AddTransaction;
