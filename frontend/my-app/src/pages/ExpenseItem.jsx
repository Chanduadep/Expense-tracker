import React, { useState } from 'react';
import api from '../utils/api';
import '../styles/expense.css'

const ExpenseItem = ({ expense, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [editData, setEditData] = useState({
    expenseName: expense.expenseName,
    description: expense.description,
    amount: expense.amount
  });

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      setError('');
      await api.delete(`/expenses/delete/${expense._id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      });
      onDelete(expense._id);
    } catch (err) {
      setError('Failed to delete expense. Please try again.');
      console.error('Failed to delete expense:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = async () => {
    if (isNaN(parseFloat(editData.amount))) {
      setError('Amount must be a valid number');
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      const response = await api.put(`/expenses/update/${expense._id}`, editData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      });
      setIsEditing(false);
      onUpdate(expense._id, response.data);
    } catch (err) {
      setError('Failed to update expense. Please try again.');
      console.error('Failed to update expense:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'amount' && value !== '') {
      if (!/^\d*\.?\d*$/.test(value)) return;
    }
    setEditData({ ...editData, [name]: value });
    setError(''); 
  };
  const confirmDelete = () => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      handleDelete();
    }
  };

  return (
    <div className="expense-container">
    {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}
  
    {isEditing ? (
      <div>
        <label>Expense Name</label>
        <input type="text" name="expenseName" value={editData.expenseName} onChange={handleChange} disabled={isLoading} />
  
        <label>Description</label>
        <textarea name="description" value={editData.description} onChange={handleChange} disabled={isLoading} />
  
        <label>Amount</label>
        <input type="text" name="amount" value={editData.amount} onChange={handleChange} disabled={isLoading} />
  
        <div className="buttons">
          <button className="btn-cancel" onClick={() => setIsEditing(false)} disabled={isLoading}>Cancel</button>
          <button className="btn-edit" onClick={handleEdit} disabled={isLoading}>{isLoading ? "Saving..." : "Save"}</button>
        </div>
      </div>
    ) : (
      <div>
        <h3>{expense.expenseName}</h3>
        <p>{expense.description}</p>
        <p>${parseFloat(expense.amount).toFixed(2)}</p>
  
        <div className="buttons">
          <button className="btn-edit" onClick={() => setIsEditing(true)} disabled={isLoading}>Edit</button>
          <button className="btn-delete" onClick={confirmDelete} disabled={isLoading}>{isLoading ? "Deleting..." : "Delete"}</button>
        </div>
      </div>
    )}
  </div>
  
  );
};

export default ExpenseItem;