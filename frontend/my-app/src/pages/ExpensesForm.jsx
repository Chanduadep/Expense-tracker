
import React, { useState } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';
import "../styles/expense.css"

const ExpensesForm = ({ onExpensesAdded }) => {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    expenseName:'',amount:"",description:""
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/expenses/addexpense', formData, {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem("token")}`
          }
      }); 
      setFormData({ expenseName: '', amount: "", description: "" });
      if (onExpensesAdded) {
        onExpensesAdded(res.data);
      }
      navigate('/expenses'); 
  } catch (err) {
      setError(err.response?.data?.message || 'Failed to add expense');
  }
  };

  return (
    <div className="expense-container" >
      <form className="login-form" onSubmit={handleSubmit} >
      <h3 >Add Expenses</h3>
      {error && <p className="error-message">{error}</p>}
        <div>
          <label >Expense Name</label>
          <input
            type="text"
            name="expenseName"
            value={formData.expenseName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label >Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label >Amount</label>
          <input
            type="text"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>
        <button
        className="btn-edit"
          type="submit"
        >
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default ExpensesForm;