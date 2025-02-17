
import React, { useState } from 'react';
import api from '../utils/api';

const ExpensesForm = ({ onExpensesAdded }) => {
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
      const res = await api.post('/expenses/addexpense', formData);
      onExpensesAdded(res.data);
      setFormData({ expenseName:'',amount:"",description:"" });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add expense');
    }
  };

  return (
    <div >
      <h3 >Add Expenses</h3>
      {error && <div >{error}</div>}
      <form onSubmit={handleSubmit} >
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
          type="submit"
        >
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default ExpensesForm;